import type { Content, Local } from "@/i18n.config";

const dictionaries = {
  en: () =>
    import("@/dictionaries/en.json").then(
      (module) => module.default as Content
    ),
  hn: () =>
    import("@/dictionaries/hn.json").then(
      (module) => module.default as Content
    ),
  gj: () =>
    import("@/dictionaries/gj.json").then(
      (module) => module.default as Content
    ),
};
export const getDictionaries = (local: Local) => dictionaries[local]();
