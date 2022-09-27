import { useEffect, useState } from 'react';
import styled from 'styled-components';
import JournalCard from '../components/journalcard';

export default function Journal() {
  const userId = 1;

  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/${userId}/coffees`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((err) => console.log(err));
  }, []);

  const cards = coffees.map((coffee, i) => (
    <JournalCard coffee={coffee} key={i} />
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
  flex-direction: column;
  gap: 0.5em;
`;
