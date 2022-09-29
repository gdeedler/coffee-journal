import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../helpers/api";

export default function Analytics() {

  const [coffees, setCoffees] = useState([]);
  const [brews, setBrews] = useState([]);

  useEffect(() => {
    api.get('/journal/coffees')
    .then((response) => setCoffees(response.data))
    .catch((err) => console.log(err));
  },[])

  useEffect(() => {
    api.get('/brews/all')
      .then((response) => setBrews(response.data))
      .catch((err) => console.log(err))
  }, [])

  let ratingAverage = 0;
  let bitterAverage = 0;
  for(const brew of brews) {
    ratingAverage += brew.rating;
    bitterAverage += brew.bitter_sour;
  }
  ratingAverage = (ratingAverage / brews.length).toFixed(2);
  bitterAverage = bitterAverage / brews.length;

  let preference = '';
  if(bitterAverage < 3) preference = 'very bitter';
  if(bitterAverage >=3 < 4.5) preference = 'a little bitter';
  if(bitterAverage > 5.5) preference = 'a little sour';
  if(bitterAverage > 7) preference = 'very sour 🤮';

  return (
    <Container>
      <StatRow>You've saved {coffees.length === 1 ? <><Stat>1</Stat> coffee</> : <><Stat>{coffees.length}</Stat> coffees</>}
      </StatRow>
      <StatRow>You've brewed {brews.length === 1 ? <><Stat>1</Stat> time</> : <><Stat>{brews.length}</Stat> times</>} with an average rating of <Stat>{ratingAverage}</Stat>
      </StatRow>
      <StatRow>
        You like your coffee <Stat>{preference}</Stat>
      </StatRow>
    </Container>
  )
}

const Container = styled.div`
  width: 100;
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
`
const Stat = styled.span`
  background-color: antiquewhite;
  padding: 0 10px;
`
const StatRow = styled.li`

`