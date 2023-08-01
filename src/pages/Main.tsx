import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchForm } from '../components/common/SearchForm';

const Main = () => {
  // 검색창
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  // 버튼 클릭 함수
  // const handleSearchClick = () => {
  //   // 검색어가 없을 경우 유저에게 에러 메세지 표시
  //   if (!inputValue.trim()) {
  //     alert('검색어 입력 후 버튼을 클릭해주세요.');
  //     return;
  //   }

  //   // 검색 결과로 필터링 된 레시피 데이터
  //   const filteredData = recipeData.filter(
  //     (recipe) =>
  //       recipe.RCP_NM.includes(inputValue) ||
  //       recipe.RCP_PARTS_DTLS.includes(inputValue)
  //   );

  //   // 검색 결과가 없을 경우 유저에게 에러 메세지 표시
  //   if (filteredData.length === 0) {
  //     alert('검색 결과가 없습니다.');
  //     return;
  //   }
  //   setFilteredRecipeData(filteredData);
  //   console.log('검색 결과: ', filteredData);

  //   navigate(`/search/${inputValue}`);
  // };

  // 폼 제출 함수
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert('검색어 입력 후 버튼을 클릭해주세요.');
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
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSearchSubmit}
            placeholder="처리하고 싶은 재료(ex. 연두부) 또는 하고 싶은 요리(ex. 카프레제)를 검색하세요."
          />
          {/* <CustomP
            onClick={() => {
              navigate('/recipe');
            }}
          >
            검색하지 않고 레시피를 구경하고 싶다면?
          </CustomP> */}
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
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const CustomP = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
