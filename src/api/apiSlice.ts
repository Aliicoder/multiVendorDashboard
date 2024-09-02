import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "@/store/Reducers/authReducer";
import { RootState } from "@/store";

// Define the expected structure of the response data
interface AuthResponse {
  credentials?: {
    user: string;
    token: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;//console.log(token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      console.log('Authorization header set:', headers.get('authorization'));
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);//console.log("initial result", result);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult.data) {
      const refreshData = refreshResult.data as AuthResponse;
      if (refreshData.credentials) {
        api.dispatch(setCredentials(refreshData.credentials));
      } else {
        api.dispatch(setCredentials({ user: "", token: "" }));
      }
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result; // Ensure to return the result
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});



// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/v1'
// })