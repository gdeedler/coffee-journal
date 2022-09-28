import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts';
import api from '../helpers/api';

export default function CoffeeCard({
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
  const userId = useContext(UserContext);

  return (
    <Card>
      <div>{name}</div>
      <div>{country}</div>
      <div>{region}</div>
      <div>{producer}</div>
      <div>
        <button
          onClick={() => {
            api.post(`/coffees`, {coffee_id});
          }}
        >
          Add to profile
        </button>
      </div>
    </Card>
  );
}

const Card = styled.div`
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;
