import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IDocumentObject {
  id: string;
  title: string;
  date: string;
  size: string;
  type: string;
}

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8888/documents" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getDocumentsList: builder.query<IDocumentObject[], string>({
      query: () => "",
    }),
  }),
});

export const { useGetDocumentsListQuery } = documentApi;
