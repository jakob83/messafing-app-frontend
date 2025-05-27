import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import { useEffect, useState } from 'react';
import sortMessages from './sortMessages';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import createMessageList from './createMessageList';

const ChatCont = styled.div`
  height: calc(100% - 70px);
  width: 100%;
`;

function Chat() {
  const [messages, setMessages] = useState(null);
  const [contact, setContact] = useState(null);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(0);
  const { contactId } = useParams();
  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${
          user.id
        }/contacts/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return setError(err.error);
      }
      const contact = await res.json();
      setContact(contact);
      const sorted = sortMessages(contact);
      setMessages(sorted);
    }
    fetchMessages();
  }, [contactId, reset]);

  async function handleSend(text) {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    console.log(user);
    console.log(contactId);
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
      setReset(reset + 1); // Reset to trigger re-fetch
    } catch (error) {
      return setError(
        error.error || 'An error occurred while sending the message'
      );
    }
  }
  console.log(messages);
  const messageList = messages && createMessageList(messages);
  return (
    <div>
      {contact && (
        <ChatHeader
          userName={contact.name}
          profilePic={`${import.meta.env.VITE_API_URL}/static/${contact.ppic}`}
        />
      )}
      <ChatCont>
        <MainContainer>
          <ChatContainer>
            <MessageList>{messages && messageList}</MessageList>
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
