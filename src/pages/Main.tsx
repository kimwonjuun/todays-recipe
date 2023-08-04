import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchForm } from '../components/common/SearchForm';
import { AlertModal } from '../components/common/AlertModal';

const Main = () => {
  // 검색창
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  // 인풋창
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 얼럿 모달
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');

  // 얼럿 모달 열기
  const openAlertModal = (message: string) => {
    setAlertModalOpen(true);
    setAlertModalMessage(message);
  };

  // 얼럿 모달 닫기
  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  // 폼 제출 함수
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      openAlertModal('키워드를 입력 후 검색해주세요.');
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
      </PageWrapper>
      {alertModalOpen && (
        <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
      )}
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
