import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getAuth } from 'firebase/auth';

const My = () => {
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox>
            <Profile>
              <ProfileImg></ProfileImg>
              <ProfileText>
                <p>이메일</p>
              </ProfileText>
              <ProfileText>
                <p>닉네임</p>
              </ProfileText>
            </Profile>
            <LogoutBox>
              <LogoutButton>로그아웃</LogoutButton>
            </LogoutBox>
          </ProfileBox>

          <UserHistoryBox>
            <UserHistory></UserHistory>
          </UserHistoryBox>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default My;

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
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  margin: 3rem;

  /* border: 1rem solid yellow; */
`;

const ProfileBox = styled.div`
  width: 25%;
  height: 95%;
  background-color: #fff;
  border: 0.25rem solid ${COLORS.blue2};
  border-radius: 1rem;
`;

const Profile = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.div`
  width: 60%;
  height: 55%;
  border-radius: 50%;
  background-color: black;
  margin: 1rem 0;
`;

const ProfileText = styled.div`
  width: 90%;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.button`
  width: 80%;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;
`;

const UserHistoryBox = styled.div`
  width: 50%;
  height: 95%;
  background-color: #fff;
  border: 0.25rem solid ${COLORS.blue2};
  border-radius: 1rem;
`;

const UserHistory = styled.div`
  width: 100%;
  height: 100%;
`;
