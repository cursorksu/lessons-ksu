import React, { useEffect, useState } from "react";
import { useGetTopicById } from "../../api/topic";
import { TopicStyled } from "./style";

export const DisplayTopic = ({ topicId }) => {
  const [currentTopic, setCurrentTopic] = useState(null);

  const { getTopicById } = useGetTopicById();

  useEffect(() => {
    topicId &&
      getTopicById(topicId).then(
        (data) =>
          console.log({ data }) || setCurrentTopic(JSON.parse(data.topic)),
      );
  }, [topicId, getTopicById]);

  return (
    <TopicStyled>
      {currentTopic?.map((el) => {
        if (el.type === "list") {
          return (
            <ul key={el.id}>
              {el.value.map((item) => (
                <li> {item.value}</li>
              ))}
            </ul>
          );
        }

        if (el.type === "dev") {
          return <hr key={el.id} />;
        }

        if (el.type === "dict") {
          return (
            <div key={el.id}>
              <div className="declaration">{el.value}</div>
              <div className="text">{el.text}</div>
            </div>
          );
        }

        if (el.type === "title") {
          return <h2 key={el.id}>{el.value}</h2>;
        }
        if (el.type === "subtitle") {
          return <h4 key={el.id}>{el.value}</h4>;
        }

        if (el.type === "paragraph") {
          return <p key={el.id}>{el.value}</p>;
        }

        if (el.type === "date") {
          return <i key={el.id}>{el.value}</i>;
        }

        if (el.type === "image") {
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

        if (el.type === "link") {
          return (
            <a key={el.id} href={el.value}>
              {el.text}
            </a>
          );
        }

        if (el.type === "media") {
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

        if (el.type === "code") {
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
};
