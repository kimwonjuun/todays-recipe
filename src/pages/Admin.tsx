import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import ConfirmDataHistoryBox from '../components/admin/ConfirmDataHistoryBox';
import EditDataFormBox from '../components/admin/EditDataFormBox';
import { authService } from '../apis/firebase';
import { User } from 'firebase/auth';

const Admin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  // 유저 상태 업데이트: !관리자 이메일일 시 페이지 접근 제한
  useEffect(() => {
    // user 객체 존재 시 setUser 업데이트

    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user && user.email === 'admin@admin.ad') {
        setUser(user);
        navigate('/admin');
      } else {
        navigate('/error');
      }
    });

    return () => {
      handleAuthStateChange();
    };
  }, []);

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ConfirmDataHistoryBox />
          <EditDataFormBox />
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
