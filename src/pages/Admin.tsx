import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useState } from 'react';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from '../apis/firebase';

interface Recipe {
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
      const [res1, res2] = responses;
      const firstData = res1.data.COOKRCP01.row;
      const secondData = res2.data.COOKRCP01.row;
      const allData = [...firstData, ...secondData];

      console.log('데이터 토탈: ', res1.data.COOKRCP01.total_count);
      console.log('레시피 데이터: ', allData);

      setRecipeList(allData);
      console.log('recipeList: ', recipeList);
      {
        recipeList.map((item) => {
          addDoc(collection(dbService, 'recipe-list-2'), {
            ATT_FILE_NO_MAIN: item?.ATT_FILE_NO_MAIN,
            ATT_FILE_NO_MK: item?.ATT_FILE_NO_MK,
            HASH_TAG: item?.HASH_TAG,
            INFO_CAR: item?.INFO_CAR,
            INFO_ENG: item?.INFO_ENG,
            INFO_FAT: item?.INFO_FAT,
            INFO_NA: item?.INFO_NA,
            INFO_PRO: item?.INFO_PRO,
            INFO_WGT: item?.INFO_WGT,
            MANUAL01: item?.MANUAL01,
            MANUAL02: item?.MANUAL02,
            MANUAL03: item?.MANUAL03,
            MANUAL04: item?.MANUAL04,
            MANUAL05: item?.MANUAL05,
            MANUAL06: item?.MANUAL06,
            MANUAL07: item?.MANUAL07,
            MANUAL08: item?.MANUAL08,
            MANUAL09: item?.MANUAL09,
            MANUAL10: item?.MANUAL10,
            MANUAL11: item?.MANUAL11,
            MANUAL12: item?.MANUAL12,
            MANUAL13: item?.MANUAL13,
            MANUAL14: item?.MANUAL14,
            MANUAL15: item?.MANUAL15,
            MANUAL16: item?.MANUAL16,
            MANUAL17: item?.MANUAL17,
            MANUAL18: item?.MANUAL18,
            MANUAL19: item?.MANUAL19,
            MANUAL20: item?.MANUAL20,
            MANUAL_IMG01: item?.MANUAL_IMG01,
            MANUAL_IMG02: item?.MANUAL_IMG02,
            MANUAL_IMG03: item?.MANUAL_IMG03,
            MANUAL_IMG04: item?.MANUAL_IMG04,
            MANUAL_IMG05: item?.MANUAL_IMG05,
            MANUAL_IMG06: item?.MANUAL_IMG06,
            MANUAL_IMG07: item?.MANUAL_IMG07,
            MANUAL_IMG08: item?.MANUAL_IMG08,
            MANUAL_IMG09: item?.MANUAL_IMG09,
            MANUAL_IMG10: item?.MANUAL_IMG10,
            MANUAL_IMG11: item?.MANUAL_IMG11,
            MANUAL_IMG12: item?.MANUAL_IMG12,
            MANUAL_IMG13: item?.MANUAL_IMG13,
            MANUAL_IMG14: item?.MANUAL_IMG14,
            MANUAL_IMG15: item?.MANUAL_IMG15,
            MANUAL_IMG16: item?.MANUAL_IMG16,
            MANUAL_IMG17: item?.MANUAL_IMG17,
            MANUAL_IMG18: item?.MANUAL_IMG18,
            MANUAL_IMG19: item?.MANUAL_IMG19,
            RCP_NA_TIP: item?.RCP_NA_TIP,
            RCP_NM: item?.RCP_NM,
            RCP_PARTS_DTLS: item?.RCP_PARTS_DTLS,
            RCP_PAT2: item?.RCP_PAT2,
            RCP_SEQ: item?.RCP_SEQ,
            RCP_WAY2: item?.RCP_WAY2,
          });
        });
      }
    } catch (error) {
      console.error('레시피 리스트를 가져오지 못했어요. :', error);
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
