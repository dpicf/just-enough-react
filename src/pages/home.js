import React from 'react';

import Header from '../components/Header';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <p>Это домашняя страница</p>
    </div>
  );
};

export default Home;
