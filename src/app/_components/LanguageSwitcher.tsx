"use client";

import { LanguageIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => {
        setLanguage(language === "en" ? "bn" : "en");
      }}
      className="flex"
    >
      <p className="flex">
        <LanguageIcon className="rounded-full size-6 text-black font-black "></LanguageIcon>
        {language === "en" ? "ENGLISH" : "বাংলা"}
      </p>
    </button>
  );
};

export default LanguageSwitcher;
