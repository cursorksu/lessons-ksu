import React, { useEffect, useState } from 'react';
import { useGetTopicById } from '../../api/topic';
import { TopicStyled } from './style';

export const DisplayTopic = ({ topicId }) => {
  const [currentTopic, setCurrentTopic] = useState(null);

  const { getTopicById } = useGetTopicById();

  useEffect(() => {
    topicId &&
      getTopicById(topicId).then((data) =>
        setCurrentTopic(JSON.parse(data.topic))
      );
  }, [topicId, getTopicById]);

  return (
    <TopicStyled>
      {currentTopic?.map((el) => {
        if (el.type === 'list') {
          return (
            <ul key={el.id}>
              {el.value && el.value.map((item) => (
                <li key={item.value.split(' ').join('')}>
                  {item.value}
                </li>
              ))}
            </ul>
          );
        }

        if (el.type === 'dev') {
          return <div className='hr' key={el.id} />;
        }

        if (el.type === 'dict') {
          return (
            <div className="dictionary" key={el.id}>
              <b className="declaration">{el.value}</b>
              <div className="text">{el.text}</div>
            </div>
          );
        }

        if (el.type === 'title') {
          return <h1 key={el.id}>{el.value}</h1>;
        }
        if (el.type === 'subtitle') {
          return <h2 key={el.id}>{el.value}</h2>;
        }

        if (el.type === 'paragraph') {
          const paragraphArray = el.value.split('\n');
          return paragraphArray.map((p, index) =>
            !p.length ? <br key={index} /> : <p key={el.id + index}>{p}</p>
          );
        }

        if (el.type === 'date') {
          const date = new Date(el.value);
          const userLocale = navigator.language;
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString(userLocale, options);
          return (
            <p className='date-holder' key={el.id}>
              {formattedDate}
            </p>
          );
        }

        if (el.type === 'image') {
          return (
            <div className='image-holder' key={el.id}>
              <img src={el.value} alt={el.description} />
              <label>{el.description}</label>
            </div>
          );
        }

        if (el.type === 'link') {
          return (
            <a key={el.id} href={el.value} className='link-holder'>
              {el.text || el.value}
            </a>
          );
        }

        if (el.type === 'media') {
          return (
            <div key={el.id} className="sect sect-bg">
              <div className="sect-header sect-title">{el.text}</div>
              <div className="sect-content video-box">
                <iframe
                  width="100%"
                  height="400"
                  src={el.value}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }

        return <div key={el.id}></div>;
      })}
    </TopicStyled>
  );
};
