import axios, { AxiosResponse } from 'axios';

export const fetchAllData = async (): Promise<ResponseData[]> => {
  const serviceKey = process.env.REACT_APP_FOODSAFETYKOREA_API_KEY;
  const responses = await axios.all<AxiosResponse<ResponseData>>([
    axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/1000`
    ),
    axios.get(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1001/2000`
    ),
  ]);

  return responses.map((response) => response.data);
};
