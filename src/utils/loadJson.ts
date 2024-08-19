/// <reference types="webpack-env" />

export const loadQuestion = (path: string) => {
  return import(`../questions${path}.json`);
};
