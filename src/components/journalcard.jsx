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
  deleteCoffee,
}) {
  const [brews, setBrews] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    <Container>
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
          <Buttons>
            <XButton onClick={() => setShowModal(true)}>X</XButton>
            <Button onClick={() => navigate('/brew/' + coffee_id)}>BREW</Button>
          </Buttons>
        </Info>
      </Card>
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <div>
              Are you sure you want to remove this coffee? You will also lose
              all brew data
            </div>
            <ConfirmButtons>
              <Button
                onClick={() => {
                  deleteCoffee(coffee_id);
                  setShowModal(false);
                }}
              >
                Delete
              </Button>
              <Button onClick={() => setShowModal(false)}>No</Button>
            </ConfirmButtons>
          </ModalBox>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  background-color: antiquewhite;
  max-width: 30%;
  font-size: 1.2em;
  padding: 3em;
`;
const ConfirmButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin-top: 1em;
  margin-bottom: -2em;
`;
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
const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  font-size: 0.8em;
  gap: 1em;
`;
const Button = styled.button`
  text-decoration: none;
  font-size: 1.5em;
  background-color: #2c1404;
  color: antiquewhite;
  border: none;
  border-radius: 3px;
  padding: 0.3em 0.5em;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const XButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5em;
  width: 1.5em;
  background-color: #773217;
  &:hover {
    color: #d63d0f;
  }
`;
