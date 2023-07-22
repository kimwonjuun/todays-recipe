// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import COLORS from '../styles/colors';
// import { Recipe } from './Admin';

// const Search = () => {
//   const { keyword } = useParams<{ keyword: string }>();
//   const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!keyword) {
//       throw new Error('Keyword is undefined');
//     }

//     // 이 부분을 사용자 정의 검색 로직에 교체하세요.
//     // 예: recipeData를 사용하여 검색 결과를 가져옵니다.
//     const filteredData = recipeData.filter(
//       (recipe: any) =>
//         recipe.RCP_NM.includes(keyword) ||
//         recipe.RCP_PARTS_DTLS.includes(keyword)
//     );

//     setFilteredRecipes(filteredData);
//   }, [keyword]);

//   return (
//     <>
//       <PageWrapper>
//         <BoxWrapper>
//           <ResultWrapper>검색결과: {filteredRecipes.length}건</ResultWrapper>
//           <RecipeWrapper>~</RecipeWrapper>
//           <InputWrapper>
//             <Input
//               type="text"
//               placeholder="찾으시는 레시피가 없나요? 다시 검색해주세요."
//             />
//             <SearchButton>검색</SearchButton>
//           </InputWrapper>
//           <CustomP
//             onClick={() => {
//               navigate('/recipe');
//             }}
//           >
//             검색하지 않고 레시피를 구경하고 싶다면?
//           </CustomP>
//         </BoxWrapper>
//       </PageWrapper>
//     </>
//   );
// };

// export default Search;

// const PageWrapper = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   /* height: calc(100vh - 12.8rem); */
//   height: 100vh;
//   background-color: ${COLORS.backGround};
// `;

// const BoxWrapper = styled.div`
//   width: 60rem;
//   height: inherit;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   font-size: 2rem;
//   margin-top: 8rem;

//   position: relative;
// `;
// const ResultWrapper = styled.div`
//   flex-wrap: wrap;
//   display: flex;
//   background-color: red;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;
// const RecipeWrapper = styled.div`
//   flex-wrap: wrap;
//   display: flex;
//   /* justify-content: space-between; */
//   margin: 0 auto;
//   padding: 5rem 0;
//   overflow: hidden;

//   background-color: yellow;
// `;

// const InputWrapper = styled.div`
//   position: relative;
// `;

// const Input = styled.input`
//   width: 46.5rem;
//   height: 4rem;
//   border-radius: 1rem;
//   border: 0.25rem solid ${COLORS.blue1};
//   font-size: 1.5rem;
//   outline: none;
//   text-align: center;
//   padding-right: 8rem; // 검색 버튼 만큼 여백 추가
//   /* margin-bottom: 5rem; */
// `;

// const SearchButton = styled.button`
//   position: absolute;
//   right: 0rem;
//   width: 7rem;
//   height: 4.65rem;
//   border-radius: 1rem;
//   border: 0.25rem solid ${COLORS.blue1};
//   font-size: 2rem;
//   background-color: ${COLORS.blue1};
//   color: white;
//   cursor: pointer;
//   outline: none;
// `;

// const CustomP = styled.p`
//   cursor: pointer;
//   &:hover {
//     color: ${COLORS.blue2};
//   }
// `;
