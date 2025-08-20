"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

type Message = {
  id: string;
  room_id: string;
  sender_id: string;
  message: string;
  created_at: string;
};

type User = {
  id: string;
  full_name: string;
  avatar_url?: string | null;
};

export default function ChatRoomDetail() {
  const { roomId } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch current user ID & verify membership in room
  useEffect(() => {
    async function fetchUserAndVerify() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login");
        router.push("/login");
        return;
      }

      setCurrentUserId(user.id);

      // Verify membership in chatroom_members
      const { data: memberData, error: memberError } = await supabase
        .from("chatroom_members")
        .select("*")
        .eq("room_id", roomId)
        .eq("user_id", user.id)
        .single();

      if (memberError || !memberData) {
        alert("You are not a member of this chat room.");
        router.push("/messages");
        return;
      }
    }
    fetchUserAndVerify();
  }, [roomId, router, supabase]);

  // Fetch messages + users in room
  useEffect(() => {
    if (!roomId) return;

    async function fetchMessagesAndUsers() {
      setLoading(true);
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from("chat_messages")
          .select("*, sender:user_id (id, full_name, avatar_url)")
          .eq("room_id", roomId)
          .order("created_at", { ascending: true });

        if (messagesError) throw messagesError;

        if (!messagesData) {
          setMessages([]);
          setLoading(false);
          return;
        }

        // Map users for display
        const users: Record<string, User> = {};
        messagesData.forEach((msg: any) => {
          if (msg.sender && msg.sender.id) {
            users[msg.sender.id] = {
              id: msg.sender.id,
              full_name: msg.sender.full_name,
              avatar_url: msg.sender.avatar_url,
            };
          }
        });

        setUserMap(users);
        setMessages(
          messagesData.map((msg: any) => ({
            id: msg.id,
            room_id: msg.room_id,
            sender_id: msg.user_id,
            message: msg.message,
            created_at: msg.created_at,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMessagesAndUsers();

    // Subscribe to new messages realtime
    const messageSubscription = supabase
      .channel(`public:chat_messages:room_id=eq.${roomId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `room_id=eq.${roomId}` },
        (payload) => {
          const newMessage = payload.new;
          setMessages((msgs) => [...msgs, newMessage]);
          if (!userMap[newMessage.user_id]) {
            // Fetch sender info if not known
            supabase
              .from("users")
              .select("id, full_name, avatar_url")
              .eq("id", newMessage.user_id)
              .single()
              .then(({ data }) => {
                if (data) {
                  setUserMap((u) => ({ ...u, [data.id]: data }));
                }
              });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [roomId, supabase, userMap]);

  async function sendMessage() {
    if (!input.trim() || !currentUserId) return;

    const { error } = await supabase.from("chat_messages").insert([
      {
        room_id: roomId,
        user_id: currentUserId,
        message: input.trim(),
      },
    ]);

    if (error) {
      alert("Failed to send message");
      return;
    }

    setInput("");
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <header className="border-b border-gray-300 py-3 mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chat Room</h2>
        <button
          onClick={() => router.push("/messages")}
          className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
        >
          Back
        </button>
      </header>

      <main className="flex-1 overflow-y-auto border border-gray-300 rounded p-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => {
            const sender = userMap[msg.sender_id];
            const isMe = msg.sender_id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && sender?.avatar_url && (
                  <img
                    src={sender.avatar_url}
                    alt={sender.full_name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {!isMe && (
                    <div className="font-semibold text-sm mb-1">{sender?.full_name}</div>
                  )}
                  <div>{msg.message}</div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {dayjs(msg.created_at).format("HH:mm, DD MMM")}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="mt-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          disabled={!input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
