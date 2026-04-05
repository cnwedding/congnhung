import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift, MessageCircle, X, ChevronUp } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import giftBox from "../assets/gift-box.png";
import tiktok from "../assets/tiktok.webp";
import codauGiftImg from "../assets/codaugift.webp";
import chureGiftImg from "../assets/churegift.webp";
import { heartIcon } from "./GiftIcon";

// --- SUPABASE CONFIG ---
const supabaseUrl = "https://ftdogihgmtchtyrchcwq.supabase.co";
const supabaseKey = "sb_publishable_oOv2nUm0MfeSO5PHAA8Icg_q6soXBkM";
const supabase = createClient(supabaseUrl, supabaseKey);

const HeartFlash = ({ id, onComplete }) => {
  const randomX = Math.random() * 80 - 40; // -40 to 40
  const randomRotate = Math.random() * 30 - 15;
  return (
    <motion.span
      initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -250,
        x: randomX,
        scale: [0.5, 1.2, 1, 0.8],
        rotate: [0, randomRotate, -randomRotate, 0],
      }}
      transition={{ duration: 2, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(id)}
      className="absolute bottom-16 right-4 text-red-400 pointer-events-none z-50 shadow-red-400/50"
    >
      <Heart fill="currentColor" size={24} />
    </motion.span>
  );
};

