import Header from '../Header/Header';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import UserDiv from './UserDiv';
import Sidebar from '../Sidebar/Sidebar';
const UserSiteCont = styled.div`
  padding: 30px;
  background-color: var(--onyx);
  height: calc(100% - 120px);
`;

const UsersCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--onyx);
  margin: 0 auto;
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  margin: 40px auto;
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--robin-egg-blue);
    border-radius: 5px;
    font-size: 1rem;
  }
  button {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: var(--glaucous);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: var(--glaucous);
    }
  }
`;

async function fetchUsers(keyword) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users?keyword=${keyword || ''}`
    );
    if (!res.ok) {
      const err = await res.json();
      return err.error || 'An error occurred while fetching users';
    }
    const usersList = await res.json();
    return usersList;
  } catch (error) {
    return error.error || 'An error occurred while fetching users';
  }
}

function Users() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getUsers() {
      const usersList = await fetchUsers();
      if (Array.isArray(usersList)) {
        setUsers(usersList);
      } else {
        setError(usersList);
      }
    }
    getUsers();
  }, []);
  async function handleSearch(e) {
    e.preventDefault();
    const keyword = e.target.elements[0].value.trim();
    const usersList = await fetchUsers(keyword);
    if (Array.isArray(usersList)) {
      setUsers(usersList);
    } else {
      setError(usersList);
    }
  }
  return (
    <>
      <Header />
      <Sidebar />
      <UserSiteCont>
        <SearchForm onSubmit={handleSearch}>
          <input type="text" placeholder="Search users..." />
          <button type="submit">Search</button>
        </SearchForm>
        <UsersCont>
          {users
            ? users.map((user) => {
                return (
                  <UserDiv
                    key={user.id}
                    name={user.name}
                    id={user.id}
                    ppic={user.ppic}
                  />
                );
              })
            : 'Loading...'}
        </UsersCont>
      </UserSiteCont>
    </>
  );
}
export default Users;
