import React, { useEffect, useState } from 'react';
import { useGetTopicById } from '../../api/topic';
import { TopicStyled } from './style';

export const Topic = React.forwardRef(({ lesson }) => {
  const [currentTopic, setCurrentTopic] = useState(null);

  const { getTopicById } = useGetTopicById();

  useEffect(() => {
    lesson?.topic &&
      getTopicById(lesson?.topic).then(
        (data) =>
          console.log({ data }) || setCurrentTopic(JSON.parse(data.topic)),
      );
  }, [lesson, getTopicById]);

  return (
    <TopicStyled>
      {currentTopic?.map((el) => {
        if (el.type === 'list') {
          return (
            <ul key={el.id}>
              {el.value.map((item) => (
                <li> {item.value}</li>
              ))}
            </ul>
          );
        }

        if (el.type === 'dev') {
          return <hr key={el.id} />;
        }

        if (el.type === 'dict') {
          return (
            <div>
              <div className="declaration">{el.value}</div>
              <div className="text">{el.text}</div>
            </div>
          );
        }

        if (el.type === 'title') {
          return <h2 key={el.id}>{el.value}</h2>;
        }
        if (el.type === 'subtitle') {
          return <h4 key={el.id}>{el.value}</h4>;
        }

        if (el.type === 'paragraph') {
          return <p key={el.id}>{el.value}</p>;
        }

        if (el.type === 'date') {
          return <i key={el.id}>{el.value}</i>;
        }

        if (el.type === 'image') {
          return (
            <div key={el.id}>
              <div>
                <img src={el.value} alt={el.description} />
              </div>
              <div>
                <label>{el.description}</label>
              </div>
            </div>
          );
        }

        if (el.type === 'link') {
          return (
            <a key={el.id} href={el.value}>
              {el.text}
            </a>
          );
        }

        if (el.type === 'media') {
          return (
            <iframe
              title={el.id}
              width="100%"
              height="315"
              src={el.value}
              allowFullScreen
            />
          );
        }

        if (el.type === 'code') {
          const htmlContent = el.value;

          return (
            <div
              key={el.id}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          );
        }

        return <div key={el.id}></div>;
      })}
    </TopicStyled>
  );
});
