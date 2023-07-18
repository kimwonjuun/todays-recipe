import { useState } from 'react';

export const getRecipeData = () => {
  const [data, setData] = useState([]);
};

// export const getRecipeData = () => {
//   const [data, setData] = useState([]);
//   const getRecipeData = async () => {
//     const serviceKey = '7592613b754c46938b1e';
//     try {
//       const response = await axios.get(
//         `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/10`
//       );
//       console.log('총 데이터 건 수: ', response.data.COOKRCP01);
//       setData(response.data.COOKRCP01.row);
//     } catch (error) {
//       console.error('API 호출 실패:', error);
//     }
//   };
// };
