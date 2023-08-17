import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import EditHistoryBox from '../components/admin/EditHistoryBox';
import EditFormBox from '../components/admin/EditFormBox';
import { useState } from 'react';
import { authService } from '../api/firebase';
import { User } from 'firebase/auth';
import useUser from '../hooks/useUser';

const Admin = () => {
  const navigate = useNavigate();

  // 유저 상태 업데이트: useUser hook
  const { user } = useUser();

  // 관리자 이메일이 아닐 경우 페이지 접근 제한
  useEffect(() => {
    if (!user || user?.email !== 'admin@admin.ad') navigate('/error');
  }, [user]);

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <EditHistoryBox />
          <EditFormBox />
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
  justify-content: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;
const BoxWrapper = styled.div`
  width: 100rem;
  height: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
`;
