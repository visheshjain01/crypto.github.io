import {React, useState} from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi';
import {bookmark} from './Cryptocurrencies'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col} from 'antd';
import {DeleteFilled} from '@ant-design/icons';


function Wishlist () {
  
  const {data, error, isLoading} = useGetCryptosQuery(100);
  const cryptoss = data?.data?.coins;
  const ans=cryptoss?.filter((item) => (bookmark[item.rank-1]) > 0);
  const [result,setCryptos] = useState(ans);

  function removeFromWatchlist(x) {
    bookmark[x-1]=0;
    setCryptos(cryptoss?.filter((item) => (bookmark[item.rank-1]) > 0))
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }
  return (
    <div>
      <h1 style={{color: '#FFFFFF' , fontSize: '2rem', textAlign: 'center', padding: '20px'}}>Your Wishlist</h1>

      <Row gutter={[32, 32]} className="crypto-card-container">
          {result?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card className='hello'
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                style=
                {{ borderRadius: '15px', backgroundColor: 'rgb(74 81 88)' , boxShadow: '5px 5px rgb(180 181 199)' , border: 'none',  
                }}
                hoverable
              >
                <p>Price: ${millify(currency.price)}</p>
                <p>Market Cap: ${millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
            <button style={{position: 'relative', left: '250px', bottom: '30px', border: 'none', outline: 'none', backgroundColor: 'rgb(74 81 88)'}} onClick={() => removeFromWatchlist(currency.rank)}>
                <DeleteFilled className="delete" style={{fontSize: '20px'}}/>
            </button>
          </Col>
          ))}
      </Row>
    </div>
  )
}

export default Wishlist