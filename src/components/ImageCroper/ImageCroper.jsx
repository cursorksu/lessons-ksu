import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import { CroppedImageStyled } from './style';
import { ReactComponent as CameraIcon } from '../../assets/camera.svg';
import { CropModal } from '../Modal/CropModal';
import { getDownloadURL, getStorage, uploadBytes, ref } from '@firebase/storage';
import { useImages } from '../../api/images/useImages';

const ImageCropper = ({ multiple, src, size, onChange }) => {
    const [ imageSrc, setImageSrc ] = useState(null);
    const [ croppedImgSrc, setCroppedImgSrc ] = useState(src || null);
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ rotation, setRotation ] = useState(0);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const { uploadImage } = useImages()

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    };
    const reset = useCallback(() => {
        setImageSrc(null);
        setCroppedImgSrc(src | null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setCroppedAreaPixels(null);
        setModalIsOpen(false);

    }, []);

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result));
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);


    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            const blob = await fetch(croppedImage).then((res) => res.blob());
            const file = new File([blob], `cropped-image-${Date.now()}.jpeg`, { type: blob.type });
            const downloadURL = await uploadImage(file, 'images');
            setCroppedImgSrc(downloadURL);
            onChange(downloadURL);
        } catch (error) {
            console.error("Ошибка при обрезке и загрузке изображения:", error);
        }
    }, [imageSrc, croppedAreaPixels, rotation, onChange]);

    return (
        <CroppedImageStyled>
            <input type="file" accept="image/*" onChange={(e) => {
                onFileChange(e).then(r => setModalIsOpen(true));
            }}/>
            {croppedImgSrc && <img className="img-holder" src={croppedImgSrc} alt="alt"/>}
            <CropModal
                icon={!src && !croppedImgSrc &&
                    <div className="img-preview" onClick={() => setModalIsOpen(true)}><CameraIcon/></div>
                }
                isOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
                modalTitle={'Выберите часть изображения'}
                onCancel={reset}
                onConfirm={showCroppedImage}
            >
                <div>
                    {imageSrc && (
                        <div style={{ position: 'relative', width: '100%', height: 400 }}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={+size}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}

                    {imageSrc && (
                        <div>
                            <label>
                                Zoom:
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(e.target.value)}
                                />
                            </label>
                            <label>
                                Rotation:
                                <input
                                    type="range"
                                    min={0}
                                    max={360}
                                    step={1}
                                    value={rotation}
                                    onChange={(e) => setRotation(e.target.value)}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </CropModal>
        </CroppedImageStyled>
    )
        ;
};

export default ImageCropper;
