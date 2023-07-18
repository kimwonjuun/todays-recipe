import axios from 'axios';

export const getRecipeData = async () => {
  const serviceKey = '7592613b754c46938b1e';
  try {
    const response = await axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`
    );
    console.log('총 데이터 건 수: ', response.data.COOKRCP01);
    console.log('데이터: ', response.data.COOKRCP01.row);
    return response.data.COOKRCP01.row;
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
