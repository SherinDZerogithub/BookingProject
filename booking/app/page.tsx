import Image from "next/image";
import getAllRooms from "./actions/getAllRooms";
import RoomCard from '@/components/RoomCard'
import Heading from '@/components/Heading'

export default async function Home() {  // Added async here
  const rooms = await getAllRooms();
  
  return (
    <main>
      <Heading title='Available Rooms' />
      <div className="space-y-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard key={room.$id} room={room} />
          ))
        ) : (
          <p className="text-center py-8 text-gray-500">
            No Rooms Available at the moment
          </p>
        )}
      </div>
    </main>
  );
}