import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
// Ensure the correct path or module name for the User type
import { User } from "../types/prismaTypes"; // Adjust the path as necessary
import { createNewUserInDatabase } from "@/lib/utils";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: async (headers) => {
            const session = await fetchAuthSession();
            const { idToken } = session.tokens ?? {};
            if (idToken) {
              headers.set("Authorization", `Bearer ${idToken}`);
            }
            return headers;
        },
    }),
    reducerPath: "api",
    tagTypes: ["Vendors","Buyers", "Users", "Shops", "Shop Details"],
    endpoints: (build) => ({
    //----------------------------------------
    //USER RELATED APIS
    //----------------------------------------
    // Fetch the authenticated user details
       getAuthUser: build.query<User, void>({
        queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
            try{
                const session = await fetchAuthSession(); //getting the user session
                const { idToken } = session.tokens ?? {};
                const user = await getCurrentUser(); // AWS Cognito user current
                // if the userId already exists then get information back
                const endpoint = `/users/${user.userId}`; // API endpoint to fetch user data user.userId is the cognitoId
                let userDetailsResponse = await fetchWithBQ(endpoint);

                //if user does not exist create new user
                if( userDetailsResponse.error && userDetailsResponse.error.status ===404){
                    const userRole = "BUYER"; // default starting role
                    userDetailsResponse = await createNewUserInDatabase(
                        user,
                        idToken,
                        userRole,
                        fetchWithBQ
                    );
                }
                return {
                    data:{
                        cognitoInfo: {...user},
                        userInfo: userDetailsResponse.data as User
                    }
                }
            }catch(error: any){
                return {error: error.message ? error.message : "An error occurred while fetching user data."};
            }
        }
       }),
    // UPDATE USER SETTINGS
    updateUserSettings: build.mutation<User, {cognitoId: string } & Partial<User>>({
        query: ({ cognitoId, ...updatedUser }) => ({
          url: `users/${cognitoId}`,
          method: "PUT",
          body: updatedUser,
        }),
        // responsible for matching backend data to front end 
        invalidatesTags: (result) => [{ type: "Users", id: result?.id }],
  
      }),
    }),
});

export const {
    useGetAuthUserQuery,
    useUpdateUserSettingsMutation
} = api;