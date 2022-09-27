import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CoffeeCard from '../components/coffeecard';

export default function Coffees() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/coffees', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((err) => console.log(err));
  }, []);

  const cards = coffees.map((coffee, i) => (
    <CoffeeCard coffee={coffee} key={i} />
  ));

  return (
    <Container>
      <div>Your coffees</div>
      {cards}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-evenly;
`