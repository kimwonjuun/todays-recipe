import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useState } from 'react';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from '../apis/firebase';

export interface Recipe {
  ATT_FILE_NO_MAIN: string;
  ATT_FILE_NO_MK: string;
  HASH_TAG: string;
  INFO_CAR: string;
  INFO_ENG: string;
  INFO_FAT: string;
  INFO_NA: string;
  INFO_PRO: string;
  INFO_WGT: string;
  MANUAL01: string;
  MANUAL02: string;
  MANUAL03: string;
  MANUAL04: string;
  MANUAL05: string;
  MANUAL06: string;
  MANUAL07: string;
  MANUAL08: string;
  MANUAL09: string;
  MANUAL10: string;
  MANUAL11: string;
  MANUAL12: string;
  MANUAL13: string;
  MANUAL14: string;
  MANUAL15: string;
  MANUAL16: string;
  MANUAL17: string;
  MANUAL18: string;
  MANUAL19: string;
  MANUAL20: string;
  MANUAL_IMG01: string;
  MANUAL_IMG02: string;
  MANUAL_IMG03: string;
  MANUAL_IMG04: string;
  MANUAL_IMG05: string;
  MANUAL_IMG06: string;
  MANUAL_IMG07: string;
  MANUAL_IMG08: string;
  MANUAL_IMG09: string;
  MANUAL_IMG10: string;
  MANUAL_IMG11: string;
  MANUAL_IMG12: string;
  MANUAL_IMG13: string;
  MANUAL_IMG14: string;
  MANUAL_IMG15: string;
  MANUAL_IMG16: string;
  MANUAL_IMG17: string;
  MANUAL_IMG18: string;
  MANUAL_IMG19: string;
  RCP_NA_TIP: string;
  RCP_NM: string;
  RCP_PARTS_DTLS: string;
  RCP_PAT2: string;
  RCP_SEQ: string;
  RCP_WAY2: string;
}

const Admin = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const getRecipeListHandler = async () => {
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
    } catch (error) {
      console.error('레시피 리스트를 가져오지 못했어요. :', error);
    }
    {
      recipeList.map((recipe) => {
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
    }
  };
  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <AdminBox>
            <p onClick={getRecipeListHandler}>파이어스토어에 데이터 넣어주기</p>
          </AdminBox>
          <AdminBox></AdminBox>
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
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;
const BoxWrapper = styled.div`
  width: 60rem;
  height: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
const AdminBox = styled.div`
  border: 0.1rem solid ${COLORS.blue1};
  border-radius: 1rem;
  width: 29rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  p {
    &:hover {
      color: ${COLORS.blue1};
      cursor: pointer;
    }
  }
`;
