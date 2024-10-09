"use client";

import { Fragment, type ReactNode } from "react";

import "@/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
