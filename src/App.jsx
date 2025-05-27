import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import Header from './Header/Header';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const AppCont = styled.div`
  margin-left: 70px;
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 1fr;
  height: calc(100% - 120px);
`;

const ChatsDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 100%;
  border-right: 5px solid var(--robin-egg-blue);
  height: 100%;
  box-sizing: border-box;
  background-color: var(--onyx);
`;

const Chat = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  width: 100%;
  padding: 10px 20px;
  color: var(--gunmetal);
  background-color: var(--moonstone);
  display: flex;
  align-items: center;
  gap: 40px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--glaucous);
  }
`;
const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
`;
const NameP = styled.p`
  font-size: 1.1rem;
`;
function App() {
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      const token = localStorage.getItem('token');
      const { id } = jwtDecode(token);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${id}/contacts`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          return setError(errorData.error);
        }
        const contacts = await res.json();
        return setChats(contacts.contacts);
      } catch (error) {
        return setError(error.error || 'An Error ocurred');
      }
    }
    fetchChats();
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <AppCont>
        {chats ? (
          <ChatsDiv>
            {chats.map((chat) => (
              <Chat to={chat.id} key={chat.id}>
                <ProfilePic
                  src={`${import.meta.env.VITE_API_URL}/static/${chat.ppic}`}
                />
                <NameP>{chat.name}</NameP>
              </Chat>
            ))}
          </ChatsDiv>
        ) : (
          'loading...'
        )}
        <Outlet />
      </AppCont>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default App;
