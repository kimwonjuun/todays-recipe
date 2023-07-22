import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useRecipeData } from '../hooks/useRecipeData';
import { Recipe } from '../types/Recipe';
import RecipeCard from '../components/recipe/RecipeCard';

const Search = () => {
  // 레시피 데이터
  const recipeData = useRecipeData();
  // main.tsx에서 넘어온 keyword
  const { keyword } = useParams<{ keyword: string }>();
  // 검색 결과
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터가 없거나 !keyword 면 실행을 멈춤.
    if (recipeData.length === 0 || !keyword) return;

    const filteredData = recipeData.filter(
      (recipe) =>
        recipe.RCP_NM.includes(keyword) ||
        recipe.RCP_PARTS_DTLS.includes(keyword)
    );
    setFilteredRecipes(filteredData);
    console.log('검색 결과: ', filteredData);
  }, [keyword, recipeData]);

  // 검색창
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearchClick = () => {
    if (!inputValue.trim()) {
      alert('검색어 입력 후 버튼을 클릭해주세요.');
      return;
    }

    navigate(`/search/${inputValue}`);
  };
  return (
    <>
      <PageWrapper isFiltered={filteredRecipes.length > 0}>
        <BoxWrapper>
          {filteredRecipes.length > 0 ? (
            <ResultWrapper>검색 결과: {filteredRecipes.length}건</ResultWrapper>
          ) : (
            <ResultWrapper>검색 결과가 없습니다 :( </ResultWrapper>
          )}
          {filteredRecipes.length > 0 && (
            <RecipeWrapper>
              {filteredRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.RCP_SEQ} />
              ))}
            </RecipeWrapper>
          )}
          <InputWrapper>
            <Input
              type="text"
              placeholder="찾으시는 레시피가 없다면 다시 검색해주세요."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <SearchButton onClick={handleSearchClick}>검색</SearchButton>
          </InputWrapper>
          <CustomP
            onClick={() => {
              navigate('/recipe');
            }}
          >
            검색하지 않고 레시피를 구경하고 싶다면?
          </CustomP>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Search;

const PageWrapper = styled.div<{ isFiltered: boolean }>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${({ isFiltered }) =>
    isFiltered ? '100vh' : 'calc(100vh - 12.8rem)'};
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90rem;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;

  position: relative;
`;
const ResultWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
`;
const RecipeWrapper = styled.div`
  /* flex-wrap: wrap; */
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;

  background-color: yellow;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.3rem;
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
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 2rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;
`;

const CustomP = styled.p`
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
