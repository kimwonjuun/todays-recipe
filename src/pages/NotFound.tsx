import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다. - todays recipe</title>
      </Helmet>
      <PageWrapper>
        <BoxWrapper>
          <ImgBox>
            <Img src={require('../assets/error/error.webp')} alt="error" />
          </ImgBox>
          <TextBox>
            <TopText>
              <p>페이지를 찾을 수 없습니다.</p>
            </TopText>
            <BottomText>
              <Button
                onClick={() => {
                  navigate('/');
                }}
              >
                메인 페이지로 되돌아가기
              </Button>
              <Button
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate('/');
                  }
                }}
              >
                이전 페이지로 되돌아가기
              </Button>
            </BottomText>
          </TextBox>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default NotFound;

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
  width: 50rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 50%;
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
  height: 45%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;
const BottomText = styled.div`
  width: inherit;
  height: 55%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-size: 1.25rem;
`;

const Button = styled.button`
  width: 40%;
  height: 3.75rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }
  padding: 0.5rem;
  margin: 0 0.5rem;
`;
