import { useQuery } from 'react-query';

// 전체 데이터 가져오는 훅

const fetchRecipes = async () => {
  const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
  const urls = [
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`,
    `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/2000`,
  ];

  const Responses = await Promise.all(urls.map((url) => fetch(url)));
  const JsonData = await Promise.all(Responses.map((res) => res.json()));

  return JsonData[0].COOKRCP01.row.concat(JsonData[1].COOKRCP01.row);
};

const useFetchRecipes = () => {
  // EditFormBox에서 사용할 훅
  return useQuery('recipes', fetchRecipes);
};

export default useFetchRecipes;
