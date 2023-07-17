import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <>
      <Wrapper>
        <Logo>
          <Link to={'/'}>
            <LogoImg src="logo.png"></LogoImg>
          </Link>
        </Logo>
        <Text>로그인</Text>
      </Wrapper>
    </>
  );
};
export default Header;

const Wrapper = styled.div`
  height: 12.5rem;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-bottom: 3px solid #a3abd9;
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
  font-size: 1.5rem;
`;
