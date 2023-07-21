import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Link>
        </Logo>
        <Text>로그인</Text>
      </HeaderWrapper>
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
  right: 1.5rem;
  bottom: 1rem;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
