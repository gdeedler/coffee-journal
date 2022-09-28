import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CoffeeCard from '../components/coffeecard';
import api from '../helpers/api';
export default function Coffees() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    api.get('/coffees')
      .then((response) => setCoffees(response.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = coffees.map((coffee, i) => (
    <CoffeeCard coffee={coffee} key={i} />
  ));

  return (
    <Container>
      {cards}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
`