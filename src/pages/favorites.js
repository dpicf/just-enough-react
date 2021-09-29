import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect(() => {
        document.title = 'Избранные — Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_FAVORITES);

    if (loading) return 'Загрузка...';
    if (error) return `Ошибка! ${error.message}`;
    // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
    // Если же запрос выполнен успешно, но заметок не содержит,
    // выдаем сообщение "Пока заметок нет"
    if (data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} />;
    } else {
        return <p>Пока заметок нет</p>;
    }
};

export default Favorites;
