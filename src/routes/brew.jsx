import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { UserContext } from '../contexts';

export default function Brew() {
  const params = useParams();
  const [brews, setBrews] = useState([]);
  const [coffee, setCoffee] = useState(null);
  const [form, setForm] = useState({
    rating: 5,
    dose: 18,
    method: 'pourover',
  });
  const user = useContext(UserContext);

  function getBrews() {
    fetch(
      '/api/brews?' +
        new URLSearchParams({
          userId: 1,
          coffeeId: params.coffeeId,
        }),
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => setBrews(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBrews();
    fetch('/api/coffees/' + params.coffeeId)
      .then((data) => data.json())
      .then((coffee) => setCoffee(coffee[0]))
      .catch((err) => console.log(err));
  }, []);

  const labels = brews.map((brew, index) => index);
  const data = {
    labels,
    datasets: [
      {
        label: 'Brew rating',
        data: brews.map((brew) => brew.rating),
      },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();
    const submitForm = {
      ...form,
      coffeeId: coffee.coffee_id,
    };
    fetch('/api/brews/' + user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitForm),
    })
      .then(() => getBrews())
      .catch((err) => console.log(err));
  }

  if (!brews || !coffee) return <div></div>;

  return (
    <Container>
      <div>Brewing {coffee.name}</div>
      <Graph>{brews.length > 0 ? <Line data={data} /> : <div></div>}</Graph>
      <Form onSubmit={handleSubmit}>
        <label>
          {' '}
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
        </label>
        <label>
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
        </label>
        <label>
          Method:
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
          >
            <option value="pourover">Pourover</option>
            <option value="frenchpress">French press</option>
            <option value="espresso">Espresso</option>
            <option value="immersion">Immersion</option>
            <option value="mokapot">Moka pot</option>
          </select>
        </label>
        <div>
          <button type="submit">Add brew</button>
        </div>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Graph = styled.div``;
const Form = styled.form``;
const Range = styled.input`
  width: 100%;
`;
