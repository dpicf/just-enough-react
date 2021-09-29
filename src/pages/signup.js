import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  useEffect(() => {
    document.title = 'Регистрация — Notedly';
  });

  const client = useApolloClient();
  // Хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // Сохраняем токен
      localStorage.setItem('token', data.signUp);
      // Обновляем локальный кэш
      client.writeData({ data: { isLoggedIn: true } });
      // Перенаправляем пользователя на домашнюю страницу
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка создания аккаунта!</p>}
    </React.Fragment>
  );
};

export default SignUp;
