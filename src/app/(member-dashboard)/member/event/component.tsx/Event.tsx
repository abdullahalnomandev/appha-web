"use client";
import { useState } from "react";
import { Calendar, MapPin, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const events = [
  { id: 1, title: "ALPHA Networking Night", date: "Mar 20, 2026", time: "7:00 PM", location: "Burj Al Arab, Dubai", attendees: 45, capacity: 80, description: "Connect with top automotive leaders over dinner.", rsvp: false },
  { id: 2, title: "Luxury Car Rally", date: "Apr 5, 2026", time: "9:00 AM", location: "Yas Marina Circuit, Abu Dhabi", attendees: 60, capacity: 100, description: "Exclusive track day for ALPHA members.", rsvp: false },
  { id: 3, title: "Annual Gala Dinner", date: "May 15, 2026", time: "8:00 PM", location: "Atlantis The Royal, Dubai", attendees: 120, capacity: 200, description: "Black-tie evening celebrating automotive excellence.", rsvp: true },
  { id: 4, title: "Golf Day", date: "Jun 10, 2026", time: "6:30 AM", location: "Emirates Golf Club, Dubai", attendees: 20, capacity: 40, description: "A relaxed day on the greens with fellow members.", rsvp: false },
];

const EventsTab = () => {
  const [eventList, setEventList] = useState(events);

  const handleRSVP = (id: number) => {
    setEventList((prev) => prev.map((e) => (e.id === id ? { ...e, rsvp: true, attendees: e.attendees + 1 } : e)));
    toast.success("RSVP confirmed! See you there.");
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Upcoming Events</h3>
        <p className="text-sm text-white/40">RSVP to exclusive ALPHA events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventList.map((e) => (
          <div key={e.id} className="bg-navy-light rounded-lg border border-white/10 p-5">
            <h4 className="text-white font-semibold mb-1">{e.title}</h4>
            <p className="text-sm text-white/60 mb-3">{e.description}</p>
            <div className="space-y-1.5 text-xs text-white/40 mb-4">
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {e.date} · {e.time}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {e.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> {e.attendees}/{e.capacity} attending</span>
            </div>
            {e.rsvp ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-md w-fit">
                <CheckCircle className="w-3.5 h-3.5" /> RSVP Confirmed
              </span>
            ) : (
              <button
                onClick={() => handleRSVP(e.id)}
                className="text-sm font-medium px-5 py-2 rounded-md text-[black]"
                style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)" }}
              >
                RSVP Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsTab;
