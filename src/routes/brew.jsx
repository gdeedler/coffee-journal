import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { UserContext } from '../contexts';
import api from '../helpers/api';

export default function Brew() {
  const params = useParams();
  const [brews, setBrews] = useState([]);
  const [coffee, setCoffee] = useState(null);
  const [form, setForm] = useState({
    rating: 5,
    dose: 18,
    method: 'pourover',
    bitter_sour: 5,
  });
  const [shownMethods, setShownMethods] = useState({});
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function getBrews() {
    api
      .get(
        '/brews?' +
          new URLSearchParams({
            coffeeId: params.coffeeId,
          })
      )
      .then((data) => setBrews(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBrews();
    api
      .get('/coffees/' + params.coffeeId)
      .then((coffee) => setCoffee(coffee.data[0]))
      .catch((err) => console.log(err));
  }, []);

  const labels = brews.filter(brew => shownMethods[brew.method]).map((brew, index) => index);
  const data = {
    labels,
    datasets: [
      {
        label: 'Rating',
        data: brews.filter(brew => shownMethods[brew.method]).map((brew) => brew.rating),
        tension: 0.3,
        borderColor: '#2c1404',
        fill: true,
      },
      {
        label: 'Bitter/Sour',
        data: brews.filter(brew => shownMethods[brew.method]).map((brew) => brew.bitter_sour),
        borderDash: [5, 5],
        borderColor: '#2c1404',
        tension: 0.3,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        min: 0,
        max: 10,
        display: true,
      },
      x: {},
    },
    maintainAspectRatio: false,
    animation: {
      duration: 500,
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const submitForm = {
      ...form,
      coffeeId: coffee.coffee_id,
    };
    api
      .post('/brews', submitForm)
      .then(() => getBrews())
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const methods = {};
    for (const brew of brews) {
      const method = brew.method;
      if (shownMethods[method] === undefined && methods[method] === undefined) methods[method] = true;
    }
    setShownMethods({ ...shownMethods, ...methods });
  }, [brews]);

  const methodButtons = [];
  for (const method in shownMethods) {
    methodButtons.push(
      <Label>
        {method}
        <Checkbox
          type="checkbox"
          key={method}
          checked={shownMethods[method]}
          onChange={() => {
            const update = {};
            update[method] = !shownMethods[method];
            setShownMethods({ ...shownMethods, ...update });
          }}
        />
      </Label>
    );
  }

  if (!brews || !coffee) return <div></div>;

  return (
    <Container>
      <Header>
        Brewing <Coffee>{coffee.name}</Coffee>{' '}
        <Roaster>from {coffee.roaster}</Roaster>
        <Button onClick={() => navigate('/journal')}>Back</Button>
      </Header>
      <Graph>
        {brews.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <MissingText>Start brewing to see your data</MissingText>
        )}
      </Graph>
      <Methods>Display: {methodButtons}</Methods>
      <Body>
        <Info>
          <div>
            {coffee.name} from {coffee.roaster}
          </div>
          <div>
            {coffee.country} - {coffee.region}
          </div>
          <div>{coffee.producer}</div>
          <div>{coffee.elevation}</div>
          <div>{coffee.process}</div>
          <div>Notes: {coffee.notes.join(', ')}</div>
        </Info>
        <Form onSubmit={handleSubmit}>
          <Label>
            Rating: {form.rating}
            <Range
              type="range"
              min="1"
              max="10"
              value={form.rating}
              onChange={(e) => {
                setForm({ ...form, rating: Number(e.target.value) });
              }}
            />
          </Label>
          <Label>
            <Row>
              <div>Bitter</div>
              <div>Balanced</div>
              <div>Sour</div>
            </Row>
            <Range
              type="range"
              min="0"
              max="10"
              value={form.bitter_sour}
              onChange={(e) => {
                setForm({ ...form, bitter_sour: Number(e.target.value) });
              }}
            />
          </Label>
          <Label>
            {' '}
            Dose: {form.dose}g
            <Range
              type="range"
              min="5"
              max="60"
              value={form.dose}
              onChange={(e) => {
                setForm({ ...form, dose: Number(e.target.value) });
              }}
            />
          </Label>
          <Label>
            Method:
            <Select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
            >
              <Option value="pourover">Pourover</Option>
              <Option value="frenchpress">French press</Option>
              <Option value="espresso">Espresso</Option>
              <Option value="immersion">Immersion</Option>
              <Option value="mokapot">Moka pot</Option>
            </Select>
          </Label>
          <div>
            <BrewButton type="submit">Add brew</BrewButton>
          </div>
        </Form>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  border: 2px solid #2c1404;
  border-radius: 5px;
  padding: 1em;
`;
const Label = styled.label`
  user-select: none;
`
const Checkbox = styled.input`
  cursor: pointer;
  background-color: red;
`
const Header = styled.div`
  font-size: 1.3em;
`;
const Coffee = styled.span`
  font-size: 1.1em;
  font-weight: 500;
`;
const Roaster = styled.span`
  font-weight: 300;
  font-size: 0.9em;
  font-style: italic;
`;
const Button = styled.button`
  float: right;
  text-decoration: none;
  font-size: 0.8em;
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
const BrewButton = styled(Button)`
  font-size: 1.1em;
`
const Graph = styled.div`
  min-height: 20em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Methods = styled.div`
  display: flex;
  gap: 1em;
`;
const Body = styled.div`
  display: flex;
  margin-top: 1em;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
  font-weight: 300;
  padding-right: 1em;
  padding: 1em;
  margin-right: 1em;
`;
const Form = styled.form`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const Range = styled.input`
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  height: 0.5em;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2c1404;
    border: none;
  }
`;
const Select = styled.select`
  appearance: none;
  background-color: white;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  border: 1px solid #2c1404;
  border-radius: 5px;
  margin-left: 1em;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
`;
const Option = styled.option`
  appearance: none;
  background-color: white;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  border: 1px solid #2c1404;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const MissingText = styled.div`
  font-style: italic;
  font-size: 1.3em;
  opacity: 50%;
`;