import { useState, useEffect } from 'react';

export default function Test() {
  const [data, setData] = useState([]);
  const getData = () => {
    const serviceKey = '7592613b754c46938b1e';
    fetch(
      `http://openapi.foodsafetykorea.go.kr/api/${serviceKey}/COOKRCP01/json/1/10`
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log('response data: ', responseData);
        setData(responseData);
      })
      .catch((error) => console.log('error: ', error));
  };
  useEffect(() => {
    getData();
  }, []);
  return <>{console.log('data: ', data)}</>;
}
