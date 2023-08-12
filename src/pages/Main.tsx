import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchForm from '../components/common/SearchForm';
import { koreanOnly } from '../utils/regex';
import useAlert from '../hooks/useAlert';
import AlertModal from '../components/common/AlertModal';

const Main = () => {
  const navigate = useNavigate();

  // 검색창
  const [inputValue, setInputValue] = useState<string>('');

  // 인풋창
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // custom modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 폼 제출 함수
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 한글만 입력되었는지 검사
    if (!inputValue.trim() || !koreanOnly.test(inputValue)) {
      openAlert('재료 또는 요리는 한글 단어로만 검색이 가능합니다.');
      setInputValue('');
      return;
    }

    navigate(`/search/${inputValue}`);
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <SearchForm
            value={inputValue}
            onChange={handleInputChange}
            onSubmit={handleSearchSubmit}
            placeholder="처리하고 싶은 재료(ex. 연두부) 또는 하고 싶은 요리(ex. 카프레제)를 검색하세요."
          />
        </BoxWrapper>
        <AlertModal
          message={alertMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
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
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
