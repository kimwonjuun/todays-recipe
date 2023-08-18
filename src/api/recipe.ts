// get originl recipe data
export const fetchRecipes = async () => {
  const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
  const urls = [
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`,
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/2000`,
  ];

  // 각 URL에서 데이터 가져오기 (fetch 실행)
  const responses = await Promise.all(urls.map((url) => fetch(url)));

  // 각 응답에서 JSON 데이터 추출
  const jsonData = await Promise.all(responses.map((res) => res.json()));

  // 두 개의 JSON 데이터를 더하여 전체 레시피정보 반환
  const result = jsonData[0].COOKRCP01.row.concat(jsonData[1].COOKRCP01.row);

  return result;
};

// get processing recipe data
