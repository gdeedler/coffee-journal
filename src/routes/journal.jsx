import { useEffect, useState } from 'react';
import styled from 'styled-components';
import JournalCard from '../components/journalcard';
import api from '../helpers/api';

export default function Journal() {
  const userId = 1;

  const [coffees, setCoffees] = useState([]);

  function getCoffees() {
    api
      .get(`/journal/coffees`)
      .then((data) => setCoffees(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCoffees();
  }, []);

  const cards = coffees.map((coffee, i) => (
    <JournalCard coffee={coffee} key={coffee.coffee_id} deleteCoffee={deleteCoffee} />
  ));

  function deleteCoffee(coffee_id) {
    api.delete(`/journal/coffees/${coffee_id}`).then(() => getCoffees()).catch(err => console.log(err))
  }

  return <Container>{cards}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: auto;
`;
