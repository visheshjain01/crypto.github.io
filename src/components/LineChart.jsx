import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale,  CategoryScale)

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
  }

  // console.log(coinHistory);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: 'white',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Col className="chart-header">
        <Col>
            <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        </Col>
        <Col className="price-container">
            <Title level={5} style={{color: 'rgb(178 178 192)'}} className="price-change">Change: {coinHistory?.data?.change}%</Title>
            <Title level={5} style={{color: 'rgb(178 178 192)'}} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Col>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

