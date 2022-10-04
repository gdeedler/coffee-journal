import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts";
import { useEffect, useState } from "react";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import api from "../helpers/api";
import { ThemeProvider } from "styled-components";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const light = {
  dark: false,
  text: "#2c1404",
  background: "rgb(235, 214, 187)",
  itemBg: 'antiquewhite',
};
const dark = {
  dark: true,
  text: "antiquewhite",
  background: "#2c1404  ",
  itemBg: '#271203',
};

export default function Root() {
  const [userId, setUserId] = useState(1);
  const [token, setToken] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? dark : light;
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
        audience: "Coffee",
        scope: "read:coffees",
      });
      api.setAuthorization(accessToken);
      api.get("/auth").catch((err) => console.log("Failed to authenticate"));
      if (window.location.pathname === "/") navigate("/journal");
    };
    getToken().catch((err) => console.log(err));
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container>
          <Header>
            <Name>
              {isAuthenticated ? `${user.given_name}'s` : null} Coffee Journal
            </Name>
            <Links>
              <StyledLink to={"journal"}>Journal</StyledLink>
              <StyledLink to={"coffees"}>Coffees</StyledLink>
              <StyledLink to={"analytics"}>Stats</StyledLink>
              {darkMode ? (
                <MdLightMode
                  style={{ fontSize: "1.5em", animation: "fadein .5s", cursor: 'pointer' }}
                  onClick={() => setDarkMode(false)}
                />
              ) : (
                <MdDarkMode
                  style={{ fontSize: "1.5em", animation: "fadein .5s", cursor: 'pointer' }}
                  onClick={() => setDarkMode(true)}
                />
              )}
            </Links>
            {isAuthenticated ? (
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
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
      </Background>
    </ThemeProvider>
  );
}

const Background = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  width: 100%;
  padding: 0.8em;
  overflow: hidden;
  transition: all 1s ease;
`;
const Container = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1200px;
  margin: auto;
  color: ${(props) => props.theme.text};
`;

const Header = styled.header`
  background-color: #2c1404;
  border-radius: 5px;
  outline: ${(props) => (props.theme.dark ? "2px solid antiquewhite" : "none")};
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
    color: antiquewhite;
  }
`;
const OutletWrapper = styled.div`
  width: 95%;
`;

const Name = styled.div`
  color: antiquewhite;
  font-size: 1.5em;
  font-weight: 400;
`;
const Button = styled.button`
  transition: all 1s ease;
  float: right;
  text-decoration: none;
  font-size: 1em;
  font-family: inherit;
  color: ${props => props.theme.text};
  outline: ${props => props.theme.dark ? '2px solid antiquewhite' : '2px solid #2c1404'};
  background-color: ${props => props.theme.dark ? '#2c1404' : 'antiquewhite'};
  border: none;
  border-radius: 3px;
  padding: 0.3em 0.5em;
  margin-left: 2em;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
