import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Checkbox, Grid, Radio, Image } from 'semantic-ui-react';
import { resizeFile } from '../../utils/resizeFile';
import { LabelStyled, TextareaAutosizeStyled } from '../InputStyled';
import { ReactComponent as ViewIcon } from '../../assets/view.svg';
import { ReactComponent as ClosedViewIcon } from '../../assets/closed-view.svg';
import { ReactComponent as AddToSlider } from '../../assets/album.svg';
import { ReactComponent as NotAddToSlider } from '../../assets/folder.svg';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';
import { UvDropzoneStyled, StyledDropzoneBody } from './styles';
import { ButtonIconStyled } from '../ButtonStyled';
import clsx from 'clsx';

export const DropzoneField = ({ field, onChange }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('100');
  const [hideElement, setHideElement] = useState(false);
  const [addToSlideShow, setAddToSlideShow] = useState(false);

  useEffect(() => {
    field.value && setImage(field.value);
    field.description && setDescription(field.description);
    field.size && setSize(field.size);
    field.hideElement && setHideElement(field.hideElement);
    field.addToSlideShow && setAddToSlideShow(field.addToSlideShow);
  }, []);

  const onDrop = async (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const getUri = resizeFile(file);
      getUri &&
        getUri.then((preview) => {
          setImage(preview);
        });
    });
  };

  useEffect(() => {
    image &&
      onChange({
        value: image,
        description,
        size,
        hideElement,
        addToSlideShow,
      });
  }, [image, description, size, hideElement, addToSlideShow]);

  const viewHandler = useCallback(() => {
    setHideElement((prev) => !prev);
  }, []);
  const slideShowHandler = useCallback(() => {
    setAddToSlideShow((prev) => !prev);
  }, []);
  return (
    <StyledDropzoneBody>
      <Grid.Row className="dz-row">
        <Grid.Column width={4}>
          <LabelStyled className="label">Зображення</LabelStyled>
          <Dropzone onDrop={onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <UvDropzoneStyled>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept=".png,.jpg" />
                  {!image && (
                    <span className="accent">+ Додати зображення</span>
                  )}
                  {image && <img src={image} alt={image} />}
                </div>
              </UvDropzoneStyled>
            )}
          </Dropzone>
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
                <LabelStyled>Додаткові налаштування</LabelStyled>
                <Grid.Row>
                  <ButtonIconStyled
                    id={'viewButton'}
                    onClick={viewHandler}
                    className="print-hide">
                    {hideElement ? <ClosedViewIcon /> : <ViewIcon />}
                  </ButtonIconStyled>
                  <Checkbox
                    label={
                      hideElement
                        ? 'Відображати під час друку'
                        : 'Приховати під час друку'
                    }
                    onChange={(e, data) => setHideElement(data.checked)}
                    checked={hideElement}
                  />
                </Grid.Row>
                <Grid.Row>
                  <ButtonIconStyled
                    id={'sliderButton'}
                    onClick={slideShowHandler}
                    className="print-hide">
                    {addToSlideShow ? <NotAddToSlider /> : <AddToSlider />}
                  </ButtonIconStyled>
                  <Checkbox
                    label={
                      addToSlideShow
                        ? 'Не додавати до презентації'
                        : 'Додати до презентації'
                    }
                    onChange={(e, data) => setAddToSlideShow(data.checked)}
                    checked={addToSlideShow}
                  />
                </Grid.Row>
                <hr />
                <Grid.Row>
                  <LabelStyled>Ширина зображення на сторінці</LabelStyled>
                  <Grid>
                    <Grid.Row className="size-box">
                      <Grid.Column width={4}>
                        <Radio
                          label={() => (
                            <Image className={clsx({ active: size === '100' })}>
                              <ImageIcon />
                            </Image>
                          )}
                          name="radioGroup"
                          value={'100'}
                          checked={size === '100'}
                          onChange={() => setSize('100')}
                        />
                        <LabelStyled>100%</LabelStyled>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Radio
                          label={() => (
                            <Image className={clsx({ active: size === '60' })}>
                              <ImageIcon />
                            </Image>
                          )}
                          name="radioGroup"
                          value="60"
                          checked={size === '60'}
                          onChange={() => setSize('60')}
                        />
                        <LabelStyled>50%</LabelStyled>
                      </Grid.Column>
                      <Grid.Column width={2}>
                        <Radio
                          label={() => (
                            <Image className={clsx({ active: size === '30' })}>
                              <ImageIcon />
                            </Image>
                          )}
                          name="radioGroup"
                          value="30"
                          checked={size === '30'}
                          onChange={() => setSize('30')}
                        />
                        <LabelStyled>30%</LabelStyled>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={9}>
                <LabelStyled>Опис до зображення</LabelStyled>
                <TextareaAutosizeStyled
                  rows={9}
                  name="img-description"
                  placeholder="Додайте опис, якщо треба"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </StyledDropzoneBody>
  );
};
