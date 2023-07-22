// import { useState, useEffect } from 'react';
// import { dbService } from '../apis/firebase';
// import { collection, orderBy, query, getDocs } from 'firebase/firestore';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// export const useFilteredRecipe = (query: any, path = 'recipe-list') => {
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [data, loading, error] = useCollectionData(
//     dbService.collection(path).orderBy('RCP_NM')
//   );

//   const filterData = (query: any, data: any[]) => {
//     return data.filter(
//       (item: any) =>
//         item.RCP_NM.includes(query) || item.RCP_PARTS_DTLS.includes(query)
//     );
//   };

//   useEffect(() => {
//     if (query) {
//       setFilteredData(filterData(query, data));
//     } else {
//       setFilteredData(data);
//     }
//   }, [query, data]);

//   return [filteredData, loading, error];
// };

export {};
