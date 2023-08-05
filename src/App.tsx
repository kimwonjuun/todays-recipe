import Router from './routes/Router';
import GlobalStyles from './styles/globalStyles';
import { useRecipeData } from './hooks/useRecipeData';

function App() {
  useRecipeData();
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
