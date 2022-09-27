import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";

export default function Root() {
  return (
    <>
      <Container>
        <Header>
          <Name>Coffee Journal</Name>
          <Links>
            <Link to={"journal"}>Journal</Link>
            <Link to={"coffees"}>Coffees</Link>
            <Link to={"analytics"}>Analytics</Link>
          </Links>
        </Header>
        <Outlet/>
      </Container>
    </>
  );
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  margin: auto;
`

const Header = styled.header`
  background-color: navy;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  gap: 1em;
  align-items: center;
  margin-bottom: .5em;
`
const Links = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1em;
`


const Name = styled.div`
  color: white;
  font-size: larger;
  font-weight: bolder;
`