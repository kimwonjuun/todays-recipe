import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import EditHistoryBox from '../components/admin/EditHistoryBox';
import EditFormBox from '../components/admin/EditFormBox';
import { firebaseConfig } from '../apis/firebase';

const Admin = () => {
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  const user = JSON.parse(isLoggedIn ?? '{}');

  const navigate = useNavigate();
  useEffect(() => {
    user.email === 'test@test.com' ? navigate('/admin') : navigate('/');
  }, []);

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
