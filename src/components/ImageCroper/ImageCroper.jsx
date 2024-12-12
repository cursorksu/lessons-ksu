import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from '../../utils/cropImage';
import { CroppedImageStyled } from './style';

const ImageCropper = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImgSrc, setCroppedImgSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result));
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            setCroppedImgSrc(croppedImage)
    }, [imageSrc, croppedAreaPixels, rotation]);

    return (
        <CroppedImageStyled>
            <img className={'img-holder'} src={croppedImgSrc} alt="alt"/>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {imageSrc && (
                <div style={{ position: "relative", width: "100%", height: 400 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={4 / 3} // Пропорции (например, 4:3)
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
                    <button onClick={showCroppedImage}>Crop</button>
                </div>
            )}
        </CroppedImageStyled>
    );
};

export default ImageCropper;
