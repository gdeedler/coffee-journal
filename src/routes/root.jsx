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
              <Link to={'journal'}>Journal</Link>
              <Link to={'coffees'}>Coffees</Link>
              <Link to={'analytics'}>Analytics</Link>
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
          <Outlet />
        </Container>
      </>
    </UserContext.Provider>
  );
}

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.header`
  background-color: navy;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  gap: 1em;
  align-items: center;
  margin-bottom: 0.5em;
`;
const Links = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1em;
`;

const Name = styled.div`
  color: white;
  font-size: larger;
  font-weight: bolder;
`;
