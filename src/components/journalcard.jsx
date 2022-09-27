import { useEffect, useState } from "react";
import styled from "styled-components";
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';


export default function JournalCard ({coffee: {coffee_id, name, country, elevation, notes, process, producer, region, roaster}}) {

  const [brews, setBrews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/brews?' + new URLSearchParams({
      userId: 1,
      coffeeId: coffee_id,
    }), {
      method: 'GET',

    }).then((response) => response.json())
      .then((data) => setBrews(data))
      .catch((err) => console.log(err))
  }, [])

  const labels = brews.map((brew, index) => index);
  const data = {
    labels,
    datasets: [
      {
        label: 'Brew rating',
        data: brews.map(brew => brew.rating),
      }
    ]
  }

  return (
    <Card>
      <Header>
        <div>{name}</div>
        <div>Times brewed: {brews.length}</div>
      </Header>
      <Body>
        <Graph>
          {brews.length > 0 ?
          <Line
            data={data}/> : <div></div>}
        </Graph>
        <button>BREW</button>
      </Body>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5em;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Graph = styled.div`
  width: 50%;
`