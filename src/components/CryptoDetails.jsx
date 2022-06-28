import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {useGetCryptoDetailsQuery,useGetCryptoHistoryQuery} from '../services/cryptoApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails () {

  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, error, isLoading } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }

  // console.log(timeperiod);
  // console.log(data);
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.v}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Row  className="coin-detail-container">

      <Col span={24} className="coin-heading-container">
        <Title level={2} style={{color: '#9D9D9D'}} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>

      <Col span={24}>
        <Select style={{paddingBottom:'20px'}}defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
          {time.map((date) => <Option value={date}>{date}</Option>)}
        </Select>
      </Col>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} key={coinId}/> 

      <Col className="stats-container">

         <Col className="coin-value-statistics">

           <Col className="coin-value-statistics-heading">
             <Title level={3} style={{color: 'rgb(178 178 192)'}} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
             <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
           </Col>
           
           {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text style={{color: 'rgb(178 178 192)'}} >{icon}</Text>
                <Text style={{color: 'rgb(178 178 192)'}} >{title}</Text>
              </Col>
  
              <Text style={{color: 'rgb(178 178 192)'}} className="stats">{value}</Text>
            </Col>
          ))}
        
        </Col>

        <Col className="other-stats-info">

          <Col className="coin-value-statistics-heading">
            <Title level={3} style={{color: 'rgb(178 178 192)'}} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>

          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text style={{color: 'rgb(178 178 192)'}}>{icon}</Text>
                <Text style={{color: 'rgb(178 178 192)'}}>{title}</Text>
              </Col>
              <Text style={{color: 'rgb(178 178 192)'}} className="stats">{value}</Text>
            </Col>
          ))}

        </Col>
        
      </Col>

      <Col className="coin-desc-link">

        <Col style={{marginTop: '-35px'}} className="coin-desc">
          <Title style={{color: 'rgb(178 178 192)'}} level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Col>

        <Col style={{marginTop: '-35px'}} className="coin-links">
          <Title level={3} style={{color: 'rgb(178 178 192)'}} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.map((link) => (
            <Col className="coin-link" key={link.name}>
              <Title style={{color: 'rgb(178 178 192)'}} level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Col>
          ))}
        </Col>

      </Col>

    </Row>
    )
};

export default CryptoDetails;

