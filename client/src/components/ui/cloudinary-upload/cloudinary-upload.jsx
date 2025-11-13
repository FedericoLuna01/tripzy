import { useEffect, useRef, useState } from "react";
import { CloudArrowUp } from "phosphor-react";
import styles from "./cloudinary-upload.module.css";

const CloudinaryUpload = ({ onUpload, currentImageUrl, disabled }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");

  useEffect(() => {
    setPreviewUrl(currentImageUrl || "");
  }, [currentImageUrl]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
        maxImageFileSize: 5000000, // 5MB
        cropping: true,
        croppingAspectRatio: 1.5,
        folder: "tripzy/trips",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setPreviewUrl(imageUrl);
          onUpload(imageUrl);
        }
      }
    );

    return () => {
      widgetRef.current?.destroy();
    };
  }, [onUpload]);

  const handleClick = () => {
    if (!disabled) {
      widgetRef.current?.open();
    }
  };

  return (
    <div className={styles["cloudinary-upload"]}>
      <button
        type="button"
        onClick={handleClick}
        className={`${styles["cloudinary-upload-button"]} button button-secondary`}
        disabled={disabled}
      >
        <CloudArrowUp size={24} />
        {previewUrl ? "Cambiar imagen" : "Subir imagen"}
      </button>
      {previewUrl && (
        <div className={styles["cloudinary-preview"]}>
          <img src={previewUrl} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
