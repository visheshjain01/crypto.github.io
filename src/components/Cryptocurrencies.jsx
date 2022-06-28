import {React, useState} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button, } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import '../App.css';
import {PlusCircleFilled} from '@ant-design/icons';

const bookmark = [];
for (let i = 0; i <100; i += 1)
{
  bookmark.push(0);
}

function Cryptocurrencies (props) {

  const count = props.only ? 10 : 100;
  const {data, error, isLoading} = useGetCryptosQuery(count);
  const cryptos = data?.data?.coins;

  const [filteredData,setCrypto] = useState(cryptos);

  function handleChange(event) {
    setCrypto(cryptos?.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  function addToWatchlist(x) {
    bookmark[x-1]=1;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }

  
  // console.log(bookmark);

  return (
    <div>
        {(!props.only && 
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={handleChange}
          />
        </div>
        )}

        <Row gutter={[32, 32]} className="crypto-card-container">
          {filteredData?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card className='crypto-card'
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
            <button style={{position: 'relative', left: '250px', bottom: '30px', border: 'none', outline: 'none', backgroundColor: 'rgb(74 81 88)'}}  onClick={() => addToWatchlist(currency.rank)}>
                <PlusCircleFilled className="add" style={{fontSize: '20px'}}/>
            </button>
          </Col>
          ))}
      </Row>
    </div>
  )
}

export default Cryptocurrencies
export {bookmark}