import Router from './routes/Router';
import GlobalStyles from './styles/globalStyles';
import useRecipeData from './hooks/useRecipeData';

function App() {
  // 앱 실행 시 1회 호출하는 레시피 데이터
  useRecipeData();

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
