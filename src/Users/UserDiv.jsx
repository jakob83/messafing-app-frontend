import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import styled from 'styled-components';

const UserCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5%;
  border-bottom: 1px solid var(--robin-egg-blue);
  max-width: 520px;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
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
const AddBtn = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: var(--moonstone);
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: var(--glaucous);
  }
`;
function UserDiv({ name, id, ppic }) {
  const [error, setError] = useState(null);
  async function handleAddUser(id, name) {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}/requests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiverId: id,
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        return setError(
          err.error || 'Failed to add user. Please try again later.'
        );
      }
      alert(`Request sent to ${name}`);
    } catch (error) {
      setError(error.error || 'Failed to add user. Please try again later.');
    }
  }
  return (
    <>
      <UserCont>
        <UserInfo>
          <ProfilePic src={`${import.meta.env.VITE_API_URL}/static/${ppic}`} />
          <NameP>{name}</NameP>
        </UserInfo>
        <AddBtn onClick={() => handleAddUser(id, name)}>
          <p>Add</p>
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            id="add-user-left-7"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            className="icon flat-color"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="secondary"
                d="M5,8A1,1,0,0,0,6,7V6H7A1,1,0,0,0,7,4H6V3A1,1,0,0,0,4,3V4H3A1,1,0,0,0,3,6H4V7A1,1,0,0,0,5,8Z"
                style={{ fill: '#ffffff' }}
              ></path>
              <path
                id="primary"
                d="M7.12,12.78A6.91,6.91,0,0,1,6,9C6,9,6,8.9,6,8.86A4,4,0,0,0,8.7,3.49a7,7,0,0,1,10.18,9.29A6,6,0,0,1,22,18v1a1,1,0,0,1-.29.71C21.47,19.94,19.23,22,13,22s-8.47-2.06-8.71-2.29A1,1,0,0,1,4,19V18A6,6,0,0,1,7.12,12.78Z"
                style={{ fill: 'var(--gunmetal)' }}
              ></path>
            </g>
          </svg>
        </AddBtn>
      </UserCont>{' '}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default UserDiv;
