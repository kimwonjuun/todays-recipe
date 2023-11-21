import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { useState } from 'react';
import MyRefrigeratorBox from './MyRefrigeratorBox';
import MyLikesBox from './MyLikesBox';

interface UserAccountBoxProps {
  currentUserUid: string | undefined;
}

const UserAccountBox = ({ currentUserUid }: UserAccountBoxProps) => {
  // 탭
  const [currentTab, setCurrentTab] = useState<string>('나의 냉장고');
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <UserAccounttWrapper>
        <UserItem>
          <CategoriesWrapper>
            <Category
              onClick={() => handleTabChange('나의 냉장고')}
              data-is-selected={currentTab === '나의 냉장고'}
            >
              나의 냉장고
            </Category>
            <Category
              onClick={() => handleTabChange('찜한 레시피')}
              data-is-selected={currentTab === '찜한 레시피'}
            >
              찜한 레시피
            </Category>
          </CategoriesWrapper>
          {currentTab === '나의 냉장고' && (
            <MyRefrigeratorBox currentUserUid={currentUserUid} />
          )}
          {currentTab === '찜한 레시피' && (
            <MyLikesBox currentUserUid={currentUserUid} />
          )}
        </UserItem>
      </UserAccounttWrapper>
    </>
  );
};

export default UserAccountBox;

const UserAccounttWrapper = styled.div`
  width: 75rem;
  height: 40rem;
  font-size: 1.5rem;
  border-radius: 1rem;

  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1750px) {
    width: 65rem;
    height: 30rem;
  }
  @media (max-width: 1500px) {
    width: 45rem;
  }
  @media (max-width: 1150px) {
    width: 35rem;
    height: 25rem;
  }
  @media (max-width: 950px) {
    width: 20rem;
    height: 25rem;
  }
`;

const UserItem = styled.div`
  width: 70rem;
  height: 35rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 1750px) {
    width: 60rem;
    height: 25rem;
  }
  @media (max-width: 1500px) {
    width: 45rem;
  }
  @media (max-width: 1150px) {
    width: 30rem;
    height: 20rem;
  }
  @media (max-width: 950px) {
    width: 17.5rem;
    height: 22.5rem;
  }
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 1750px) {
    height: 1.5rem;
  }
  @media (max-width: 950px) {
    height: 1rem;
  }
`;

const Category = styled.div<{ 'data-is-selected': boolean }>`
  position: relative;
  height: 2rem;
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }

  @media (max-width: 1750px) {
    height: 1.5rem;
    font-size: 1rem;
  }
  @media (max-width: 1500px) {
    &:first-child {
      margin-left: 1.5rem;
    }
  }
  @media (max-width: 950px) {
    height: 1rem;
    font-size: 0.75rem;
    &:first-child {
      margin-left: 0;
    }
  }
`;
