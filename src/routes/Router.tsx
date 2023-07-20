import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Search from '../pages/Search';
import Recipe from '../pages/Recipe';
import Detail from '../pages/Detail';
import My from '../pages/My';
import Header from '../components/common/Header';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search/:" element={<Search />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/my" element={<My />} />
      </Routes>
      <ScrollToTopButton />
    </BrowserRouter>
  );
};
export default Router;
