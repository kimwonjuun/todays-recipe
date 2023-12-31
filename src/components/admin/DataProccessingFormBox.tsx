import React from 'react';
import SubmitForm from '../common/SubmitForm';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import AlertModal from '../common/AlertModal';
import ConfirmModal from '../common/ConfirmModal';
import useAlert from '../../hooks/useAlert';
import useConfirm from '../../hooks/useConfirm';
import useInput from '../../hooks/useInput';
import { dbService } from '../../apis/firebase';
import { fetchRecipes } from '../../apis/common/originalRecipe';
import { addEditDataHistory } from '../../apis/admin/admin';
import { useQueryClient, useQuery, useMutation } from 'react-query';

// 기본 데이터 호출해서 가공 후 파이어스토어에 올리는 컴포넌트

const DataProcessingFormBox = () => {
  const queryClient = useQueryClient();

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 초기 레시피 데이터
  const {
    data: recipeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  // 파이어스토어에 필요한 데이터만 가공해 올리는 함수
  const handleAddRecipeListToFirestore = (recipeData: any) => {
    Promise.all(
      recipeData.map((recipe: any) =>
        addDoc(collection(dbService, 'recipe-list'), {
          id: recipe.RCP_SEQ,
          image: recipe.ATT_FILE_NO_MK.replace('http://', 'https://'),
          name: recipe.RCP_NM,
          type: recipe.RCP_PAT2,
          calorie: recipe.INFO_ENG,
          carbohydrate: recipe.INFO_CAR,
          protein: recipe.INFO_PRO,
          fat: recipe.INFO_FAT,
          sodium: recipe.INFO_NA,
          ingredients: recipe.RCP_PARTS_DTLS.replace(/재료|소스\s?:\s?|•/g, '')
            .replace('파슬리가루(1g)', '파슬리가루(1g),')
            .replace('라이스페이퍼 20g[새콤 달콤 소스] ', '라이스페이퍼 20g, ')
            .split(',')
            .join(', '),
          tip: recipe.RCP_NA_TIP.replace(/•/g, ''),
          make: [
            recipe.MANUAL01.replace('http://', 'https://'),
            recipe.MANUAL02.replace('http://', 'https://'),
            recipe.MANUAL03.replace('http://', 'https://'),
            recipe.MANUAL04.replace('http://', 'https://'),
            recipe.MANUAL05.replace('http://', 'https://'),
            recipe.MANUAL06.replace('http://', 'https://'),
            recipe.MANUAL07.replace('http://', 'https://'),
            recipe.MANUAL08.replace('http://', 'https://'),
          ],
          makeImage: [
            recipe.MANUAL_IMG01.replace('http://', 'https://'),
            recipe.MANUAL_IMG02.replace('http://', 'https://'),
            recipe.MANUAL_IMG03.replace('http://', 'https://'),
            recipe.MANUAL_IMG04.replace('http://', 'https://'),
            recipe.MANUAL_IMG05.replace('http://', 'https://'),
            recipe.MANUAL_IMG06.replace('http://', 'https://'),
            recipe.MANUAL_IMG07.replace('http://', 'https://'),
            recipe.MANUAL_IMG08.replace('http://', 'https://'),
          ],
        })
      )
    )
      .then(() =>
        openAlert(
          '레시피 db가 수정되었습니다. 수정 사항을 입력 후 제출해주세요.'
        )
      )
      .catch((error) => {
        openAlert('레시피 데이터를 수정하지 못했어요.');
      });
  };

  // 가공한 Recipe data를 FireStore에 업로드 전 확인할 때 띄울 custom window.confirm
  const handleConfirmModal = () => {
    handleAddRecipeListToFirestore(recipeData);
    closeConfirm();
  };

  // custom window.confirm
  const { openConfirm, closeConfirm, handleConfirm, isOpen } =
    useConfirm(handleConfirmModal);

  // API 가공 후 firebase database에 업데이트하는 버튼
  const handleProcessRecipeList = () => {
    if (!isLoading && recipeData) {
      // "API를 수정하시겠습니까? confirm"
      openConfirm();
    }
    if (isLoading) {
      openAlert(
        '초기 레시피 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.'
      );
    }
    if (isError) {
      openAlert(
        '초기 레시피 데이터를 불러오지 못해 데이터를 가공할 수 없습니다.'
      );
    }
  };

  // API 저장 또는 수정 후 수정 내역에 작성할 인풋: useInput
  const { inputValue, setInputValue, handleInputChange } = useInput('');

  // 데이터 수정 내역 create API
  const addEditDataHistoryMutation = useMutation(addEditDataHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries('dataHistory');
      setInputValue('');
      openAlert('수정 사항이 저장되었습니다.');
    },
    onError: () => {
      openAlert('수정 사항 저장에 실패했습니다.');
    },
  });

  // 데이터 수정 내역 create 버튼
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      openAlert('수정하신 내역을 정확히 입력해주세요.');
      setInputValue('');
      return;
    }

    addEditDataHistoryMutation.mutate(inputValue);
  };

  return (
    <>
      <BoxWrapper>
        <Title>수정 사항 제출하기</Title>
        <Contents>
          <GuideBox>
            <p>1. 데이터를 수정한 후 버튼을 클릭해주세요.</p>
            <p>2. 수정 내역을 인풋창에 작성 후 제출 버튼을 클릭해주세요.</p>
          </GuideBox>
          <EditApiButton>
            <img
              src={require('../../assets/my/default_image.webp')}
              onClick={handleProcessRecipeList}
              alt="data processing button"
            />
          </EditApiButton>
          <SubmitForm
            value={inputValue}
            onChange={handleInputChange}
            onSubmit={handleEditSubmit}
            placeholder="수정하신 내역을 입력해주세요."
            maxLength={50}
          />
        </Contents>
        <ConfirmModal
          isOpen={isOpen}
          message="API를 수정하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
        <AlertModal
          message={alertMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
      </BoxWrapper>
    </>
  );
};

export default DataProcessingFormBox;

const BoxWrapper = styled.div`
  width: 45rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const Title = styled.div`
  width: inherit;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Contents = styled.div`
  width: inherit;
  height: 27rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const GuideBox = styled.div`
  width: 30rem;

  font-size: 1.25rem;
`;

const EditApiButton = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;
