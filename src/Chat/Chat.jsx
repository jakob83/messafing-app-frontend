import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { jwtDecode } from 'jwt-decode';
import { useOutletContext, useParams } from 'react-router-dom';
import createMessageList from './createMessageList';

const ChatCont = styled.div`
  height: calc(100% - 70px);
  width: 100%;
`;

function Chat() {
  const [error, setError] = useState(null);
  const { contactId } = useParams();
  const { setAppReset, chats } = useOutletContext();

  useEffect(() => {
    // make Messages read
    async function fetchMsg() {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user.id}/messages`,
          {
            method: 'PUT',
            body: JSON.stringify({ senderId: contactId, isRead: true }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const err = await res.json();
          return setError(err.error);
        }
        setAppReset((prev) => prev + 1);
        const data = await res.json();
      } catch (error) {
        setError(error.error || 'An error occurred');
      }
    }
    fetchMsg();
  }, [contactId, setAppReset]);
  async function handleSend(text) {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: text, receiverId: contactId }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return setError(err.error);
      }
      setAppReset((prev) => prev + 1);
    } catch (error) {
      return setError(
        error.error || 'An error occurred while sending the message'
      );
    }
  }
  if (!chats) {
    setAppReset((prev) => prev + 1);
    return <div>Loading...</div>;
  }
  const contact = chats.find((chat) => chat.id === contactId);

  const messageList = contact && createMessageList(contact.messages);
  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}
      {contact && (
        <ChatHeader
          userName={contact.name}
          profilePic={`${import.meta.env.VITE_API_URL}/static/${contact.ppic}`}
        />
      )}
      <ChatCont>
        <MainContainer>
          <ChatContainer>
            <MessageList>{contact && messageList}</MessageList>
            <MessageInput
              placeholder="Type message here"
              attachButton={false}
              onSend={(text) => {
                if (text.trim() === '') return;
                handleSend(text);
              }}
            />
          </ChatContainer>
        </MainContainer>
      </ChatCont>
    </div>
  );
}

export default Chat;
