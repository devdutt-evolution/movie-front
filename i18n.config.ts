export const i18n = {
  locales: ["en", "hn", "gj"],
  defaultLocale: "en",
} as const;

export type Local = (typeof i18n)["locales"][number];
export type Content = {
  login: {
    singin: string;
    email: string;
    password: string;
    remember: string;
    login: string;
  };
  movies: {
    create: {
      create: string;
      title: string;
      year: string;
      cancel: string;
      submit: string;
      drop_file: string;
    };
    movieId: {
      edit: string;
      title: string;
      year: string;
      cancel: string;
      update: string;
      drop_file: string;
    };
    no_movies: {
      button: string;
      title: string;
    };
    my_movies: string;
    logout: string;
    next: string;
    prev: string;
  };
};
