import { useState, useEffect, useCallback } from "react";

const API_PREFIX = `/api/preview`;

export const usePreview = (gameConfig) => {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPreview = useCallback(async () => {
    if (!gameConfig) return;

    const params = new URLSearchParams();

    if (gameConfig.freeCenter != null)
      params.set("free_center", gameConfig.freeCenter ? "1" : "0");
    if (gameConfig.freeCenterContent)
      params.set("free_center_value", gameConfig.freeCenterContent);
    if (gameConfig.freeCenterImage && gameConfig.freeCenterImageUrl) {
      params.set("free_center_image", gameConfig.freeCenterImageUrl);
    } else if (gameConfig.centerContent) {
      params.set("free_center_value", gameConfig.centerContent);
    }
    if (gameConfig.gameNumber != null)
      params.set("game_number", String(gameConfig.gameNumber));
    if (gameConfig.seed !== "" && gameConfig.seed != null)
      params.set("seed", String(gameConfig.seed));
    if (gameConfig.forceUnique != null)
      params.set("unique", gameConfig.forceUnique ? "1" : "0");

    params.set("fragment", "true");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_PREFIX}?${params.toString()}`, {
        method: "GET",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Preview request failed (${res.status})`);
      }

      const htmlText = await res.text();
      console.log(htmlText);
      setHtml(htmlText);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load preview"
      );
      setHtml("");
    } finally {
      setLoading(false);
    }
  }, [gameConfig]);

  useEffect(() => {
    getPreview();
  }, [getPreview]);

  return {
    html,
    loading,
    error,
    refresh: getPreview,
  };
};
