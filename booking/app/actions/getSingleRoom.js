// actions/getAllRooms.ts
"use server";

import { createAdminClient } from "@/config/appwrite";

export default async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    return room;
  } catch (error) {
    console.error("Failed to get room:", error);
    return [];
  }
}