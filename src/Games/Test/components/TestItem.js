import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import { InputStyled, LabelStyled } from '../../../components/InputStyled';
import { ButtonIconStyled } from '../../../components/ButtonStyled';
import React from 'react';
import { TestItemStyled } from './TestItemStyled';
import { Checkbox, Popup } from 'semantic-ui-react';
import { ShadowCardStyled } from '../../../pages/MainContentStyled';
import clsx from 'clsx';
const { v4: uuidv4 } = require('uuid');

export const answerIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
export const TestItem = ({ item, onRemoveItem, onChange }) => {

  return (
    <ShadowCardStyled className="d-block">
      <TestItemStyled>
        <div className='test-question'>
          <div>
            <LabelStyled className="input-label">Текст питання</LabelStyled>
            <InputStyled
              id={item.id}
              name={'question'}
              placeholder="Текст запитання"
              value={item.question}
              onChange={(e) => onChange(item.id, e.target.value)}
            />
          </div>
          <div/>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => onRemoveItem(item.id)}
              >
                <RemoveIcon />
              </ButtonIconStyled>
            )}
            content={'Видалити питання з тесту'}
          />
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={(
              <ButtonIconStyled
                className="remove-handle"
                onClick={() => onChange(item.id, [
                  ...item.answer,
                  {
                    id: uuidv4(),
                    text: '',
                    isTrue: false,
                  },
                ])}
              >
                +
              </ButtonIconStyled>
            )}
            content={'Додати ще один варіант відповіді'}
          />
        </div>
        {item.answer && item.answer.map((el, idx) => (
          <div className='test-answer' key={el.id}>
            <div>
              <LabelStyled className="input-label">Відповідь {answerIds[idx]}</LabelStyled>
              <InputStyled
                id={el.id}
                name={'answer'}
                placeholder="Наступний елемент списку"
                value={el.text}
                onChange={(e) => onChange(item.id,
                  item.answer.map(answer => answer.id === el.id
                    ? {
                      ...answer,
                      text: e.target.value,
                      char: answerIds[idx]
                    }
                    : answer),
                )}
              />
            </div>
            <Popup
              closeOnPortalMouseLeave
              openOnTriggerMouseEnter
              trigger={(
                <Checkbox
                  slider
                  checked={el.isTrue}
                  onChange={() => onChange(item.id,
                    item.answer.map(answer => answer.id === el.id
                      ? {
                        ...answer,
                        isTrue: !el.isTrue,
                      }
                      : {
                        ...answer,
                        isTrue: !el.isTrue === true ? false : answer.isTrue,
                      }),
                  )}
                />
              )}
              content={'Відмітити відповідь як вірну'}
            />
            <Popup
              closeOnPortalMouseLeave
              openOnTriggerMouseEnter
              trigger={(
                <ButtonIconStyled
                  className={clsx({
                    'remove-handle': true,
                    'is-excluded': el.isExcluded
                  })}
                  onClick={() => onChange(item.id,
                    item.answer.map(answer => answer.id === el.id
                      ? {
                        ...answer,
                        isExcluded: !answer.isExcluded,
                      }
                      : answer,
                    ))}
                >
                  {!el.isExcluded? '%' : 'X'}
                </ButtonIconStyled>
              )}
              content={'Відзначте ті питання які можуть бути видалені під' +
                  ' час вибору опції 50%50'}
            />
            <Popup
              closeOnPortalMouseLeave
              openOnTriggerMouseEnter
              trigger={(
                <ButtonIconStyled
                  className="remove-handle"
                  onClick={() => onChange(item.id,
                    item.answer
                      .filter(answer => answer.id !== el.id)
                  )}
                >
                  <RemoveIcon />
                </ButtonIconStyled>
              )}
              content={'Видалити варіант відповіді'}
            />
          </div>
        ))
        }
      </TestItemStyled>
    </ShadowCardStyled>
  );
};
