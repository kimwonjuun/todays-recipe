import styled from 'styled-components';
import COLORS from '../styles/colors';

const ErrorPage = () => {
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ImgBox>
            <Img src={require('../assets/error.png')} />
          </ImgBox>
          <TextBox>
            <TopText>
              <p>페이지를 찾을 수 없습니다.</p>
            </TopText>
            <BottomText>
              <CustomP>메인 페이지로 되돌아가기</CustomP>
              <CustomP>이전 페이지로 되돌아가기</CustomP>
            </BottomText>
          </TextBox>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default ErrorPage;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 70rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 25%;
  height: 60%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  width: 100%;
  height: 40%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopText = styled.div`
  width: inherit;
  height: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
const BottomText = styled.div`
  width: inherit;
  height: 50%;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  font-size: 1.5rem;
`;

const CustomP = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
