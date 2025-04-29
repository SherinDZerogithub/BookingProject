// app/actions/createSession.js
'use server'
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function createSession(prevState, formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (!email || !password) {
            return { error: 'Email and password are required' };
        }

        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        
        // Await the cookies() call
        const cookieStore = cookies();
        cookieStore.set('appwrite-session', session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
        });

        return { success: true };
    } catch (error) {
        console.error('Login failed:', error);
        return { 
            error: error.message || 'Invalid email or password' 
        };
    }
}
// whenever we use the form state and the action its gonna take in the previos state as the first argument and
//form data would be the second argument
//when logged in we are creating a new session 