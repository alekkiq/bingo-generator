import { useState, useCallback } from "react";
import { fetchData } from "../utils/fetchData";

const API_PREFIX = `/api/upload`;

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadFile = useCallback(async (file) => {
    if (!file) return null;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await fetchData(API_PREFIX, {
        method: "POST",
        body: formData,
      });

      if (!result.url) {
        throw new Error("No URL returned from upload");
      }

      setUrl(result.url);
      return result.url;
    } catch (error) {
      setError(error instanceof Error ? e.message : "Upload failed");
      setUrl(null);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploadFile,
    uploading,
    error,
    url,
  };
};
