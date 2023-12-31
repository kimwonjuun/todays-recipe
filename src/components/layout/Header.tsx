import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { firebaseConfig } from '../../apis/firebase';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 모달 상태
  const [LoginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);

  // 회원가입 모달 상태
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState<boolean>(false);

  // 로그인 모달
  const openLoginModal = () => {
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  // 내가 위치한 라우트에 따라 헤더 내비게이트 텍스트 스타일링
  const NaviSelectedStyle = (path: string) => {
    if (location.pathname.includes('/search') && path === '/') {
      return { color: COLORS.blue2 };
    }
    return location.pathname === path ? { color: COLORS.blue2 } : {};
  };

  // 로그인 상태 확인
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );

  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg
              src={require('../../assets/common/logo.webp')}
              alt="logo"
            />
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
                검색
              </Text>
              <Text
                style={NaviSelectedStyle('/recipe')}
                onClick={() => {
                  navigate('/recipe');
                }}
              >
                레시피
              </Text>
              <Text
                style={NaviSelectedStyle('/my')}
                onClick={() => {
                  navigate('/my');
                }}
              >
                마이페이지
              </Text>
              {JSON.parse(isLoggedIn).email === 'admin@admin.ad' && (
                <Text
                  style={NaviSelectedStyle('/admin')}
                  onClick={() => {
                    navigate('/admin');
                  }}
                >
                  관리자페이지
                </Text>
              )}
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
                검색
              </Text>
              <Text
                style={NaviSelectedStyle('/recipe')}
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

  @media (max-width: 1050px) {
    width: 10rem;
    height: 10rem;
  }
  @media (max-width: 700px) {
    width: 8rem;
    height: 8rem;
  }
  @media (max-width: 550px) {
    width: 7rem;
    height: 7rem;
  }
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

  @media (max-width: 1050px) {
    right: 1.5rem;
    font-size: 1.25rem;
  }
  @media (max-width: 700px) {
    right: 1.25rem;
    font-size: 1.125rem;
  }
  @media (max-width: 550px) {
    right: 1rem;
    font-size: 1rem;
  }
`;

const Text = styled.div`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
