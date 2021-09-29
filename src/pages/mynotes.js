import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        document.title = 'Мои заметки — Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    if (loading) return 'Загрузка...';
    if (error) return `Ошибка! ${error.message}`;
    // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту.
    // Если же запрос выполнен успешно, но заметок в нем нет,
    // выдаем сообщение "Пока заметок нет"
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>Пока заметок нет</p>;
    }
};

export default MyNotes;
