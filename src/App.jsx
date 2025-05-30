import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import Header from './Header/Header';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import sortMessages from './Chat/sortMessages';

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
  position: relative;
  border-bottom: 1px solid white;
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

const MsgCount = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  bottom: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
function App() {
  const [chats, setChats] = useState(null);
  const [error, setError] = useState(null);
  const [appReset, setAppReset] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchChats() {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }
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
        if (res.status === 401) {
          setError('Unauthorized. Please log in again.');
          navigate('/login');
          return;
        }
        if (!res.ok) {
          const errorData = await res.json();
          return setError(errorData.error);
        }
        const contacts = await res.json();
        let processed = contacts.map((contact) => {
          return { ...contact, messages: sortMessages(contact) };
        });
        const sorted = processed.sort((a, b) => {
          if (a.messages.length === 0) {
            return 1;
          } else if (b.messages.length === 0) {
            return -1;
          }
          return (
            new Date(b.messages[b.messages.length - 1].sendAt) -
            new Date(a.messages[a.messages.length - 1].sendAt)
          );
        });
        return setChats(sorted);
      } catch (error) {
        console.log(error);
        return setError(error.error || 'An Error ocurred');
      }
    }
    fetchChats();
  }, [appReset, navigate]);
  return (
    <>
      <Header />
      <Sidebar />
      <AppCont>
        {chats ? (
          <ChatsDiv>
            {chats.map((chat) => {
              const unread = chat.messagesSent.filter(
                (message) => message.isRead === false
              ).length;
              return (
                <Chat to={chat.id} key={chat.id}>
                  <ProfilePic
                    src={`${import.meta.env.VITE_API_URL}/static/${chat.ppic}`}
                  />
                  <NameP>{chat.name}</NameP>
                  {unread > 0 && <MsgCount>{unread}</MsgCount>}
                </Chat>
              );
            })}
          </ChatsDiv>
        ) : (
          'loading...'
        )}
        <Outlet context={{ setAppReset, chats }} />
      </AppCont>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default App;
