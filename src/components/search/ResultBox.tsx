import styled from 'styled-components';
import COLORS from '../../styles/colors';
import SearchForm from '../common/SearchForm';
import RecipeCard from '../common/RecipeCard';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { useState, useEffect } from 'react';
import { RecipeDataState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import useAlert from '../../hooks/useAlert';
import { koreanOnly } from '../../utils/regex';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import AlertModal from '../common/AlertModal';

interface ResultBoxProps {
  keyword: string | undefined;
}

const ResultBox = ({ keyword }: ResultBoxProps) => {
  const navigate = useNavigate();

  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 서치페이지 검색창: useInput
  const { inputValue, setInputValue, handleInputChange } = useInput('');

  // 검색 결과
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // 아직 레시피 데이터가 로드되지 않았다면 이후 처리 중단
    if (recipeData.length === 0) return;

    // 검색 키워드가 없다면 이후 처리 중단
    if (!keyword) return;

    const filteredData = recipeData.filter(
      (recipe) =>
        (recipe.name ?? '').includes(keyword) ||
        (recipe.type ?? '').includes(keyword)
    );
    setFilteredRecipes(filteredData);
  }, [recipeData, keyword]);

  // 검색 결과 제출
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

  // 무한스크롤 추가
  const { currentPage } = useInfiniteScroll();
  const showRecipes = filteredRecipes.slice(0, currentPage * 8);

  return (
    <>
      <BoxWrapper>
        {filteredRecipes.length > 0 ? (
          <>
            <ResultWrapper>
              "{keyword}" 검색 결과: {filteredRecipes.length}건
            </ResultWrapper>
            <SearchForm
              value={inputValue}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
              placeholder="찾으시는 레시피가 없다면 다시 검색해주세요."
            />
            <RecipeWrapper>
              {showRecipes &&
                showRecipes.map((recipe) => (
                  <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </RecipeWrapper>
          </>
        ) : (
          <>
            <NoResultWrapper>검색 결과가 없습니다. 🫤</NoResultWrapper>
            <SearchForm
              value={inputValue}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
              placeholder="찾으시는 레시피가 없다면 다시 검색해주세요."
            />
            <Paragraph
              onClick={() => {
                navigate('/recipe');
              }}
            >
              검색하지 않고 레시피를 구경하고 싶다면? 🔍
            </Paragraph>
          </>
        )}
      </BoxWrapper>
      <AlertModal
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={closeAlert}
      />
    </>
  );
};

export default ResultBox;

const BoxWrapper = styled.div`
  width: 90rem;
  min-height: calc(100vh - 12.8rem);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  position: relative;
  overflow-y: auto;
`;

const ResultWrapper = styled.div`
  margin: 5rem;
`;

const NoResultWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-top: '5rem';
`;

const RecipeWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
  margin-top: 1.5rem;
`;

const Paragraph = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
