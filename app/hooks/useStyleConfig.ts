"use client";

import { useState } from "react";

export interface CardStyle {
  background: string;
  tableColor: string;
  textColor: string;
  fontFamily: string;
  gameNumberBackground: string;
  freeCenterContent?: string;
  freeCenterImage?: boolean;
  freeCenterImageUrl?: string;
}

export const defaultStyle: CardStyle = {
  background: "#fff",
  tableColor: "#000",
  textColor: "#000",
  fontFamily: "Roboto",
  gameNumberBackground: "#eee",
  freeCenterContent: "FREE",
  freeCenterImage: false,
  freeCenterImageUrl: "",
};

export const useStyleConfig = () => {
  const [style, setStyle] = useState<CardStyle>(defaultStyle);

  const updateStyle = (patch: Partial<CardStyle>) =>
    setStyle((prev) => ({ ...prev, ...patch }));

  return { style, updateStyle };
};
