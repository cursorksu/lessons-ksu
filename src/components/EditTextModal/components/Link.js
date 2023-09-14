import { BlockWrapperFlexStyled } from "../style";
import { InputFieldStyled, InputStyled } from "../../InputStyled";
import React, { useCallback, useState } from "react";
import { ButtonStyled } from "../../ButtonStyled";

export const Link = ({ onChange, name }) => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  const handleChange = useCallback(() => {
    onChange({
      text,
      value: link,
    });
  }, [link, text, onChange]);

  return (
    <BlockWrapperFlexStyled>
      <InputFieldStyled>
        <label>Текст посилання</label>
        <InputStyled
          name={`${name}-text`}
          placeholder="Додайте текст посилання"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </InputFieldStyled>
      <InputFieldStyled>
        <label>Посилання</label>
        <InputStyled
          name={`${name}-value`}
          placeholder="Додайте посилання"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </InputFieldStyled>
      <ButtonStyled onChange={handleChange}>Add link</ButtonStyled>
    </BlockWrapperFlexStyled>
  );
};
