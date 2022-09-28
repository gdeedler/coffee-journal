import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../helpers/api';

export default function Root() {
  const [userId, setUserId] = useState(1);
  const [token, setToken] = useState(null);
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if(!isAuthenticated) return;
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: 'Coffee',
        scope: 'read:coffees',
      })
      api.setAuthorization(accessToken);
      api.get('/auth').catch(err => console.log('Failed to authenticate'));
    }
    getToken().catch(err => console.log(err))
  },[getAccessTokenSilently, user?.sub])
  console.log(user);

  return (
    <UserContext.Provider value={userId}>
      <>
        <Container>
          <Header>
            <Name>{isAuthenticated ? `${user.name}'s` : null} Coffee Journal</Name>
            <Links>
              <StyledLink to={'journal'}>Journal</StyledLink>
              <StyledLink to={'coffees'}>Coffees</StyledLink>
              <StyledLink to={'analytics'}>Analytics</StyledLink>
            </Links>
            {isAuthenticated ? (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </button>
            ) : (
              <button onClick={() => loginWithRedirect()}>Login</button>
            )}
          </Header>
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </Container>
      </>
    </UserContext.Provider>
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
  gap: 1em;
  color: white;
`;
const StyledLink = styled(Link)`
  color: white;
  &:visited{
    color: white;
  }
`
const OutletWrapper = styled.div`
  width: 95%;
`

const Name = styled.div`
  color: white;
  font-size: larger;
  font-weight: bolder;
`;
