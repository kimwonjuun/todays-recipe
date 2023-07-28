import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { firebaseConfig } from '../../apis/firebase';
import { LoginModal } from '../auth/LoginModal';
import { SignUpModal } from '../auth/SignUpModal';

const Header = () => {
  const navigate = useNavigate();
  const [LoginModalIsOpen, setLoginModalIsOpen] = useState(false); // 로그인 모달 상태
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false); // 회원가입 모달 상태

  // 로그인 모달
  const openLoginModal = () => {
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  // 내가 위치한 라우트에 따라 헤더 내비게이트 텍스트 스타일링
  const location = useLocation();
  const NaviSelectedStyle = (path: string) => {
    if (location.pathname.includes('/search') && path === '/') {
      return { color: COLORS.blue2 };
    }
    return location.pathname === path ? { color: COLORS.blue2 } : {};
  };

  // 로그인 상태 확인
  // const auth = getAuth();
  // const user = auth.currentUser;
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Link>
        </Logo>
        {isLoggedIn ? (
          <>
            <TextWrapper>
              <Text
                style={NaviSelectedStyle('/')}
                onClick={() => {
                  navigate('/');
                }}
              >
                검색하기
              </Text>
              <Text
                style={NaviSelectedStyle('/recipe')}
                onClick={() => {
                  navigate('/recipe');
                }}
              >
                레시피보러가기
              </Text>
              <Text
                style={NaviSelectedStyle('/my')}
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
                style={NaviSelectedStyle('/')}
                onClick={() => {
                  navigate('/');
                }}
              >
                검색하기
              </Text>
              <Text
                style={NaviSelectedStyle('/recipe')}
                onClick={() => {
                  navigate('/recipe');
                }}
              >
                레시피보러가기
              </Text>
              <Text onClick={openLoginModal}>로그인</Text>
            </TextWrapper>
          </>
        )}
      </HeaderWrapper>
      {LoginModalIsOpen && (
        <LoginModal
          setLoginModalIsOpen={setLoginModalIsOpen}
          setSignUpModalIsOpen={setSignUpModalIsOpen}
        />
      )}
      {signUpModalIsOpen && (
        <SignUpModal
          setLoginModalIsOpen={setLoginModalIsOpen}
          setSignUpModalIsOpen={setSignUpModalIsOpen}
        />
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
