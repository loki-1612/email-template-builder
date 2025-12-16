import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Editor({ block, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("welcome");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!block) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-500 text-sm shadow-sm">
        Select a block to edit
      </div>
    );
  }

  // ================= AI Samples =================
  const aiSamples = {
    welcome: [
      "Welcome to [Company]! We're thrilled to have you here. Let's get you started on the right foot.",
      "Thanks for joining us! Here's everything you need to know to make the most of your account.",
      "You're officially part of the [Company] family. Here's what to explore first.",
      "Great choice! Your account is ready. Let's show you around.",
      "Welcome aboard! We've prepared a quick guide to help you get started today.",
      "Hi there! Thanks for signing up. Here are three things you can do right now.",
    ],
    promotional: [
      "Flash Sale: Save 40% on everything. Today only, no code needed.",
      "New arrival alert! Check out our latest collection before it sells out.",
      "Exclusive offer just for you: Buy one, get one 50% off this weekend.",
      "Spring clearance is here! Up to 60% off select items while supplies last.",
      "Friends & Family Sale: Share this code and save 30% together.",
      "Limited time: Free shipping on all orders over $50. Shop now.",
    ],
    transactional: [
      "Your order #[number] is confirmed and on its way. Track your shipment here.",
      "Password reset requested. Click below to create your new password (link expires in 24 hours).",
      "Payment received! Your invoice and receipt are attached.",
      "Your subscription has been updated. Review your new plan details below.",
      "Action required: Please verify your email address to activate your account.",
      "Delivery update: Your package arrives tomorrow between 2-6 PM.",
    ],
    newsletter: [
      "This month's highlights: new features, customer stories, and tips from our team.",
      "Quick update: We've made some improvements based on your feedback.",
      "What's new in [Month]: product updates, upcoming events, and featured content.",
      "Weekly roundup: Top articles, resources, and insights you might have missed.",
      "Behind the scenes: Meet our team and see what we've been working on.",
      "Your monthly digest: personalized recommendations based on your interests.",
    ],
    event: [
      "You're invited! Join us for an exclusive webinar on [date] at [time].",
      "Save the date: Our annual conference is back. Early bird tickets available now.",
      "Free workshop alert: Learn [topic] with industry experts this Thursday.",
      "VIP access: Be our guest at the [event name] launch party next week.",
      "Live demo session: See our new product in action. Register to reserve your spot.",
      "Join us for coffee & networking: Connect with fellow professionals on [date].",
    ],
    reengagement: [
      "We miss you! It's been a while. Here's 25% off to welcome you back.",
      "Still interested? Your items are waiting in your cart. Complete your order today.",
      "We noticed you haven't logged in lately. Here's what you've been missing.",
      "Come back and save! Exclusive 30% discount for returning customers.",
      "Your account is still active! Rediscover what made you join in the first place.",
      "Let's reconnect: We've added new features we think you'll love.",
    ],
    feedback: [
      "How did we do? Share your thoughts and help us improve your experience.",
      "Got 2 minutes? Tell us what you think and enter to win a $50 gift card.",
      "Your opinion matters: Quick survey about your recent purchase.",
      "Help us serve you better: Share your feedback and shape our future.",
      "Rate your experience: Let us know how we can improve.",
      "Customer survey: Answer 5 questions and get 10% off your next order.",
    ],
    announcement: [
      "Big news! We're launching something special and you're the first to know.",
      "Important update regarding your account: Here's what's changing and why it matters.",
      "Exciting changes ahead: We're upgrading our platform for a better experience.",
      "New partnership announcement: Expanding our services to serve you better.",
      "We're growing! Opening new locations in [city]. Grand opening next month.",
      "Product update: Version 2.0 is live with features you've been requesting.",
    ],
  };

  const options = Object.keys(aiSamples);

  // ================= AI Generator =================
  const generateAIText = () => {
    setLoading(true);
    setTimeout(() => {
      const list = aiSamples[category];
      const text = list[Math.floor(Math.random() * list.length)];
      onUpdate(text);
      setLoading(false);
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-md"
    >
      <h2 className="text-lg font-semibold text-slate-800">Edit Block</h2>

      {/* TEXT BLOCK */}
      {block.type === "text" && (
        <>
          <textarea
            value={block.content}
            disabled={loading}
            onChange={(e) => onUpdate(e.target.value)}
            className="w-full min-h-[120px] resize-none rounded-xl
              border border-slate-300 bg-slate-50 p-4 text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-200
              focus:border-indigo-500"
          />

          {/* CUSTOM DROPDOWN */}
          <div ref={dropdownRef} className="relative">
            <motion.button
              onClick={() => setOpen((p) => !p)}
              className="w-full flex items-center justify-between
                rounded-xl border border-slate-300 bg-slate-50
                px-4 py-2.5 text-sm shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <span className="capitalize">{category}</span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 w-full
                    rounded-xl border border-slate-200 bg-white
                    shadow-lg overflow-hidden z-50"
                >
                  {options.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setCategory(opt);
                        setOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer capitalize transition
                        ${
                          category === opt
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "hover:bg-slate-100"
                        }`}
                    >
                      {opt.replace("-", " ")}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* AI BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateAIText}
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600
              text-white font-medium shadow hover:bg-indigo-700
              disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </motion.button>
        </>
      )}

      {/* IMAGE BLOCK */}
      {block.type === "image" && (
        <input
          type="text"
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-full rounded-lg border p-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Image URL"
        />
      )}

      {/* BUTTON BLOCK */}
      {block.type === "button" && (
        <input
          type="text"
          value={block.content}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-full rounded-lg border p-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Button text"
        />
      )}
    </motion.div>
  );
}
