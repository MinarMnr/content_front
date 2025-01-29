"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const LangTra = ({ control, data }: { control: string; data?: any }) => {
  const { language } = useLanguage();
  const t: any = translations[language];

  const numberMap = new Map<string, string>([
    ["0", "০"],
    ["1", "১"],
    ["2", "২"],
    ["3", "৩"],
    ["4", "৪"],
    ["5", "৫"],
    ["6", "৬"],
    ["7", "৭"],
    ["8", "৮"],
    ["9", "৯"],
    ["hours", "ঘন্টা"],
    ["minutes", "মিনিট"],
    ["seconds", "সেকেন্ড"],
    ["Paid", "পরিশোধিত"],
    ["Unpaid", "অপরিশোধিত"],
  ]);

  const singleranslate = (segment: any) => {
    switch (typeof segment) {
      case "number":
        return `${segment}`.replace(/[0-9]/g, (match: string) =>
          numberMap.has(match) && language === "bn"
            ? `${numberMap.get(match)}`
            : match
        );
      case "string":
        return numberMap.has(segment)
          ? language === "bn"
            ? `${numberMap.get(segment)}`
            : segment
          : segment.replace(/[0-9]|hours|minutes|seconds/gi, (match: string) =>
              numberMap.has(match) && language === "bn"
                ? `${numberMap.get(match)}`
                : match
            );
      default:
        return segment;
    }
  };

  return control?.split(".").reduce((pV: any, cV: string) => {
    return singleranslate(
      pV?.[
        cV?.endsWith("_en") && language === "bn"
          ? cV?.replace("_en", "_bn")
          : cV
      ]
    );
  }, data ?? t);
};

export default LangTra;
