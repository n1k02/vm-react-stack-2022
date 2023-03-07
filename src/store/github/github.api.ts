import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, ServerResponse} from "../../models/models";

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchUsers: build.query<IUser[], string>({
            query: (search: string)=> ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse) => response.items
        }),
        getUserRepos: build.query<any, string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

// lazy - для запроса по требованию, а не автоматического
export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi