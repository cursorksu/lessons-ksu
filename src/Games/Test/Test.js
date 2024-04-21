import { MainLayout } from '../../pages/MainLayout';
import React, { useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { TestItem } from './components/TestItem';
import { Popup } from 'semantic-ui-react';
import EmojiPicker from 'emoji-picker-react';

export const Test = () => {
  const [test, setTest] = useState();


  return (
    <MainLayout>
      <div className="herro">
        <div className="title-wrapper">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">Test</h1>
        </div>
      </div>

      <section className='ksu-content'>
        <aside className='aside-wrapper'>
          <div>
            <h2 className='title'>Створіть тест</h2>
            <p>Виберіть гру для повторення матеріалу. Натистніть на кнопку
              "Доєднати до уроку" та виберіть у
              випадаючому списку один з ваших уроків</p>
            <p>Налаштування вибраної гри будуть збережені у відповідному уроці</p>
            <p>Переходьте до персоналізації вибраної гри натиснувши на іконку "⚙︎ Налаштування"</p>
            <p>Читайте правила гри. Сміливо змінюйте контент для того щоб адаптувати гру під ваше бачення і вчення вашої церкви</p>
            <p>Зберіжіть налаштування і відкрийте ігровий простір з вкладки ігри у поточному уроці</p>
            <p>Засвоюйте з дітьми нове, повторюйте матеріал, грайте, розважайтеся, дивуйте своїх учнів</p>
          </div>
          <br/>
          <iframe
            title="gameDescription"
            width="100%"
            height="315"
            frameBorder={null}
            src={'https://youtu.be/hiHy3vW2SxI?t=5'}
            allowFullScreen={true} />
        </aside>
        <section className='content-wrapper'>
          <div className="d-flex">
            <h2 className='title'>Додайте тест</h2>
            <Popup
              closeOnPortalMouseLeave
              openOnTriggerMouseEnter
              trigger={(
                <ButtonIconStyled>+</ButtonIconStyled>
              )}
              content={'Додати питання до тесту'}
            />
          </div>


          <TestItem />
          <ButtonStyled onClick={() => {}}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={() => {}}>Зберегти</ButtonStyled>
        </section>
      </section>
    </MainLayout>
  );
};
