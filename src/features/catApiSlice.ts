// src/features/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define the TypeScript interface for the API response
interface Cats {
  id: number;
  name: string;
  description: string; // Add other fields as needed
}

export const catApiSlice = createApi({
  reducerPath: "catApiSlice", // The key to identify this slice in the store
  baseQuery: fetchBaseQuery({ baseUrl: "https://catfact.ninja/" }), // Replace with your API base URL
  endpoints: (builder) => ({
    getBreeds: builder.query<Cats[], void>({
      query: () => "breeds", // Replace 'items' with your API endpoint
    }),
  }),
});

export const { useLazyGetBreedsQuery } = catApiSlice; // Export the auto-generated hook
