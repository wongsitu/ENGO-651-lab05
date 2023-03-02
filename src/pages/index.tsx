import { Route, Routes } from 'react-router-dom';

import Home from './Home';

const Pages = () => (
  <Routes>
    <Route path="/" index element={<Home />} />
  </Routes>
);

export default Pages;
