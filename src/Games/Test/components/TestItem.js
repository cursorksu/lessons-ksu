import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import { InputStyled, LabelStyled } from '../../../components/InputStyled';
import { ButtonIconStyled } from '../../../components/ButtonStyled';
import React from 'react';
import { TestItemStyled } from './TestItemStyled';
import { Checkbox, Popup } from 'semantic-ui-react';
import { ShadowCardStyled } from '../../../pages/MainContentStyled';

export const TestItem = () => {
  return (
    <ShadowCardStyled className="d-block">
      <TestItemStyled>
        <div className='question'>
          <div>
            <LabelStyled className="input-label">Текст питання</LabelStyled>
            <InputStyled
              id={'${el?.id}'}
              name={'${el?.id}'}
              placeholder="Наступний елемент списку"
              value={'el?.value'}
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
          <div></div>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => {}}
              >
                <RemoveIcon />
              </ButtonIconStyled>
            )}
            content={'Видалити питання з тесту'}
          />
        </div>
        <div className='answer'>
          <div>
            <LabelStyled className="input-label">Відповідь В</LabelStyled>
            <InputStyled
              id={'${el?.id}'}
              name={'${el?.id}'}
              placeholder="Наступний елемент списку"
              value={'el?.value'}
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <Checkbox slider checked={false} onChange={() => {}}/>
            )}
            content={'Відмітити відповідь як вірну'}
          />
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => {}}
              >
                <RemoveIcon />
              </ButtonIconStyled>
            )}
            content={'Видалити варіант відповіді'}
          />
        </div>
        <div className='answer'>
          <div>
            <LabelStyled className="input-label">Відповідь С</LabelStyled>
            <InputStyled
              id={'${el?.id}'}
              name={'${el?.id}'}
              placeholder="Наступний елемент списку"
              value={'el?.value'}
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <Checkbox slider checked={false} onChange={() => {}}/>
            )}
            content={'Відмітити відповідь як вірну'}
          />
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => {}}
              >
                <RemoveIcon />
              </ButtonIconStyled>
            )}
            content={'Видалити варіант відповіді'}
          />
        </div>
        <div className="answer">
          <div>
            <LabelStyled className="input-label">Відповідь А</LabelStyled>
            <InputStyled
              id={'${el?.id}'}
              name={'${el?.id}'}
              placeholder="Наступний елемент списку"
              value={'el?.value'}
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </div>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <Checkbox slider checked={false} onChange={() => {}}/>
            )}
            content={'Відмітити відповідь як вірну'}
          />

          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => {}}
              >
                <RemoveIcon />
              </ButtonIconStyled>
            )}
            content={'Видалити варіант відповіді'}
          />
        </div>
      </TestItemStyled>
    </ShadowCardStyled>
  );
};
