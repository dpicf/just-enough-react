import React from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
    // Хук запроса
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    // Если данные загружаются, отображаем сообщение о загрузке
    if (loading) return <p>Загрузка...</p>;
    // Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if (error) return <p>Ошибка!</p>;

    // Если получение данных прошло успешно, отображаем их в UI
    return (
        // Добавляем элемент <React.Fragment>, чтобы предоставить родительский элемент
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() =>
                        // onClick выполняет запрос, передавая в качестве переменной текущий курсор
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // Совмещаем новые результаты со старыми
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                    Загрузить ещё
                </Button>
            )}
        </React.Fragment>
    );
};

export default Home;
