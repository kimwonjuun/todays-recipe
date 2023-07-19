import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleShowButton = () => {
    const { scrollY } = window;
    scrollY > 200 ? setShowButton(true) : setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleShowButton);

    return () => {
      window.removeEventListener('scroll', toggleShowButton);
    };
  }, []);
  return (
    <>
      <Button onClick={scrollToTop} showButton={showButton}>
        <img src={require('../../assets/top_button.png')} />
      </Button>
    </>
  );
};

export default ScrollToTopButton;

const Button = styled.div<{ showButton: boolean }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;

  position: fixed;
  right: 2rem;
  bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${(props) => (props.showButton ? 1 : 0)};
  transition: opacity 300ms ease-in-out;

  background-color: ${COLORS.blue1};

  &:hover {
    opacity: 0.8;
  }
`;
