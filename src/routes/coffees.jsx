import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CoffeeCard from '../components/coffeecard';
import api from '../helpers/api';
export default function Coffees() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    getCoffees();
  }, []);

  function getCoffees () {
    api.get('/coffees')
    .then((response) => setCoffees(response.data))
    .catch((err) => console.log(err));
  }

  const cards = coffees.map((coffee, i) => (
    <CoffeeCard coffee={coffee} update={getCoffees} key={i} />
  ));

  const fakeCards = [];
  for(let i = 0; i < cards.length % 3; i++) {
    fakeCards.push(<FakeCard/>);
  }

  return (
    <Container>
      {cards}
      {fakeCards}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
`
const FakeCard = styled.div`
  width: 30%;
`