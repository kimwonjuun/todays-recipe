import Router from './routes/Router';
import GlobalStyles from './styles/globalStyles';
import { ProcessedRecipeData } from './apis/common/recipe';

function App() {
  // 앱 실행 시 1회 호출하는 레시피 데이터
  ProcessedRecipeData();

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
