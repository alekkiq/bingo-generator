"use client";

import { useState, useCallback } from "react";
import { fetchData } from "@/lib/fetcher";

const API_PREFIX = `/api/upload`;

interface UploadResult {
  url: string;
}

export const useUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file?: File | null): Promise<string | null> => {
      if (!file) return null;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await fetchData<UploadResult>(API_PREFIX, {
          method: "POST",
          body: formData,
        });

        if (!result.url) {
          throw new Error("No URL returned from upload");
        }

        setUrl(result.url);
        return result.url;
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Upload failed");
        setUrl(null);
        return null;
      } finally {
        setUploading(false);
      }
    },
    []
  );

  return {
    uploadFile,
    uploading,
    error,
    url,
  };
};
