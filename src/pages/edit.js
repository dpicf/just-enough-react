import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  // Сохраняем id, полученный из url, в виде переменной
  const id = props.match.params.id;
  // Определяем запрос заметки
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  // Получаем информацию о текущем пользователе
  const { data: userdata } = useQuery(GET_ME);
  // Определяем мутацию
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading) return 'Загрузка...';
  if (error) return <p>Ошибка!</p>;
  // Если текущий пользователь не соответствует автору заметки
  if (userdata.me.id !== data.note.author.id) {
    return <p>У Вас нет прав для редактирования этой заметки</p>;
  }

  // Передаем данные и мутацию в компонент формы
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
