import axios from 'axios';

// Recipe 타입
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
export const getRecipeData = async (): Promise<Recipe[]> => {
  const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
  try {
    const firstResponse = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/2`
    );
    const secondResponse = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/1116`
    );
    console.log('총 데이터 건 수: ', firstResponse.data.COOKRCP01.total_count);
    console.log(
      '데이터: ',
      firstResponse.data.COOKRCP01.row.concat(secondResponse.data.COOKRCP01.row)
    );

    const allData = firstResponse.data.COOKRCP01.row.concat(
      secondResponse.data.COOKRCP01.row
    );
    return allData;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};

// let cachedData: Recipe[] | null = null;

// export const getRecipeData = async (): Promise<Recipe[]> => {
//   const serviceKey = '7592613b754c46938b1e';

//   if (cachedData) {
//     return cachedData; // 데이터가 캐시되어 있다면 캐싱된 데이터 반환
//   } else {
//     try {
//       const responses = await axios.all([
//         axios.get(
//           `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/20`
//         ),
//         axios.get(
//           `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1111/1116`
//         ),
//       ]);

//       const [res1, res2] = responses;
//       const firstData = res1.data.COOKRCP01.row;
//       const secondData = res2.data.COOKRCP01.row;
//       const allData = [...firstData, ...secondData];

//       console.log('총 데이터 건 수:', res1.data.COOKRCP01.total_count);
//       console.log('데이터:', allData);

//       cachedData = allData; // 캐시 변수에 데이터 저장
//       return allData;
//     } catch (error) {
//       console.error('API 호출 실패:', error);
//       throw error;
//     }
//   }
// };
