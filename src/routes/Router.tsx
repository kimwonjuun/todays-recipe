import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Header from '../components/layout/Header';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import Loading from '../components/common/Loading';

const Main = React.lazy(() => import('../pages/Main'));
const Search = React.lazy(() => import('../pages/Search'));
const Recipe = React.lazy(() => import('../pages/Recipe'));
const Detail = React.lazy(() => import('../pages/Detail'));
const My = React.lazy(() => import('../pages/My'));
const Admin = React.lazy(() => import('../pages/Admin'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/my" element={<My />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
    </BrowserRouter>
  );
};

export default Router;
