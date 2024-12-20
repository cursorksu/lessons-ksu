import React, { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import Cropper from 'react-easy-crop';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import { Content, DropzoneStyled, ImageArea, Metadata } from './style';
import { useDropzone } from 'react-dropzone';
import { ButtonStyled } from '../ButtonStyled';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const ImageUploader = ({ onUpload, onDelete, size, src }) => {
    const storage = getStorage();
    const { t } = useTranslation('tr');
    const [ image, setImage ] = useState(null);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ croppedImageURL, setCroppedImageURL ] = useState('');
    const [ fileInfo, setFileInfo ] = useState({ name: '', size: '' });
    const [ storageRef, setStorageRef ] = useState(null);
    const [ imageWasUpload, setImageWasUpload ] = useState(false);

    useEffect(() => {
        !!src && setImage(src)
    }, [src])

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setFileInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + ' KB' });
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
            setImageWasUpload(true);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    const getCroppedImage = async () => {
        const canvas = document.createElement('canvas');
        const imageElement = document.createElement('img');
        imageElement.crossOrigin = 'anonymous';
        imageElement.src = image;

        await new Promise((resolve) => {
            imageElement.onload = resolve;
        });

        const { width, height } = croppedAreaPixels;
        const context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        context.drawImage(
            imageElement,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
        });
    };

    const uploadToFirebase = async () => {
        if (!croppedAreaPixels) return;

        const croppedBlob = await getCroppedImage();
        const storageReference = ref(storage, `images/${fileInfo.name}`);
        await uploadBytes(storageReference, croppedBlob);
        const downloadURL = await getDownloadURL(storageReference);
        setImageWasUpload(false);
        setStorageRef(storageReference);
        setCroppedImageURL(downloadURL);
        onUpload(downloadURL);
    };

    const clearImage = async () => {
        if (storageRef) {
            await deleteObject(storageRef);
        }
        setImage(null);
        setCroppedImageURL('');
        setImageWasUpload(false);
        setFileInfo({ name: '', size: '' });
        onUpload('');
        onDelete();
    };

    return (
        <Container>
            {!image ? (
                <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <p>Перетащите изображение сюда или нажмите для выбора</p>
                </div>
            ) : (
                 <Content>
                     <ImageArea>
                         <DropzoneStyled className={clsx({ hide: !imageWasUpload })}>
                             <Cropper
                                 image={image}
                                 crop={crop}
                                 zoom={zoom}
                                 aspect={size}
                                 onCropChange={setCrop}
                                 onZoomChange={setZoom}
                                 onCropComplete={(croppedArea, croppedAreaPixels) =>
                                     setCroppedAreaPixels(croppedAreaPixels)
                                 }
                             />
                         </DropzoneStyled>
                         {!imageWasUpload && (
                             <div className={'image-holder'}>
                                 <img src={croppedImageURL || src} alt="Cropped" style={{ maxWidth: '100%' }}/>
                             </div>
                         )}
                     </ImageArea>
                     <Metadata>
                         <div className={clsx({ hide: !fileInfo.name})}>
                             <h3>Информация о файле:</h3>
                             <p>Имя файла: {fileInfo.name}</p>
                             <p>Размер файла: {fileInfo.size}</p>
                         </div>
                         <div></div>
                         <div className="button-wrapper">
                             <ButtonStyled onClick={clearImage} className="secondary">
                                 {t('button.delete')}
                             </ButtonStyled>
                             <ButtonStyled onClick={uploadToFirebase} disabled={!imageWasUpload}>
                                 {t('button.upload')}
                             </ButtonStyled>
                         </div>
                     </Metadata>
                 </Content>
             )}
        </Container>
    );
};
