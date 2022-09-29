import { Outlet, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts';
import { useEffect, useState } from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import api from '../helpers/api';

export default function Root() {
  const [userId, setUserId] = useState(1);
  const [token, setToken] = useState(null);
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: 'Coffee',
        scope: 'read:coffees',
      });
      api.setAuthorization(accessToken);
      api.get('/auth').catch((err) => console.log('Failed to authenticate'));
    };
    getToken().catch((err) => console.log(err));
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <Container>
      <Header>
        <Name>
          {isAuthenticated ? `${user.given_name}'s` : null} Coffee Journal
        </Name>
        <Links>
          <StyledLink to={'journal'}>Journal</StyledLink>
          <StyledLink to={'coffees'}>Coffees</StyledLink>
          <StyledLink to={'analytics'}>Stats</StyledLink>
        </Links>
        {isAuthenticated ? (
          <Button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => loginWithRedirect()}>Login</Button>
        )}
      </Header>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  margin: auto;
  color: #2c1404;
`;

const Header = styled.header`
  background-color: #2e1e06;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  gap: 1em;
  align-items: center;
  margin-bottom: 0.5em;
  width: 100%;
`;
const Links = styled.div`
  display: flex;
  margin-left: auto;
  gap: 2em;
  color: white;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: white;
  }
`;
const OutletWrapper = styled.div`
  width: 95%;
`;

const Name = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: 400;
`;
const Button = styled.button`
  float: right;
  text-decoration: none;
  font-size: 1em;
  background-color: antiquewhite;
  font-family: inherit;
  color: black;
  border: none;
  border-radius: 3px;
  padding: 0.3em 0.5em;
  margin-left: 2em;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
