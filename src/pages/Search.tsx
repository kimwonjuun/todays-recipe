import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useRecipeData } from '../hooks/useRecipeData';
import { Recipe } from '../types/Recipe';
import { SearchForm } from '../components/common/SearchForm';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Loading } from '../components/common/Loading';
import { RecipeCard } from '../components/common/RecipeCard';
import { AlertModal } from '../components/common/AlertModal';

const Search = () => {
  const navigate = useNavigate();

  // 레시피 데이터
  const recipeData = useRecipeData();

  // main.tsx에서 넘어온 keyword
  const { keyword } = useParams<{ keyword: string }>();

  // 검색 결과
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // 검색창
  const [inputValue, setInputValue] = useState<string>('');

  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    // 아직 레시피 데이터가 없으면 실행하지 않음
    if (recipeData.length === 0) {
      return;
    }
    // 검색 키워드가 없으면 로딩 상태를 비활성화하고 실행하지 않음
    if (!keyword) {
      setLoading(false);
      return;
    }
    const filteredData = recipeData.filter(
      (recipe) =>
        (recipe.name ?? '').includes(keyword) ||
        (recipe.type ?? '').includes(keyword)
    );
    setFilteredRecipes(filteredData);
    setLoading(false); // 검색 완료되면 로딩 상태를 비활성화
    console.log('검색 결과: ', filteredData);
  }, [keyword, recipeData]);

  // 검색
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      openAlertModal('키워드를 입력 후 검색해주세요.');
      return;
    }
    navigate(`/search/${inputValue}`);
  };

  // 무한스크롤 추가
  const { currentPage } = useInfiniteScroll();
  const showRecipes = filteredRecipes.slice(0, currentPage * 8);

  return (
    <>
      <PageWrapper>
        {loading ? (
          <Loading />
        ) : (
          <BoxWrapper isFiltered={filteredRecipes.length > 0}>
            {filteredRecipes.length > 0 ? (
              <>
                <ResultWrapper
                  isFiltered={filteredRecipes.length > 0}
                  style={{ marginBottom: '3rem' }}
                >
                  "{keyword}" 검색 결과: {filteredRecipes.length}건
                </ResultWrapper>
                <SearchForm
                  value={inputValue}
                  onChange={handleInputChange}
                  onSubmit={handleSearchSubmit}
                  placeholder="찾으시는 레시피가 없다면 다시 검색해주세요."
                />
                <RecipeWrapper>
                  {showRecipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                  ))}
                </RecipeWrapper>
              </>
            ) : (
              <>
                <ResultWrapper isFiltered={filteredRecipes.length > 0}>
                  검색 결과가 없습니다. 🫤
                </ResultWrapper>
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
        )}
      </PageWrapper>
      {alertModalOpen && (
        <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
      )}
    </>
  );
};

export default Search;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div<{ isFiltered: boolean }>`
  width: 90rem;
  height: ${({ isFiltered }) => (isFiltered ? '' : 'calc(100vh - 12.8rem)')};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;

  position: relative;
`;
const ResultWrapper = styled.div<{ isFiltered: boolean }>`
  flex-wrap: wrap;
  display: flex;
  margin-top: ${({ isFiltered }) => (isFiltered ? '5rem' : '')};
`;
const RecipeWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;

const Paragraph = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
