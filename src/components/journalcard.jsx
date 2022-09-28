import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Link, useNavigate } from 'react-router-dom';
import api from '../helpers/api';

export default function JournalCard({
  coffee: {
    coffee_id,
    name,
    country,
    elevation,
    notes,
    process,
    producer,
    region,
    roaster,
  },
}) {
  const [brews, setBrews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(
        '/brews?' +
          new URLSearchParams({
            coffeeId: coffee_id,
          })
      )
      .then((response) => setBrews(response.data))
      .catch((err) => console.log(err));
  }, []);

  const labels = brews.map((brew, index) => index);
  const data = {
    labels,
    datasets: [
      {
        label: 'Brew rating',
        data: brews.map((brew) => brew.rating),
        tension: 0.3,
        borderColor: '#2c1404',
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const averageRating = (
    brews.reduce((a, b) => a + b.rating, 0) / brews.length
  ).toFixed(2);
  const averageDose = (
    brews.reduce((a, b) => a + b.dose, 0) / brews.length
  ).toFixed(1);
  const methodMap = {};
  let method = '';
  let max = 0;
  for (var brew of brews) {
    if (!methodMap[brew.method]) methodMap[brew.method] = 1;
    else methodMap[brew.method]++;
    if (methodMap[brew.method] > max) method = brew.method;
  }

  return (
    <Card>
      <Head>
        <Title>
          {name} <Roaster>from {roaster}</Roaster>
        </Title>
        <Graph>
          {brews.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <Graph>
              <MissingText>Start brewing to see your data</MissingText>
            </Graph>
          )}
        </Graph>
      </Head>
      <Info>
        <Row>
          <div>Times brewed: </div>
          <div>{brews.length}</div>
        </Row>
        <Row>
          <div>Average rating: </div>
          {brews.length > 0 && <div>{averageRating}</div>}
        </Row>
        <Row>
          <div>Average dose: </div>
          {brews.length > 0 && <div>{averageDose}g</div>}
        </Row>
        <Row>
          <div>Usual method: </div>
          <div>{method}</div>
        </Row>
        <Button onClick={() => navigate('/brew/' + coffee_id)}>BREW</Button>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  border: 2px solid #2c1404;
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  color: #2c1404;
  background-color: antiquewhite;
  height: 15em;
`;
const Head = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;
const Title = styled.div`
  font-size: larger;
  font-weight: 600;
`;
const Roaster = styled.span`
  font-size: smaller;
  font-style: italic;
  font-weight: 300;
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Graph = styled.div`
  flex: 1;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MissingText = styled.div`
  font-style: italic;
  font-size: 1.3em;
  opacity: 50%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Button = styled.button`
  text-decoration: none;
  font-size: 1.5em;
  background-color: #2c1404;
  color: antiquewhite;
  border: none;
  border-radius: 3px;
  padding: 0.3em 0.5em;
  margin-top: auto;
  cursor: pointer;
  &:hover{
    color: white;
  }
`;