export default function TikTokStream() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [likes, setLikes] = useState(113);
  const [showGiftMenuModal, setShowGiftMenuModal] = useState(false);
  const [selectedGiftFamily, setSelectedGiftFamily] = useState(null);

  const giftFamilies = [
    {
      id: "gai",
      name: "Gửi quà cô dâu",
      qrUrl:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MungCuoiNhaGai",
      image: codauGiftImg,
    },
    {
      id: "trai",
      name: "Gửi quà chú rể",
      qrUrl:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MungCuoiNhaTrai",
      image: chureGiftImg,
    },
  ];

  const [allMessages, setAllMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const messageIndexRef = React.useRef(0);

  // Message Form State
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setAllMessages(data.reverse());
      }
    } catch (err) {
      console.error("Fetch errors:", err);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Initialize visible messages when data first loads
  useEffect(() => {
    if (allMessages.length === 0) return;
    const initial = allMessages
      .slice(0, Math.min(5, allMessages.length))
      .map((m, i) => ({
        ...m,
        _key: `${m.id ?? m.created_at}-init-${i}`,
      }));
    setVisibleMessages(initial);
    messageIndexRef.current = initial.length % allMessages.length;
  }, [allMessages.length > 0 ? allMessages[0]?.id : null]); // only on first real load

  // Cycle: every 2s push next message in, remove the oldest if > 5
  useEffect(() => {
    if (allMessages.length === 0) return;
    const timer = setInterval(() => {
      const idx = messageIndexRef.current;
      const next = allMessages[idx % allMessages.length];
      messageIndexRef.current = (idx + 1) % allMessages.length;
      setVisibleMessages((prev) => {
        const updated = [
          ...prev,
          { ...next, _key: `${next.id ?? next.created_at}-${Date.now()}` },
        ];
        return updated.slice(-5);
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [allMessages]);

  const addHeart = () => {
    const id = Date.now();
    setHearts((prev) => [...prev, id]);
    setLikes((l) => l + 1);
  };

  const removeHeart = (id) => {
    setHearts((prev) => prev.filter((h) => h !== id));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!name || !content || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("guestbook")
        .insert([{ name, content }]);

      if (error) throw error;

      setName("");
      setContent("");
      setShowMessageModal(false);
      await fetchMessages();

      // Flash a heart for success
      addHeart();
    } catch (error) {
      alert("Không thể gửi lời chúc: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute backdrop-blur-0 inset-x-0 bottom-0 z-50 pointer-events-none h-screen flex flex-col justify-end">
      {/* Comments Overlay - hidden when minimized */}
      {!isMinimized && (
        <div className="relative h-[164px] w-full overflow-hidden px-4 flex flex-col justify-end gap-2 pb-2">
          {/* <div className="absolute top-0 left-0 right-0 h-full pointer-events-none bg-gradient-to-b from-black/20 to-transparent"></div> */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div> */}
          <div className="relative h-[164px] max-w-[285px] overflow-hidden flex flex-col justify-end gap-2">
            <AnimatePresence initial={false}>
              {visibleMessages.map((comment) => (
                <motion.div
                  key={comment._key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-[#1b3a68]/70 rounded-2xl px-2.5 py-0.5 flex flex-col items-start justify-center w-fit shrink-0"
                >
                  <span className="text-white text-[13px] block break-words">{`${comment.name}`}</span>
                  <p className="text-white font-bold text-[13px] block break-words">
                    <span className="leading-relaxed">{comment.content}</span>
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Hearts Overlay */}
      <AnimatePresence>
        {hearts.map((id) => (
          <HeartFlash key={id} id={id} onComplete={removeHeart} />
        ))}
      </AnimatePresence>

      {/* Bottom Interface Bar - hidden when minimized */}
      {!isMinimized && (
        <div className="pointer-events-auto p-4 pb-6 pt-2 w-full max-w-[430px] mx-auto flex items-end gap-2 justify-between">
          <button
            onClick={() => setShowMessageModal(true)}
            className="bg-[#0000004d] backdrop-blur-md rounded-full px-2.5 py-2 pr-4 text-white/90 text-sm flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Gửi lời chúc...
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={addHeart}
              className="flex flex-col items-center group relative translate-y-[-1px]"
            >
              <div className="bg-[#0000004d] backdrop-blur-md rounded-full p-2 shadow-lg group-active:scale-90 transition-transform">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  {heartIcon}
                </motion.div>
              </div>
            </button>
            <button
              onClick={() => setShowGiftMenuModal(true)}
              className="flex flex-col items-center group"
            >
              <div className="bg-[#0000004d] backdrop-blur-md rounded-full p-2 border border-white/20 shadow-lg group-active:scale-90 transition-transform">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <img src={giftBox} alt="" width={20} height={20} />
                </motion.div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Pill + Gift box — always absolute at bottom-right */}
      <div
        className={`absolute right-4 flex flex-col items-center gap-2 pointer-events-auto ${isMinimized ? "bottom-6" : "bottom-[78px]"}`}
      >
        {/* Pill: avatar image on top, X or hamburger on bottom */}
        <button
          onClick={() => setIsMinimized((v) => !v)}
          className="flex flex-col items-center bg-[#1b3a68cc] rounded-full shadow-lg active:scale-90 transition-transform overflow-hidden"
        >
          <div className="w-[34px] h-[34px] m-[1px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src={tiktok}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {isMinimized ? (
            <div className="flex flex-col items-center gap-[3px] p-[10px] pb-[11px]">
              <span className="block w-[16px] h-[3px] bg-white rounded-full"></span>
              <span className="block w-[16px] h-[3px] bg-white rounded-full"></span>
              <span className="block w-[16px] h-[3px] bg-white rounded-full"></span>
            </div>
          ) : (
            <div className="flex items-center justify-center p-[7px]">
              <X className="text-white" size={22} />
            </div>
          )}
        </button>
      </div>

      {/* Message Modal (Bottom Sheet style) */}
      <AnimatePresence>
        {showMessageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMessageModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[110] pointer-events-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 z-[120] bg-white rounded-t-[32px] p-6 pb-10 pointer-events-auto max-w-[430px] mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Gửi lời chúc
                </h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn*"
                  className="w-full bg-white border border-[#1b3a68]/10 p-4 outline-none focus:ring-1 focus:ring-[#1b3a68]/50 transition-shadow rounded-xl text-gray-700 text-sm shadow-inner"
                  required
                  disabled={isSubmitting}
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập lời chúc của bạn*"
                  rows={3}
                  className="w-full bg-white border border-[#1b3a68]/10 p-4 outline-none focus:ring-1 focus:ring-[#1b3a68]/50 transition-shadow rounded-xl text-gray-700 text-sm shadow-inner"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1b3a68] text-white py-4 font-nvnvalky text-lg tracking-wider hover:bg-opacity-90 shadow-[0_4px_15px_rgb(27,58,104,0.3)] transition-all duration-300 mt-6 rounded-xl relative overflow-hidden group"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Gift Menu Modal (Bottom Sheet) */}
      <AnimatePresence>
        {showGiftMenuModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGiftMenuModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[110] pointer-events-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 z-[120] bg-white rounded-t-[32px] p-6 pb-10 pointer-events-auto max-w-[430px] mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#1b3a68]">Tặng quà</h3>
                <button
                  onClick={() => setShowGiftMenuModal(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex gap-3">
                {giftFamilies.map((family) => (
                  <button
                    key={family.id}
                    onClick={() => {
                      setShowGiftMenuModal(false);
                      setSelectedGiftFamily(family);
                    }}
                    className="flex flex-col items-center gap-1 bg-gray-50 border border-gray-100 p-3 rounded-2xl w-full text-left active:scale-[0.98] transition-transform"
                  >
                    <img
                      src={family.image}
                      alt={family.name}
                      className="w-[100px] h-[100px] object-cover rounded-full border border-gray-200 shadow-sm"
                    />
                    <p className="text-gray-500 text-[16px] mt-0.5">
                      {family.name}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Code Modal for specific family */}
      <AnimatePresence>
        {selectedGiftFamily && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGiftFamily(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] p-8 w-full max-w-[340px] relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedGiftFamily(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full z-10"
              >
                <X size={20} />
              </button>
              <div className="text-center mt-2">
                <h3 className="text-[24px] font-nvnvalky text-[#1b3a68] mb-1">
                  {selectedGiftFamily.name === "Gửi quà cô dâu"
                    ? "Nhà Gái"
                    : "Nhà Trai"}
                </h3>
                <div className="bg-gray-50 p-5 rounded-[30px] border border-gray-100 mb-6 aspect-square max-w-[220px] mx-auto flex items-center justify-center relative shadow-inner">
                  <img
                    src={selectedGiftFamily.qrUrl}
                    alt="QR Mừng Cưới"
                    className="w-full h-full object-contain rounded-xl mix-blend-multiply"
                  />
                  <div className="absolute inset-0 border-[12px] border-white/50 rounded-[30px] pointer-events-none" />
                </div>
                <p className="text-[11px] text-gray-400 italic">
                  * Vui lòng quét mã QR để gửi quà mừng cưới đến gia đình chúng
                  mình.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
