import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io('http://localhost:3000')
type Room = {
  name: string;
  numberOfPlayers: number;
}

export const RoomList: React.FC = () =>{
    
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    socket.on("updateRooms", (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => {
      socket.off("updateRooms");
    };
  }, []);

  const joinRoom = (roomName: string) =>{
    socket.emit("joinRoom", roomName);
}

  const isRoomFull = (numberOfPlayers: number, roomName: string) =>{
    return numberOfPlayers <2 ? <button onClick={()=> joinRoom(roomName)}>Join room</button> : <p>Room is full</p>
  }
  return (
    <>
    {rooms.length === 0 && <p>Czekam na połączenie z serwerem</p>} 
    <ul>{rooms.map(room =><li>{room.name}: {room.numberOfPlayers} {isRoomFull(room.numberOfPlayers, room.name)}</li>)} </ul>
    
    
    </>
  )
} 