// actions/getAllRooms.ts
"use server";

import { createAdminClient } from "@/config/appwrite";

export default async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );

    return rooms;
  } catch (error) {
    console.error("Failed to get rooms:", error);
    return [];
  }
}