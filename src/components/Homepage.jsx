import React from 'react'
import millify from 'millify';
import { Typography, Row, Col} from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const { Title } = Typography;

function Homepage () {

  const { data, error, isLoading } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  // console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }


  return (
    <div>
        <Title level={2} style={{ color: '#FFFFFF' }}>Global Crypto Stats</Title>
        <Row> 
          <Col span={12}> 
              <Col><Title level={5} style={{ color: '#9D9D9D', fontSize: "20px" }}>Total Cryptocurrencies :</Title></Col>
              <Col><Title level={5} style={{ color: '#FFFFFF' }}>{globalStats.total}</Title></Col>
          </Col>
          <Col span={12}> 
              <Col><Title level={5} style={{ color: '#9D9D9D', fontSize: "20px" }}> Total Exchanges:</Title></Col>
              <Col><Title level={5} style={{ color: '#FFFFFF' }}>{globalStats.totalExchanges}</Title></Col>
          </Col>
          <Col span={12}> 
              <Col><Title level={5} style={{ color: '#9D9D9D' , fontSize: "20px"}}>Total Market Cap:</Title></Col>
              <Col><Title level={5} style={{ color: '#FFFFFF' }}>${millify(globalStats.totalMarketCap)}</Title></Col>
          </Col>
          <Col span={12}> 
              <Col><Title level={5} style={{ color: '#9D9D9D', fontSize: "20px" }}>Total Markets :</Title></Col>
              <Col><Title level={5} style={{ color: '#FFFFFF' }}>{millify(globalStats.totalMarkets)}</Title></Col>
          </Col>
          <Col span={12}> 
              <Col><Title level={5} style={{ color: '#9D9D9D' , fontSize: "20px"}}>Total 24h Volume :</Title></Col>
              <Col><Title level={5} style={{ color: '#FFFFFF' }}>${millify(globalStats.total24hVolume)}</Title></Col>
          </Col>
        </Row>

        <div className="home-heading-container">
          <Title level={2} className="home-title" style={{ color: '#FFFFFF' }}>Top 10 Cryptos In The World</Title>
          <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
        </div>
        <Cryptocurrencies only ={true} />
        <div className="home-heading-container">
          <Title level={2} className="home-title" style={{ color: '#FFFFFF' }}>Latest Crypto News</Title>
          <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
        </div>
        <News onlyfew={true} />
    </div>
  )
}

export default Homepage