import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  gap: 30px;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--jet);
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserName = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const ChatHeader = ({ profilePic, userName }) => {
  return (
    <HeaderContainer>
      <ProfilePic src={profilePic} alt="Profile" />
      <UserName>{userName}</UserName>
    </HeaderContainer>
  );
};

export default ChatHeader;
