import styled from "styled-components"
import {useAuth0} from '@auth0/auth0-react'
import { useNavigate } from "react-router-dom";


export default function Login() {

  return(
    <Container>
      Please login to start tracking brews
    </Container>
  )
}

const Container = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 2em;
  font-weight: 300;
  font-style: italic;
  opacity: .8;
`