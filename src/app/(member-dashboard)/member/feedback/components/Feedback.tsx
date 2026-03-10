"use client";
import { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

const FeedbackTab = () => {
  const [rating, setRating] = useState(0);
  const [partner, setPartner] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !partner || !message) {
      toast.error("Please fill all fields and select a rating.");
      return;
    }
    toast.success("Feedback submitted! Thank you for helping us improve.");
    setRating(0);
    setPartner("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Share Your Feedback</h3>
        <p className="text-sm text-white/40">Help us and our partners deliver a better experience</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-navy-light rounded-lg border border-white/10 p-6 space-y-5 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Partner / Service</label>
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="w-full bg-navy border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber/50"
          >
            <option value="">Select a partner</option>
            <option value="AutoSpa Detailing">AutoSpa Detailing</option>
            <option value="Azure Beach Club">Azure Beach Club</option>
            <option value="FitPro Gym">FitPro Gym</option>
            <option value="La Maison Restaurant">La Maison Restaurant</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setRating(s)}
                className="p-1"
              >
                <Star className={`w-6 h-6 transition-colors ${s <= rating ? "text-yellow-400 fill-current" : "text-white/20"}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Your Feedback</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Share your experience..."
            className="w-full bg-navy border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber/50 resize-none"
          />
        </div>

        <button
          type="submit"
          className="text-sm font-medium px-6 py-2.5 rounded-md text-[black] whitespace-nowrap cursor-pointer"
          style={{ background: "linear-gradient(180deg, #FCEFAE 0%, #DFBB0B 100%)" }}
        >
          <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Submit Feedback</span>
        </button>
      </form>
    </div>
  );
};

export default FeedbackTab;
