import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

const Header = () => {
  // 로그인 모달 상태
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // 회원가입 모달 상태
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  // 로그인 모달
  const openLoginModal = () => {
    setRegisterModalIsOpen(false);
    setModalIsOpen(true);
  };
  const closeLoginModal = () => {
    setModalIsOpen(false);
  };
  // 회원가입 모달
  const openSignUpModal = () => {
    setModalIsOpen(false);
    setRegisterModalIsOpen(true);
  };
  const closeSignUpModal = () => {
    setRegisterModalIsOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Link>
        </Logo>
        <Text onClick={openLoginModal}>로그인</Text>
      </HeaderWrapper>
      {modalIsOpen && (
        <ModalWrapper>
          <Modal>
            <CloseButton onClick={closeLoginModal}>&times;</CloseButton>
            <TitleWrapper>로그인</TitleWrapper>
            <InputWrapper>
              <Input type="text" placeholder="이메일을 입력해주세요." />
              <Input type="password" placeholder="비밀번호를 입력해주세요." />
            </InputWrapper>
            <BottomWrapper>
              <Button onClick={closeLoginModal}>로그인하기</Button>
              <LoginText onClick={openSignUpModal}>
                아직 회원이 아니신가요?
              </LoginText>
            </BottomWrapper>
          </Modal>
        </ModalWrapper>
      )}
      {registerModalIsOpen && (
        <ModalWrapper>
          <Modal>
            <CloseButton onClick={closeSignUpModal}>&times;</CloseButton>
            <TitleWrapper>회원가입</TitleWrapper>
            <InputWrapper>
              <Input type="text" placeholder="이메일을 입력해주세요." />
              <Input type="password" placeholder="비밀번호를 입력해주세요." />
              <Input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요."
              />
            </InputWrapper>
            <BottomWrapper>
              <Button onClick={closeSignUpModal}>회원가입하기</Button>
              <LoginText onClick={openLoginModal}>이미 회원이신가요?</LoginText>
            </BottomWrapper>
          </Modal>
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;

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
  right: 2rem;
  bottom: 1rem;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

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

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 40rem;
  height: 35rem;
  position: relative;
  text-align: center;
`;

const TitleWrapper = styled.div`
  width: inherit;
  height: 5rem;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: inherit;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Input = styled.input`
  width: 30rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  outline: none;
  text-align: left;
  padding-left: 1rem;
`;

const BottomWrapper = styled.div`
  width: inherit;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Button = styled.button`
  width: 20rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 2rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;
`;

const LoginText = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 10;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
