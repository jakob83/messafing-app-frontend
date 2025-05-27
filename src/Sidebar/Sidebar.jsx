import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  width: 70px;
  height: 100%;
  background-color: var(--gunmetal);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  &:hover {
    width: 240px;
    & h2 {
      display: block;
      color: #ffffff;
    }
  }
`;

const SidebarList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: calc(100% - 10px);
  margin-top: 50px;
  margin-left: 10px;
`;

const SideBarLink = styled(Link)`
  box-sizing: border-box;
  padding: 5px 10px;
  width: calc(100%);
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 20px;

  transition: background-color 0.2s ease-in-out;
  & h2 {
    display: none;
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }
  &:hover {
    background-color: var(--robin-egg-blue);
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarList>
        <SideBarLink to="/">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
          <h2>Home</h2>
        </SideBarLink>
        <SideBarLink to="/users">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M1.5 6.5C1.5 3.46243 3.96243 1 7 1C10.0376 1 12.5 3.46243 12.5 6.5C12.5 9.53757 10.0376 12 7 12C3.96243 12 1.5 9.53757 1.5 6.5Z"
                fill="#ffffff"
              ></path>
              <path
                d="M14.4999 6.5C14.4999 8.00034 14.0593 9.39779 13.3005 10.57C14.2774 11.4585 15.5754 12 16.9999 12C20.0375 12 22.4999 9.53757 22.4999 6.5C22.4999 3.46243 20.0375 1 16.9999 1C15.5754 1 14.2774 1.54153 13.3005 2.42996C14.0593 3.60221 14.4999 4.99966 14.4999 6.5Z"
                fill="#ffffff"
              ></path>
              <path
                d="M0 18C0 15.7909 1.79086 14 4 14H10C12.2091 14 14 15.7909 14 18V22C14 22.5523 13.5523 23 13 23H1C0.447716 23 0 22.5523 0 22V18Z"
                fill="#ffffff"
              ></path>
              <path
                d="M16 18V23H23C23.5522 23 24 22.5523 24 22V18C24 15.7909 22.2091 14 20 14H14.4722C15.4222 15.0615 16 16.4633 16 18Z"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
          <h2>Users</h2>
        </SideBarLink>
        <SideBarLink to="/settings">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16 2H2a1.5 1.5 0 0 0-.37.04A1.981 1.981 0 0 0 .04 3.63 1.5 1.5 0 0 0 0 4v8a1.5 1.5 0 0 0 .04.37 1.981 1.981 0 0 0 1.59 1.59A1.5 1.5 0 0 0 2 14l2 .02V16a.987.987 0 0 0 .62.92A.839.839 0 0 0 5 17c.266 0 .52-.103.71-.29L8 14h8a2.006 2.006 0 0 0 2-2V4a2.006 2.006 0 0 0-2-2zM3 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                fill="#ffffff"
                fillRule="evenodd"
              ></path>
            </g>
          </svg>
          <h2>Settings</h2>
        </SideBarLink>
        <SideBarLink to="/profile">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#ffffff"
                d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z"
              ></path>
            </g>
          </svg>
          <h2>Profile</h2>
        </SideBarLink>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
