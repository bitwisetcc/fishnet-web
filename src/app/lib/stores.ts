"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export const TitleContext = createContext<Dispatch<SetStateAction<string>>>(
  () => null,
);

export const ProfileContext = createContext<
  Dispatch<SetStateAction<{ name: string; picture: string }>>
>(() => null);

export const SideBarContext = createContext<
  [any, Dispatch<SetStateAction<any>>]
>([{}, () => ({})]);
