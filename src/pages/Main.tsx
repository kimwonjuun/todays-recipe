import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          {/* <p>오늘 처리하고 싶은 재료 또는 하고 싶은 요리를 검색하세요.</p> */}
          <InputWrapper>
            <Input
              type="text"
              placeholder="오늘 처리하고 싶은 재료 또는 하고 싶은 요리를 검색하세요."
            />
            <SearchButton>검색</SearchButton>
          </InputWrapper>
          <CustomP
            onClick={() => {
              navigate('/recipe');
            }}
          >
            검색하지 않고 레시피를 구경하고 싶어요.
          </CustomP>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Main;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.8rem);

  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 60rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue2};
  font-size: 1.5rem;
  outline: none;
  text-align: center;
  padding-right: 8rem; // 검색 버튼 만큼 여백 추가
  /* margin-bottom: 5rem; */
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0rem;
  width: 7rem;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue2};
  font-size: 2rem;
  background-color: ${COLORS.blue2};
  color: white;
  cursor: pointer;
  outline: none;
`;

const CustomP = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue1};
  }
`;
