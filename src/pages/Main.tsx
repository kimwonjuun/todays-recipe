import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../apis/firebase';
import { Recipe } from './Admin';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [showFilteredResults, setShowFilteredResults] = useState(false);
  const navigate = useNavigate();

  const getRecipeData = async (query: string) => {
    const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
    const recipeDataBase: Recipe[] = [];

    querySnapshot.forEach((doc) => {
      // 일단 any 처리
      const newRecipe: any = {
        id: doc.id,
        ...doc.data(),
      };
      if (newRecipe.RCP_NM.includes(query)) {
        recipeDataBase.push(newRecipe);
      }
    });

    setRecipeData(recipeDataBase);
  };

  useEffect(() => {
    if (showFilteredResults) {
      getRecipeData(searchQuery);
    }
  }, [searchQuery, showFilteredResults]);

  // 검색 값을 변경하는 핸들러 생성
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // 검색 버튼 클릭 시 실행되는 함수 생성
  const handleSearchButtonClick = () => {
    if (searchQuery.trim() !== '') {
      setShowFilteredResults(true);
    } else {
      setShowFilteredResults(false);
    }
  };

  // 수정 된 부분: 검색 쿼리에 맞게 결과를 필터링합니다.
  const filteredRecipeData = recipeData.filter((recipe) => {
    return recipe.RCP_NM.includes(searchQuery);
  });
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          {/* <p>오늘 처리하고 싶은 재료 또는 하고 싶은 요리를 검색하세요.</p> */}
          <InputWrapper>
            <Input
              type="text"
              placeholder="오늘 처리하고 싶은 재료 또는 하고 싶은 요리를 검색하세요."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <SearchButton onClick={handleSearchButtonClick}>검색</SearchButton>
          </InputWrapper>

          <CustomP
            onClick={() => {
              navigate('/recipe');
            }}
          >
            검색하지 않고 레시피를 구경하고 싶다면?
          </CustomP>
        </BoxWrapper>
        {showFilteredResults && (
          <ResultWrapper>
            {filteredRecipeData.map((recipe) => (
              <div key={recipe.RCP_SEQ}>
                <h3>{recipe.RCP_NM}</h3>
                <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
              </div>
            ))}
          </ResultWrapper>
        )}
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

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
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

const ResultWrapper = styled.div``; // 필요한 스타일링을 추가해 주세요.
