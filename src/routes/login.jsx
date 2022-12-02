import styled from "styled-components";
import { UserContext } from "../contexts";
import {useAuth0} from '@auth0/auth0-react'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";

export default function Login() {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/journal')
    }
  }, [user])

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