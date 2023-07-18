import { styled } from 'styled-components';

const Recipe = () => {
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <TypeWrapper>
            <p>분류</p>
            <p>좋아요 많은 순</p>
            <p>가나다 순</p>
          </TypeWrapper>
          <RecipeWrapper>
            <RecipeBox>s</RecipeBox>
            <RecipeBox>s</RecipeBox>
            <RecipeBox>s</RecipeBox>
          </RecipeWrapper>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Recipe;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.7rem);
`;

const BoxWrapper = styled.div`
  width: 100rem;
  /* height: 25rem; */
  /* display: flex; */
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const TypeWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: left;
  & > p {
    margin-right: 5rem;
    cursor: pointer;
    &:hover {
      color: #205a93; // 원하는 색상으로 변경하세요
    }
  }
`;

const RecipeWrapper = styled.div`
  background-color: red;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 4.5rem 3rem;
`;

const RecipeBox = styled.div`
  border-radius: 10px;
  min-width: 22rem;
  height: 25rem;
  margin: 0 3rem 3rem 3rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;

  &:hover {
    color: #6580b8;
  }
`;
