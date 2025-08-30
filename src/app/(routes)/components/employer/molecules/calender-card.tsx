"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const events = [
  {
    title: "Meeting with VP",
    date: "Today",
    time: "10:00 - 11:00",
    platform: "Google Meet",
    avatars: [
      "https://randomuser.me/api/portraits/women/68.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/32.jpg",
    ],
    extraCount: 2,
  },
];

export default function ScheduleCard() {
  return (
    <div className="w-full  bg-white rounded-sm border border-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800 text-xs">Calendar</h2>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-900">July</span>
          <FiChevronLeft className="w-4 h-4 text-gray-500 cursor-pointer" />
          <FiChevronRight className="w-4 h-4 text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mb-4">
        {[
          "Fri 04",
          "Sat 05",
          "Sun 06",
          "Mon 07",
          "Tue 08",
          "Wed 09",
          "Thu 10",
        ].map((day, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-1 rounded-md ${
              day.includes("Mon 07") ? "bg-pink-600 text-white" : ""
            }`}
          >
            {day.split(" ")[0]}
            <span className="font-semibold text-[10px]">
              {day.split(" ")[1]}
            </span>
          </div>
        ))}
      </div>

      {/* Event Card */}
      {events.map((event, idx) => (
        <div
          key={idx}
          className="bg-purple-50 rounded-xl p-4 mb-3  hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-800 text-xs">{event.title}</h3>
          <p className="text-[10px] text-gray-500 mt-1">
            {event.date} • {event.time}
          </p>

          {/* Platform */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mt-2 px-1.5 py-0.5 rounded-full bg-white shadow-sm ">
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-meet-1024.png"
                alt="platform"
                className="w-4 h-4"
              />
              <span className="text-[10px] text-gray-600">
                {event.platform}
              </span>
            </div>

            <div className="flex -space-x-2 mt-3">
              {event.avatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
              {event.extraCount > 0 && (
                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-600 text-[10px] rounded-full border-2 border-white">
                  +{event.extraCount}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
