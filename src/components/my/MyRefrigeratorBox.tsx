import styled from 'styled-components';
import COLORS from '../../styles/colors';
import SubmitForm from '../common/SubmitForm';
import useInput from '../../hooks/useInput';
import { dbService } from '../../api/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import useAlert from '../../hooks/useAlert';
import { koreanOnly } from '../../utils/regex';
import AlertModal from '../common/AlertModal';
import useMyIngredients from '../../hooks/useMyIngredients';
import { useState } from 'react';

interface MyRefrigeratorBoxProps {
  currentUserUid: string | undefined;
}

const MyRefrigeratorBox = ({ currentUserUid }: MyRefrigeratorBoxProps) => {
  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 냉장고 재료 입력하는 인풋: useInput
  const { inputValue, setInputValue, handleInputChange } = useInput('');

  // 마이페이지에서 나의 냉장고에 입력한 재료들: useMyIngredients hook
  const { myIngredients, getMyIngredients, isLoading } =
    useMyIngredients(currentUserUid);

  // 재료 입력
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

    // 문서 참조
    const userRef = doc(dbService, 'users', currentUserUid);

    // 문서 데이터 가져오기
    getDoc(userRef)
      .then((userDoc) => {
        // 문서가 존재하면 기존 데이터에 재료 추가
        if (userDoc.exists()) {
          const ingredients = userDoc.data()['user-ingredients'] || [];

          if (ingredients.length >= 20) {
            openAlert('냉장고에는 최대 20개의 재료만 추가할 수 있습니다.');
            setInputValue('');
            return;
          }

          if (!ingredients.includes(inputValue)) {
            ingredients.push(inputValue);
          } else {
            openAlert('이미 등록된 재료입니다.');
            setInputValue('');
            return;
          }

          return updateDoc(userRef, { 'user-ingredients': ingredients });
        } else {
          // 문서가 존재하지 않으면 새 문서를 생성 후 재료 추가
          const ingredients = [inputValue];

          return setDoc(userRef, {
            'user-ingredients': ingredients,
          });
        }
      })
      .then(() => {
        setInputValue('');
        // 재료 리스트 갱신
        getMyIngredients();
      })
      .catch((error) => {
        console.error('냉장고에 재료를 추가하지 못했습니다.', error);
        openAlert('냉장고에 재료를 추가하지 못했습니다.');
      });
  };

  // 재료 삭제
  const removeIngredient = (ingredient: string) => {
    if (!currentUserUid) {
      return;
    }

    // 문서 참조
    const userRef = doc(dbService, 'users', currentUserUid);

    // 문서 데이터 가져오기
    getDoc(userRef)
      .then((userDoc) => {
        const ingredients = userDoc.data()?.['user-ingredients'] || [];
        // 선택한 재료 필터링
        const updatedIngredients = ingredients.filter(
          (item: string) => item !== ingredient
        );

        // 선택한 재료만 필터링 후 업데이트
        return updateDoc(userRef, { 'user-ingredients': updatedIngredients });
      })
      .then(() => {
        // 재료 리스트 갱신
        getMyIngredients();
      })
      .catch((error) => {
        console.error('냉장고에서 재료를 삭제하지 못했습니다.', error);
        openAlert('냉장고에서 재료를 삭제하지 못했습니다.');
      });
  };

  return (
    <>
      <MyRefrigeratorWrapper>
        <MyRefrigerator>
          <MyIngredients>
            {isLoading ? (
              <p>재료 데이터를 불러오는 중 😎</p>
            ) : myIngredients.length > 0 ? (
              myIngredients.map((ingredient, index) => (
                <IngredientItem
                  onClick={() => {
                    removeIngredient(ingredient);
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
          <img src={require('../../assets/my/refrigerator.gif')} />
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
`;

const MyRefrigerator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 45rem;
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
`;
