import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { LoginModal } from '../login/LoginModal';
import { SignUpModal } from '../login/SignUpModal';
import { getAuth } from 'firebase/auth';

const Header = () => {
  const navigate = useNavigate();
  const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false); // 로그인 모달 상태
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false); // 회원가입 모달 상태

  // 로그인 모달
  const openLoginModal = () => {
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  // 현재 유저
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('user: ', user);

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Link>
        </Logo>
        {user ? (
          <>
            <TextWrapper>
              <Text
                onClick={() => {
                  navigate('/');
                }}
              >
                홈
              </Text>
              <Text
                onClick={() => {
                  navigate('/recipe');
                }}
              >
                레시피
              </Text>
              <Text
                onClick={() => {
                  navigate('/my');
                }}
              >
                마이페이지
              </Text>
            </TextWrapper>
          </>
        ) : (
          <>
            <TextWrapper>
              <Text
                onClick={() => {
                  navigate('/');
                }}
              >
                홈
              </Text>
              <Text
                onClick={() => {
                  navigate('/recipe');
                }}
              >
                레시피
              </Text>
              <Text onClick={openLoginModal}>로그인</Text>
            </TextWrapper>
          </>
        )}
      </HeaderWrapper>
      {LoginModalIsOpen && (
        <ModalWrapper>
          <LoginModal
            setLoginModalIsOpen={setLoginModalIsOpen}
            setSignUpModalIsOpen={setSignUpModalIsOpen}
          />
        </ModalWrapper>
      )}
      {signUpModalIsOpen && (
        <ModalWrapper>
          <SignUpModal
            setLoginModalIsOpen={setLoginModalIsOpen}
            setSignUpModalIsOpen={setSignUpModalIsOpen}
          />
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

const TextWrapper = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  gap: 1.5rem;
`;

const Text = styled.div`
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
