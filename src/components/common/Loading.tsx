import styled, { keyframes } from 'styled-components';
import COLORS from '../../styles/colors';

export const Loading = () => {
  return (
    <>
      <Wrapper>
        <LoadingImage
          src={require('../../assets/loading.png')}
          alt="Loading..."
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const LoadingImage = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  animation: ${bounce} 0.8s infinite ease-in-out;
`;