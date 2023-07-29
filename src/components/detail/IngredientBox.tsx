import styled from 'styled-components';
import { Recipe } from '../../types/Recipe';

interface RecipeProps {
  recipe: Recipe;
}

export const IngredientBox = ({ recipe }: RecipeProps) => {
  // 재료 정규식
  const ingredients = recipe.RCP_PARTS_DTLS.replace('재료', '')
    .replace('[소스소개', '')
    .split(',')
    .join(', ');

  return (
    <>
      <TopWrapper>
        <CardWrapper>
          <Img>
            <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
          </Img>
          <Title>
            {recipe.RCP_PAT2} | {recipe.RCP_NM}
          </Title>
          <Like>냠냠</Like>
        </CardWrapper>
        <IngredientWrapper>
          <Ingredient>
            <h1>성분</h1>
            <List>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>열량</p>
                  <p>{recipe.INFO_ENG}kcal</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>탄수화물</p>
                  <p>{recipe.INFO_CAR}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>단백질</p>
                  <p>{recipe.INFO_PRO}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring2.png')} />
                <ItemText>
                  <p>지방</p>
                  <p>{recipe.INFO_FAT}g</p>
                </ItemText>
              </Item>
              <Item>
                <img src={require('../../assets/ring1.png')} />
                <ItemText>
                  <p>나트륨</p>
                  <p>{recipe.INFO_NA} mg</p>
                </ItemText>
              </Item>
            </List>
          </Ingredient>
          <Ingredient>
            <h1>재료</h1>
            <p>{ingredients}</p>
          </Ingredient>
        </IngredientWrapper>
      </TopWrapper>
    </>
  );
};

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */
  margin-bottom: 1rem;

  /* background-color: blue; */
`;

const CardWrapper = styled.div`
  width: 25rem;
  height: 35rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  position: relative;
`;

const Img = styled.div`
  width: inherit;
  height: 25rem;
  overflow: hidden;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: bold;
`;

const Like = styled.div`
  height: 5rem;
`;

const IngredientWrapper = styled.div`
  width: 53.5rem;
  height: 35rem;
  /* margin: 1rem 0; */
  /* display: flex; */
  flex-direction: column;
  /* justify-content: center; */
`;

const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 17rem;
  padding: 1.25rem;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  &:first-child {
    margin-bottom: 1rem;
  }

  /* &:nth-child(2) {
    height: 19rem;
  } */

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const List = styled.div`
  width: 100%;
  height: 9rem;

  display: flex;
  justify-content: space-between;

  /* background-color: yellow; */
`;

const Item = styled.div`
  width: 9rem;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const ItemText = styled.div`
  width: 7.5rem;
  height: 3.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.25rem;

  p {
    margin-bottom: 0.5rem;
  }

  p:last-child {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;
