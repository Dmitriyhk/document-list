import { configureStore } from "@reduxjs/toolkit";
import { documentApi } from "./api/documentApi";

export const store = configureStore({
  reducer: {
    [documentApi.reducerPath]: documentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(documentApi.middleware),
});
