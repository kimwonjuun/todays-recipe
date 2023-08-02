import styled from 'styled-components';
import COLORS from '../styles/colors';
import { EditHistoryBox } from '../components/admin/EditHistoryBox';
import { EditFormBox } from '../components/admin/EditFomBox';

const Admin = () => {
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
  /* width: 150rem; */
  width: 100rem;
  height: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  /* margin-top: 8rem; */

  /* background-color: yellow; */
`;
