import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Link>
        </Logo>
        <Text onClick={openModal}>로그인</Text>
      </HeaderWrapper>
      {modalIsOpen && (
        <ModalWrapper>
          <ModalContent>
            {/* 로그인, 회원가입 폼을 여기에 작성 */}
            <button onClick={closeModal}>닫기</button>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;

// 나머지 스타일 코드는 동일합니다.

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 40rem;
  width: 90%;
  position: relative;
`;

const HeaderWrapper = styled.div`
  height: 12.5rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 0.25rem solid ${COLORS.blue1};
`;
const Logo = styled.div`
  width: 11rem;
  height: 11rem;
`;
const LogoImg = styled.img`
  width: 100%;
`;
const Text = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1rem;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
