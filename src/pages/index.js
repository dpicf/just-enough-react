// Импортируем React и зависимости маршрутизации
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// импорт маршрутов
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

// определение маршрутов
const Pages = props => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/mynotes" component={MyNotes} />
      <Route path="/favorites" component={Favorites} />
    </Router>
  );
};

export default Pages;
