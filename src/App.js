import './App.css';
import {Routes,Route,Link} from 'react-router-dom';
import {Layout,Typography,Space} from 'antd';
import {Navbar, Homepage, Wishlist, News, Cryptocurrencies, CryptoDetails} from './components';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
    
      <div className="main">
          <Layout> {/* lays everything down from antd*/}
              <div className="routes">
                <Routes> {/* it allows us to have different routes*/}

                  <Route exact path="/" element={<Homepage />}></Route>
                  <Route exact path="/wishlist" element={<Wishlist />}></Route>
                  <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}></Route>
                  <Route exact path="/crypto/:coinId" element={<CryptoDetails />}></Route>
                  <Route exact path="/news" element={<News />}></Route>
                   
                </Routes>
              </div>
          </Layout>

          <div className="footer">
              <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                Cryptoqo <br></br>
                All rights reserved
              </Typography.Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/news">News</Link>
              </Space>
          </div>
        </div>
    </div>
  );
}

export default App;
