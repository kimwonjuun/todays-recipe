import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useState } from 'react';

const Admin = () => {
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <AdminBox>
            <p>파이어스토어에 데이터 넣어주기</p>
          </AdminBox>
          <AdminBox></AdminBox>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Admin;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;
const BoxWrapper = styled.div`
  width: 60rem;
  height: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
const AdminBox = styled.div`
  border: 0.1rem solid ${COLORS.blue1};
  border-radius: 1rem;
  width: 29rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  p {
    &:hover {
      color: ${COLORS.blue1};
      cursor: pointer;
    }
  }
`;
