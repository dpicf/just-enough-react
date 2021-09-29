import React from 'react';
import ReactDOM from 'react-dom';

// импорт библиотек Apollo Client
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import GlobalStyle from '/components/GlobalStyle';
import Pages from '/pages';

// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// Настраиваем Apollo Client
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
});

const App = () => (
    <ApolloProvider client={client}>
        <GlobalStyle />
        <Pages />
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
