import styled from "styled-components";

export default function CoffeeCard ({coffee: {name, country, elevation, notes, process, producer, region, roaster}}) {

  return (
    <Card>
      <div>{name}</div>
      <div>{country}</div>
      <div>{region}</div>
      <div>{producer}</div>
      <div>
        <button>Add to profile</button>
      </div>
    </Card>
  )
}

const Card = styled.div`
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5em;
`