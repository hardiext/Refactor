"use client"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface ChatRoom {
  id: string;
  job_id: string;
  user1_id: string;
  user2_id: string;
  job_title?: string; // optional karena bisa tidak ada judul
}

const supabase = createClient()

export default function ChatRooms() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchRooms(session.user.id);
      } else {
        alert("Please login first");
        router.push("/login");
      }
    });

    // cek dulu kalau user sudah login (session sudah ada)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchRooms(session.user.id);
      } else {
        alert("Please login first");
        router.push("/login");
      }
    });

    // bersihkan listener saat komponen unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function fetchRooms(userId: string) {
    const { data, error } = await supabase
      .from("chat_rooms")
      .select(`
        id,
        job_id,
        user1_id,
        user2_id,
        jobs!inner(title)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const roomsData = (data ?? []).map((room: any) => ({
      id: room.id,
      job_id: room.job_id,
      user1_id: room.user1_id,
      user2_id: room.user2_id,
      job_title: room.jobs?.title ?? "No Job Title",
    }));

    setRooms(roomsData);
    setLoading(false);
  }

  if (loading) return <div>Loading chat rooms...</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Chat Rooms</h1>
      {rooms.length === 0 && <p>You have no chat rooms yet.</p>}
      <ul>
        {rooms.map((room) => {
          const otherUserId =
            room.user1_id === userId ? room.user2_id : room.user1_id;
          return (
            <li
              key={room.id}
              className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/messages/${room.id}`)}
            >
              <p className="font-bold">{room.job_title}</p>
              <p className="text-xs text-gray-500">
                Chat with user: {otherUserId}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
