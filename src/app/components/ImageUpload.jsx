"use client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ImageUpload({ name, icon, defaultValue = "" }) {
  const fileInRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [url, setUrl] = useState(defaultValue);

  async function upload(ev) {
    const input = ev.target;

    if (input && input.files?.length && input.files.length > 0) {
      setIsUploading(true);

      const file = input.files[0];
      const data = new FormData();
      data.append("file", file); // Using append instead of set for files

      try {
        const response = await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure headers are correct
        });
        if (response.data.url) {
          setUrl(response.data.url); // Set the uploaded file's URL
          setIsImageLoading(true); // Handle the image loading state
        }
      } catch (error) {
        console.error(
          "File upload failed:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setIsUploading(false); // Always reset uploading state
      }
    }
  }

  const imgLoading = isUploading || isImageLoading;

  return (
    <>
      <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
        {imgLoading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}
        {!isUploading && url && (
          <Image
            src={url}
            alt={"uploaded image"}
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className="w-auto h-auto max-w-24 max-h-24"
          />
        )}
        {!imgLoading && !url && (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>
      <input type="hidden" value={url} name={name} />
      <div className="mt-2">
        <input
          onChange={(ev) => upload(ev)}
          ref={fileInRef}
          type="file"
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => fileInRef.current?.click()}
          variant="soft"
        >
          select file
        </Button>
      </div>
    </>
  );
}
