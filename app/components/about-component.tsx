"use client";

import { useTranslation } from "react-i18next";

export default function AboutComponent() {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center text-primary mb-5">
          {t("About.title")}
        </h1>
      </div>
    </div>
  );
}
