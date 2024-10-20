"use client";

import { useTranslation } from "react-i18next";

export default function Logo() {
  const { t } = useTranslation();

  return (
    <>
      {t("Home.title")}
      <span className="font-light">Github</span>
    </>
  );
}
