import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './NotificationBtn';
import NotifictionBtn from './NotificationBtn';

const HeaderDiv = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  margin-bottom: 40px;
  margin-left: 70px;
  height: 80px;
  position: relative;
`;

const H1 = styled.h1`
  font-size: 2rem;
`;
const AuthLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthLink = styled(StyledLink)`
  padding: 0.7rem 1.2rem;
  border: 1px solid white;
  border-radius: 5px;
  background-color: var(--robin-egg-blue);
  color: var(--jet);

  &:hover {
    background-color: #21a1f1;
  }
`;
const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: var(--robin-egg-blue);
  margin: 0;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    async function fetchMe() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiUrl}/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const { user } = await res.json();
        setUser(user);
        setLoading(false);
      } catch (error) {
        setUser(null);
      }
    }

    fetchMe();
  }, []);

  return (
    <HeaderDiv>
      <H1>Zagg App</H1>
      <AuthLinkContainer>
        {!loading &&
          (user !== null ? (
            <WelcomeMessage>Welcome {user.name}!</WelcomeMessage>
          ) : (
            <>
              <AuthLink to="/login">Login</AuthLink>
              <AuthLink to="/register">Signup</AuthLink>
            </>
          ))}
      </AuthLinkContainer>
      <NotifictionBtn />
    </HeaderDiv>
  );
}

export default Header;
