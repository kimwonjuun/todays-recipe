import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Search from '../pages/Search';
import Recipe from '../pages/Recipe';
import Detail from '../pages/Detail';
import My from '../pages/My';
import Header from '../components/Header';
import Test from '../pages/Test';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/my" element={<My />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
