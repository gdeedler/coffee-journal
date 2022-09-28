import { useEffect, useState } from 'react';
import styled from 'styled-components';
import JournalCard from '../components/journalcard';
import api from '../helpers/api';

export default function Journal() {
  const userId = 1;

  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    api.get(`/journal/coffees`)
      .then((data) => setCoffees(data.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = coffees.map((coffee, i) => (
    <JournalCard coffee={coffee} key={i} />
  ));

  return (
    <Container>
      {cards}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: auto;
`;
