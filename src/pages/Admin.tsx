import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useState } from 'react';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from '../apis/firebase';
import { Recipe } from '../types/Recipe';

const Admin = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const handleGetRecipeList = async () => {
    if (window.confirm('API를 수정하시겠습니까?')) {
      try {
        const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
        const responses = await axios.all([
          axios.get(
            `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`
          ),
          axios.get(
            `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/2000`
          ),
        ]);
        const [firstResponse, secondResponse] = responses;
        const allData = firstResponse.data.COOKRCP01.row.concat(
          secondResponse.data.COOKRCP01.row
        );
        console.log('데이터: ', allData);
        setRecipeList(allData);

        allData.map((recipe: Recipe) => {
          addDoc(collection(dbService, 'recipe-list'), {
            ATT_FILE_NO_MAIN: recipe?.ATT_FILE_NO_MAIN,
            ATT_FILE_NO_MK: recipe?.ATT_FILE_NO_MK,
            HASH_TAG: recipe?.HASH_TAG,
            INFO_CAR: recipe?.INFO_CAR,
            INFO_ENG: recipe?.INFO_ENG,
            INFO_FAT: recipe?.INFO_FAT,
            INFO_NA: recipe?.INFO_NA,
            INFO_PRO: recipe?.INFO_PRO,
            INFO_WGT: recipe?.INFO_WGT,
            MANUAL01: recipe?.MANUAL01,
            MANUAL02: recipe?.MANUAL02,
            MANUAL03: recipe?.MANUAL03,
            MANUAL04: recipe?.MANUAL04,
            MANUAL05: recipe?.MANUAL05,
            MANUAL06: recipe?.MANUAL06,
            MANUAL07: recipe?.MANUAL07,
            MANUAL08: recipe?.MANUAL08,
            MANUAL09: recipe?.MANUAL09,
            MANUAL10: recipe?.MANUAL10,
            MANUAL11: recipe?.MANUAL11,
            MANUAL12: recipe?.MANUAL12,
            MANUAL13: recipe?.MANUAL13,
            MANUAL14: recipe?.MANUAL14,
            MANUAL15: recipe?.MANUAL15,
            MANUAL16: recipe?.MANUAL16,
            MANUAL17: recipe?.MANUAL17,
            MANUAL18: recipe?.MANUAL18,
            MANUAL19: recipe?.MANUAL19,
            MANUAL20: recipe?.MANUAL20,
            MANUAL_IMG01: recipe?.MANUAL_IMG01,
            MANUAL_IMG02: recipe?.MANUAL_IMG02,
            MANUAL_IMG03: recipe?.MANUAL_IMG03,
            MANUAL_IMG04: recipe?.MANUAL_IMG04,
            MANUAL_IMG05: recipe?.MANUAL_IMG05,
            MANUAL_IMG06: recipe?.MANUAL_IMG06,
            MANUAL_IMG07: recipe?.MANUAL_IMG07,
            MANUAL_IMG08: recipe?.MANUAL_IMG08,
            MANUAL_IMG09: recipe?.MANUAL_IMG09,
            MANUAL_IMG10: recipe?.MANUAL_IMG10,
            MANUAL_IMG11: recipe?.MANUAL_IMG11,
            MANUAL_IMG12: recipe?.MANUAL_IMG12,
            MANUAL_IMG13: recipe?.MANUAL_IMG13,
            MANUAL_IMG14: recipe?.MANUAL_IMG14,
            MANUAL_IMG15: recipe?.MANUAL_IMG15,
            MANUAL_IMG16: recipe?.MANUAL_IMG16,
            MANUAL_IMG17: recipe?.MANUAL_IMG17,
            MANUAL_IMG18: recipe?.MANUAL_IMG18,
            MANUAL_IMG19: recipe?.MANUAL_IMG19,
            RCP_NA_TIP: recipe?.RCP_NA_TIP,
            RCP_NM: recipe?.RCP_NM,
            RCP_PARTS_DTLS: recipe?.RCP_PARTS_DTLS,
            RCP_PAT2: recipe?.RCP_PAT2,
            RCP_SEQ: recipe?.RCP_SEQ,
            RCP_WAY2: recipe?.RCP_WAY2,
          });
        });
        alert('레시피 db가 수정되었습니다. 수정 사항을 입력 후 제출해주세요.');
      } catch (error) {
        console.error('레시피 리스트를 가져오지 못했어요. :', error);
      }
    } else {
      return;
    }
  };

  // Form
  const [InputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('검색어: ', InputValue);
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          {/* <AdminBox>
            <p onClick={getRecipeListHandler}>파이어스토어에 데이터 넣어주기</p>
          </AdminBox> */}
          <EditHistoryBox>
            <div style={{ margin: '1.5rem 0' }}>수정 기록</div>
            <div></div>
          </EditHistoryBox>
          <EditBox>
            <div style={{ marginTop: '1.5rem' }}>수정 사항 기록</div>
            <GuideBox>
              <p>1. 데이터를 수정한 후 가운데 버튼을 클릭해주세요.</p>
              <p>2. 수정 기록을 인풋창에 작성 후 제출 버튼을 클릭해주세요.</p>
            </GuideBox>
            <EditApiButtonWrapper>
              <img
                src={require('../assets/default_image.png')}
                onClick={handleGetRecipeList}
              />
            </EditApiButtonWrapper>
            <FormWrapper onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="수정 사항을 입력하세요."
                value={InputValue}
                onChange={handleChange}
              />
              <SubmitButton type="submit">입력</SubmitButton>
            </FormWrapper>
          </EditBox>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Admin;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;
const BoxWrapper = styled.div`
  /* width: 150rem; */
  width: 100rem;
  height: 40rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  /* margin-top: 8rem; */

  /* background-color: yellow; */
`;
const EditHistoryBox = styled.div`
  width: 45rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  /* p {
    &:hover {
      color: ${COLORS.blue1};
      cursor: pointer;
    }
  } */
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const EditBox = styled.div`
  width: 45rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const GuideBox = styled.div`
  width: 30rem;

  p {
    font-size: 1.25rem;
  }
`;
const EditApiButtonWrapper = styled.div`
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

const FormWrapper = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: 35rem;
  height: 2rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  font-size: 1rem;
  outline: none;
  text-align: center;
  /* padding-right: 8rem; */
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 0rem;
  top: 10%;
  width: 5rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${COLORS.blue2};
  }
`;
