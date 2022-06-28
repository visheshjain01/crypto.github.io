import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

function News (props) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, error, isLoading } = useGetCryptosNewsQuery({ newsCategory, count: props.onlyfew ? 6 : 12 });
  // console.log(cryptoNews);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }

  return (
    <div>
      {!props.onlyfew && (
        <div className="cryptoo">
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            
            // optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
      
          </Select>

        </div>
      )}
      
      <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>

          <Card hoverable className="news-card">

            <a href={news.url} target="_blank">

              {/* (target property is used for opening in new tab) */}

              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>

              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>

              <div className="provider-container">

                <Col>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </Col>

                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

              </div>

            </a>

          </Card>

        </Col>
      ))}
    </Row>
  </div>
  );
};

export default News;