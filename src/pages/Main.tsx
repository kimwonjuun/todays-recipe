import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../apis/firebase';
import { Recipe } from './Admin';

const Main = () => {
  // 레시피 데이터
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  // 검색창
  const [inputValue, setInputValue] = useState<string>('');
  // 에러 메세지 상태
  const [showError, setShowError] = useState<boolean>(false);
  // 검색 결과
  const [filteredRecipeData, setFilteredRecipeData] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  // 파이어스토어에서 레시피 데이터 가져오기
  const getRecipeData = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'recipe-list'));
    const recipeDataBase: Recipe[] = [];

    querySnapshot.forEach((doc) => {
      // 일단 any 처리
      const newRecipe: any = {
        id: doc.id,
        ...doc.data(),
      };
      recipeDataBase.push(newRecipe);
    });
    setRecipeData(recipeDataBase);
  };

  const handleSearch = () => {
    setShowError(false);
    // 검색어가 없으면 에러 메세지를 표시하고 함수를 종료합니다.
    if (!inputValue) {
      alert('검색어 입력 후 버튼을 클릭해주세요.');
      return;
    }
    // 검색 결과로 필터링 된 레시피 데이터
    const filteredData = recipeData.filter(
      (recipe) =>
        recipe.RCP_NM.includes(inputValue) ||
        recipe.RCP_PARTS_DTLS.includes(inputValue)
    );

    setFilteredRecipeData(filteredData);
    console.log('검색 결과: ', filteredData);
    // filteredData.map((recipe) => {
    //   console.log('검색된 레시피명 :', recipe.RCP_NM);
    // });
  };

  useEffect(() => {
    getRecipeData();
  }, []);

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <InputWrapper>
            <Input
              type="text"
              placeholder="오늘 처리하고 싶은 재료(ex. 골뱅이) 또는 하고 싶은 요리(ex. 카프레제)를 검색하세요."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
          </InputWrapper>
          {showError && (
            <ErrorMessage>검색어를 입력 후 버튼을 클릭해주세요.</ErrorMessage>
          )}
          <CustomP
            onClick={() => {
              navigate('/recipe');
            }}
          >
            검색하지 않고 레시피를 구경하고 싶다면?
          </CustomP>
        </BoxWrapper>
        {filteredRecipeData.map((recipe) => (
          <div key={recipe.RCP_SEQ}>
            <p>{recipe.RCP_NM}</p>
            {/* <p>{recipe.RCP_PARTS_DTLS}</p> */}
          </div>
        ))}
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

const ErrorMessage = styled.p`
  font-size: 24px;
  color: red;
  margin-top: 1rem;
  margin-bottom: 0;
`;
