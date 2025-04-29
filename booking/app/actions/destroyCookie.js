// app/actions/destroyCookie.js
'use server'
import { cookies } from "next/headers";
import { createSessionClient } from "@/config/appwrite";

export async function destroyCookie() {
    try {
        const cookieStore = cookies();
        const session = cookieStore.get('appwrite-session')?.value;
        
        if (session) {
            const { account } = createSessionClient(session);
            await account.deleteSession('current');
        }
        
        cookieStore.delete('appwrite-session');
        return { success: true };
    } catch (error) {
        console.error('Logout failed:', error);
        return { 
            error: error.message || 'Failed to log out' 
        };
    }
}