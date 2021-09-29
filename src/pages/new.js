import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NewNote = props => {
  useEffect(() => {
    document.title = 'Новая заметка — Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    // Повторно получаем запросы GET_NOTES и GET_MY_NOTES, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      // После завершения перенаправляем пользователя на страницу заметки
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {/* Во время загрузки мутации выдаем сообщение о загрузке */}
      {loading && <p>Загрузка...</p>}
      {/* В случае сбоя выдаем сообщение об ошибке */}
      {error && <p>Ошибка сохранения записи</p>}
      {/* Компонент формы, передающий мутацию данных в качестве prop */}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
