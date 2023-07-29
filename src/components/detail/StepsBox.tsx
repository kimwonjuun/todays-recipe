import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Recipe } from '../../types/Recipe';

interface RecipeProps {
  recipe: Recipe;
}

export const StepsBox = ({ recipe }: RecipeProps) => {
  return (
    <>
      <BottomWrapper>
        <h1>조리 순서</h1>
        <StepsWrapper>
          <StepsWrapper>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((step) => {
              const manual = (recipe as any)[
                `MANUAL${step.toString().padStart(2, '0')}`
              ];
              const manualImg = (recipe as any)[
                `MANUAL_IMG${step.toString().padStart(2, '0')}`
              ];
              // manual에서 알파벳이 있다면 제거
              const manualWithoutAlphabets = manual
                ? manual.replace(/[a-zA-Z]/g, '')
                : null;

              return manualWithoutAlphabets || manualImg ? (
                <StepWrapper key={`step-${step}`}>
                  {manualImg && <StepsImg src={manualImg} />}
                  <div>{manualWithoutAlphabets}</div>
                </StepWrapper>
              ) : null;
            })}
          </StepsWrapper>
        </StepsWrapper>
        {recipe.RCP_NA_TIP && (
          <TipWrapper>
            <h1>저감 조리법 TIP</h1>
            <p>{recipe.RCP_NA_TIP}</p>
          </TipWrapper>
        )}
      </BottomWrapper>
    </>
  );
};

const BottomWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;

  h1 {
    margin-bottom: 2.5rem;
    font-size: xx-large;
  }
`;

const StepsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StepWrapper = styled.div`
  width: calc(50% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 25rem;
  margin-bottom: 2.5rem;
  padding: 1.25rem;
`;

const StepsImg = styled.img`
  width: 17.5rem;
  height: 17.5rem;
`;

const TipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  border-radius: 1rem;
  background-color: #fff;
  margin-bottom: 0;
  font-size: 1.5rem;
  h1 {
    margin-bottom: 2rem;
    font-size: 1.75rem;
  }
`;
