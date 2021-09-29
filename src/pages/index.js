import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from '../components/Layout';

// импорт маршрутов
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';

// определение маршрутов
const Pages = props => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/mynotes" component={MyNotes} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={Note} />
            </Layout>
        </Router>
    );
};

export default Pages;
