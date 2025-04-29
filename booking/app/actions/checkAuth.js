// app/actions/checkAuth.js
"use server"

import { cookies } from 'next/headers';
import { createSessionClient } from "@/config/appwrite";

export const checkAuth = async () => {
    const sessionCookie = (await cookies()).get('appwrite-session');
    
    if(!sessionCookie){
        return {
            isAuthenticated: false
        }
    }
    try {
        const {account} = createSessionClient(sessionCookie.value);
        const user = await account.get();

        return {
            isAuthenticated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email
            }
        }
    } catch (error) {
        return {
            isAuthenticated: false
        }
    }
}