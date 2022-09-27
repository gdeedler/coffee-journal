import styled from "styled-components";

export default function JournalCard ({coffee: {name, country, elevation, notes, process, producer, region, roaster}}) {

  return (
    <Card>
      <Header>
        <div>{name}</div>
        <div>Times brewed: </div>
      </Header>
      <Body>
        <div>Graph</div>
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