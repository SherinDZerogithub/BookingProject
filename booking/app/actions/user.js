// app/actions/user.js
"use server"

import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

// Change to default export
export default async function createUser(previousState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    
    if(!name || !email || !password) {
        return { error: 'Name, email and password are required' }
    }

    if(password.length < 8) {
        return { error: 'Password must be at least 8 characters long' }
    }

    if(password.length > 265) {
        return { error: 'Password must be less than 265 characters' }
    }

    if(password !== confirmPassword) {
        return { error: 'Passwords do not match' }
    }

    // Check for common passwords
    const commonPasswords = ['password', '12345678', 'qwertyui', 'admin123'];
    if(commonPasswords.includes(password.toLowerCase())) {
        return { error: 'Password is too common, please choose a stronger one' }
    }

    try {
        const { account } = await createAdminClient();
        await account.create(ID.unique(), email, password, name);
        return { success: true };
    } catch (error) {
        console.error("Failed to create user:", error);
        return { error: error.message || 'Failed to create user' };
    }
}