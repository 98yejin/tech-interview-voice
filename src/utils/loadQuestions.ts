/// <reference types="webpack-env" />

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((key) => ({
    path: key,
    content: r(key),
  }));
}

export const questions = importAll(
  require.context("../questions", true, /\.json$/)
);
