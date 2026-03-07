"use client";
import { Bell, Gift, Calendar, Info } from "lucide-react";

const notifications = [
  { id: 1, type: "offer", title: "New Offer: 20% Off at AutoSpa", message: "A new detailing offer is available for you.", time: "1 hour ago", read: false },
  { id: 2, type: "event", title: "Event Reminder: Networking Night", message: "ALPHA Networking Night is in 3 days. Don't forget to RSVP!", time: "5 hours ago", read: false },
  { id: 3, type: "info", title: "Membership Renewed", message: "Your ALPHA membership has been renewed for another year.", time: "2 days ago", read: true },
  { id: 4, type: "offer", title: "Special Offer: Free Gym Trial", message: "FitPro Gym is offering 1 month free membership.", time: "3 days ago", read: true },
  { id: 5, type: "event", title: "New Event: Luxury Car Rally", message: "An exciting track day at Yas Marina Circuit has been announced.", time: "1 week ago", read: true },
];

const iconMap = {
  offer: Gift,
  event: Calendar,
  info: Info,
};

const NotificationsTab = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-bold text-white">Notifications</h3>
      <p className="text-sm text-white/40">Stay updated with offers, events, and announcements</p>
    </div>

    <div className="space-y-3">
      {notifications.map((n) => {
        const Icon = iconMap[n.type as keyof typeof iconMap] || Bell;
        return (
          <div
            key={n.id}
            className={`bg-navy-light rounded-lg border p-4 flex items-start gap-4 ${
              n.read ? "border-white/5" : "border-[#DFBB0B]/30 "
            }`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-white/5" : "bg-amber/10"}`}>
              <Icon className={`w-4 h-4 ${n.read ? "text-white/40" : "text-amber"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`text-sm font-semibold ${n.read ? "text-white/60" : "text-white"}`}>{n.title}</h4>
                {!n.read && <span className="w-2 h-2 rounded-full bg-amber shrink-0" />}
              </div>
              <p className="text-xs text-white/40 mt-0.5">{n.message}</p>
              <span className="text-xs text-white/30 mt-1 block">{n.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default NotificationsTab;
