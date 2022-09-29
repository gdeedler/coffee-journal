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
  }, update
}) {
  const userId = useContext(UserContext);

  return (
    <Card>
      <Name>{name} <Roaster>from {roaster}</Roaster></Name>
      <div>
        {country} - {region}
      </div>
      <div>{producer}</div>
      <Table>
        <HeadRow>
          <Cell>Elevation</Cell>
          <Cell>Process</Cell>
        </HeadRow>
        <Row>
          <Cell>{elevation}</Cell>
          <Cell>{process}</Cell>
        </Row>
        <Row>
          <Notes>{notes.join(', ')}</Notes>
        </Row>
      </Table>
      <Button
        onClick={() => {
          api.post(`/coffees`, { coffee_id }).then(() => update()).catch(err => console.log(err));
        }}
      >
        Add to profile
      </Button>
    </Card>
  );
}

const Name = styled.div`
  font-weight: 500;
  font-size: large;
  margin-top .1em;
  text-align: center;
`;
const Roaster = styled.span`
  font-weight: 300;
  font-size: medium;
  font-style: italic;
  white-space: nowrap;
`
const Card = styled.div`
  width: 30%;
  color: #2c1404;
  border: 2px solid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
  background-color: antiquewhite;
  padding: 0.2em;
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto .2em 0 .2em;
  border: 1px solid;
  border-bottom: 0;
`;
const Row = styled.div`
  display: flex;
  border-bottom: 1px solid;
  text-align: center;
`;
const HeadRow = styled(Row)`
  font-weight: 500;
`;
const Cell = styled.div`
  flex-basis: 50%;
  padding: 0.5em;
  text-align: center;
  &:nth-child(2) {
    border-left: 1px solid;
  }
`;
const Notes = styled.div`
  padding: 0.5em;
  font-style: italic;
`;
const Button = styled.button`
  padding: 0.2em;
  text-decoration: none;
  font-size: 1em;
  padding: .5em;
  width: 103%;
  background-color: #2c1404;
  color: antiquewhite;
  border: none;
  border-radius: 0 0 5px 5px;
  margin: -4px;
  margin-top: -6px;
  &:hover{
    cursor: pointer;
    color: white;
  }
`;
