import { lazy, Suspense } from 'react';

const LazyHome = lazy(
  () => import(/* webpackChunkName: "LazyHome" */ './Home'),
);

const Home = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyHome {...props} />
  </Suspense>
);

export default Home;
