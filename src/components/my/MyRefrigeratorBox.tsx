import styled from 'styled-components';
import COLORS from '../../styles/colors';
import SubmitForm from '../common/SubmitForm';
import useInput from '../../hooks/useInput';
import useAlert from '../../hooks/useAlert';
import { koreanOnly } from '../../utils/regex';
import AlertModal from '../common/AlertModal';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import {
  addIngredient,
  deleteIngredient,
  getIngredient,
} from '../../apis/my/ingredients';

interface MyRefrigeratorBoxProps {
  currentUserUid: string | undefined;
}

const MyRefrigeratorBox = ({ currentUserUid }: MyRefrigeratorBoxProps) => {
  const queryClient = useQueryClient();

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 냉장고 재료 입력하는 인풋: useInput
  const { inputValue, setInputValue, handleInputChange } = useInput('');

  // 재료 create API
  const addIngredientMutation = useMutation(addIngredient, {
    onSuccess: () => {
      queryClient.invalidateQueries('myIngredients');
      setInputValue('');
    },
    onError: (error: any) => {
      openAlert(error.message);
    },
  });

  // 재료 create 버튼
  const handleIngredientsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserUid) {
      openAlert('유저 정보를 불러오지 못했어요.');
      return;
    }

    // 한글만 입력되었는지 검사
    if (!inputValue.trim() || !koreanOnly.test(inputValue)) {
      openAlert('재료는 한글 단어만 입력 가능합니다.');
      setInputValue('');
      return;
    }

    addIngredientMutation.mutate({ currentUserUid, inputValue });
  };

  // 재료 read API
  const { data: myIngredients, isLoading } = useQuery({
    queryKey: ['myIngredients', currentUserUid],
    queryFn: () => getIngredient(currentUserUid || ''),
    enabled: !!currentUserUid,
  });

  // 재료 delete API
  const deleteIngredientMutation = useMutation(deleteIngredient, {
    onSuccess: () => {
      queryClient.invalidateQueries('myIngredients');
      openAlert('재료가 삭제되었습니다.');
    },
    onError: (error: any) => {
      openAlert(error.message);
    },
  });

  // 재료 삭제 버튼
  const handleDeleteIngredientClick = (ingredient: string) => {
    deleteIngredientMutation.mutate({ currentUserUid, ingredient });
  };

  return (
    <>
      <MyRefrigeratorWrapper>
        <MyRefrigerator>
          <MyIngredients>
            {isLoading ? (
              <p>재료 데이터를 불러오는 중 😎</p>
            ) : myIngredients && myIngredients.length > 0 ? (
              myIngredients.map((ingredient, index) => (
                <IngredientItem
                  onClick={() => {
                    handleDeleteIngredientClick(ingredient);
                  }}
                  key={index}
                >
                  {ingredient}
                </IngredientItem>
              ))
            ) : (
              <p>아직 냉장고에 넣은 재료가 없습니다! 🫤</p>
            )}
          </MyIngredients>
          <FormWarpper>
            <SubmitForm
              value={inputValue}
              onSubmit={handleIngredientsSubmit}
              onChange={handleInputChange}
              placeholder="처리하고 싶은 냉장고 안의 재료들을 입력하세요."
              maxLength={6}
            />
          </FormWarpper>
        </MyRefrigerator>
        <Img
          onClick={() => {
            openAlert('냉장고');
          }}
        >
          <img
            src={require('../../assets/my/refrigerator.webp')}
            alt="refrigerator"
          />
        </Img>
      </MyRefrigeratorWrapper>
      <AlertModal
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={closeAlert}
      />
    </>
  );
};

export default MyRefrigeratorBox;

const FormWarpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyRefrigeratorWrapper = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: 1750px) {
    height: 25rem;
  }
`;

const MyRefrigerator = styled.div`
  width: 45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 1150px) {
    width: 30rem;
  }
  @media (max-width: 950px) {
    width: 17.5rem;
  }
`;

const MyIngredients = styled.div`
  width: 32.5rem;
  height: 17.5rem;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  padding: 1.25rem;
  gap: 1rem;

  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  > p {
    width: 100%;
    text-align: center;
  }

  > img {
    width: 50%;
    height: 50%;
  }

  @media (max-width: 1750px) {
    height: 15rem;
  }
  @media (max-width: 1150px) {
    width: 25rem;
    height: 10rem;
  }
  @media (max-width: 950px) {
    width: 12.5rem;
  }
`;

const IngredientItem = styled.div`
  padding: 0.75rem 1rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${COLORS.blue1};
  &:hover {
    background-color: ${COLORS.blue2};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  overflow: hidden;
  color: #fff;
  cursor: pointer;

  @media (max-width: 950px) {
    height: 1.5rem;
    padding: 0.1rem 0.1rem;
    font-size: 0.75rem;
  }
`;

const Img = styled.div`
  width: 25rem;
  display: flex;
  align-items: center;
  justify-content: end;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1500px) {
    display: none;
  }
`;
