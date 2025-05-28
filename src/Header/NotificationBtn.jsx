import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Notification = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.4));
  }
`;

const MsgCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const MessagesContainer = styled.div`
  color: black;
  position: absolute;
  top: 50px;
  right: 50px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

const MsgItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  &p {
    font-size: 0.8rem;
  }
`;

const AcceptButton = styled.button`
  border: none;
  background-color: transparent;
  transition: filter 0.2s ease;
  &:hover svg {
    filter: brightness(1.2);
  }
`;

const RejectButton = styled(AcceptButton)``;
function NotifictionBtn() {
  const [requests, setRequests] = useState([]);
  const [msgToggle, setMsgToggle] = useState(false);
  const [error, setError] = useState(null);
  const [reset, setReset] = useState(0);
  const reqLength = requests.length;
  useEffect(() => {
    async function fetchRequests() {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      if (!token) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user.id}/requests`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to fetch requests');
        }
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    }
    fetchRequests();
  }, [reset]);
  function handleClick() {
    setMsgToggle((prev) => !prev);
  }

  async function handleResponse(status, reqId) {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}/requests/${reqId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return setError(err.error || 'Failed to respond to request');
      }
      setMsgToggle(false);
      setReset((prev) => prev + 1);
    } catch (error) {
      setError(error.error || 'Failed to respond to request');
    }
  }

  return (
    <Notification>
      <Button onClick={handleClick}>
        <svg
          fill="#52a9beff"
          width="32px"
          height="32px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4 8a6 6 0 0 1 4.03-5.67 2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2V8zm8 10a2 2 0 1 1-4 0h4z"></path>
          </g>
        </svg>
        {reqLength > 0 && <MsgCount>{reqLength}</MsgCount>}
      </Button>
      {msgToggle && reqLength > 0 && (
        <MessagesContainer>
          {requests.map((req) => (
            <MsgItem key={req.id}>
              <p>{req.sender.name} has sent you a friend request.</p>
              <AcceptButton onClick={() => handleResponse('accepted', req.id)}>
                <svg
                  fill="#18af4a"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="27px"
                  height="27px"
                  viewBox="0 0 567.123 567.123"
                  xmlSpace="preserve"
                  stroke="#18af4a"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M0,567.119h567.123V0.004H0V567.119z M56.818,283.477l43.556-43.568c5.404-5.404,11.812-8.109,19.217-8.109 c7.399,0,13.807,2.705,19.217,8.109l90.092,90.105l199.408-199.409c5.404-5.404,11.811-8.121,19.217-8.121 c7.398,0,13.807,2.717,19.217,8.121l43.557,43.55c5.402,5.422,8.113,11.824,8.113,19.217c0,7.405-2.711,13.813-8.113,19.217 L248.117,474.764c-5.41,5.422-11.818,8.121-19.217,8.121c-7.405,0-13.813-2.705-19.217-8.121L56.818,321.91 c-5.41-5.404-8.115-11.812-8.115-19.217C48.703,295.287,51.402,288.881,56.818,283.477z"></path>{' '}
                      </g>
                    </g>
                  </g>
                </svg>
              </AcceptButton>
              <RejectButton onClick={() => handleResponse('rejected', req.id)}>
                <svg
                  fill="#da2525"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="27px"
                  height="27px"
                  viewBox="0 0 551.057 551.057"
                  xmlSpace="preserve"
                  stroke="#da2525"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M136.415,378.186l37.216,37.216c8.807,8.807,23.084,8.807,31.897,0l70-70.001l70.001,70.001 c8.807,8.807,23.084,8.807,31.897,0l37.215-37.216c8.808-8.807,8.808-23.091,0-31.897l-70-70.007l70-70 c8.808-8.807,8.808-23.091,0-31.897l-37.215-37.216c-8.807-8.807-23.085-8.807-31.897,0l-70.001,69.995l-70-70.001 c-8.807-8.807-23.084-8.807-31.897,0l-37.216,37.216c-8.807,8.807-8.807,23.091,0,31.897l70,70.007l-70,70.001 C127.602,355.095,127.602,369.373,136.415,378.186z"></path>{' '}
                        <path d="M477.685,0H73.373C32.913,0,0,32.913,0,73.373v404.312c0,40.459,32.913,73.372,73.373,73.372h404.312 c40.459,0,73.372-32.913,73.372-73.372V73.373C551.057,32.913,518.149,0,477.685,0z M459.257,459.257H91.8V91.8h367.463v367.457 H459.257z"></path>{' '}
                      </g>
                    </g>
                  </g>
                </svg>
              </RejectButton>
            </MsgItem>
          ))}
        </MessagesContainer>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Notification>
  );
}

export { MsgCount };
export default NotifictionBtn;
