import styled from 'styled-components';
import COLORS from './colors';

export const ModalWrapper = styled.div`
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

export const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 40rem;
  height: 50rem;
  position: relative;
  text-align: center;
`;

export const TitleWrapper = styled.div`
  width: inherit;
  height: 5rem;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  width: inherit;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 30rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  outline: none;
  text-align: left;
  padding-left: 1rem;
`;

export const BottomWrapper = styled.div`
  width: inherit;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

export const Button = styled.button`
  width: 31.5rem;
  height: 4.5rem;
  border-radius: 1rem;
  border: ${({ disabled }) =>
    disabled ? 'none' : `0.25rem solid ${COLORS.blue1}`};
  font-size: 2rem;
  color: #fff;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.gray : COLORS.blue1};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  outline: none;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? COLORS.gray : COLORS.blue2};
  }
`;

export const LoginText = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

export const CloseButton = styled.button`
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

export const CustomSpan = styled.span`
  font-size: 1rem;
  margin: -2.2rem 0;
  &.success {
    color: ${COLORS.blue1};
  }
  &.error {
    color: ${COLORS.red};
  }
`;

export const Logo = styled.div`
  width: 11rem;
  height: 11rem;
`;

export const LogoImg = styled.img`
  width: 100%;
`;
