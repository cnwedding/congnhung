import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// --- THAY THÔNG TIN CỦA BẠN VÀO ĐÂY ---
const supabaseUrl = "https://ftdogihgmtchtyrchcwq.supabase.co";
const supabaseKey = "sb_publishable_oOv2nUm0MfeSO5PHAA8Icg_q6soXBkM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Guestbook() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Lấy danh sách lời chúc từ Database
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // 2. Hàm gửi lời chúc mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !content || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("guestbook")
        .insert([{ name, content }]);

      if (error) throw error;

      // Reset form và load lại danh sách
      setName("");
      setContent("");
      await fetchMessages();
    } catch (error) {
      alert("Không thể gửi lời chúc: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 px-2 relative overflow-hidden bg-transparent">
      <div className="max-w-[400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 uppercase">
            Sổ lưu bút
          </h2>
          <p className="text-[#1b3a68]/70 text-[11px] uppercase tracking-[1px] mb-12">
            Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất đến
            đám cưới của chúng tôi!
          </p>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 p-5 rounded-[40px] shadow-sm mb-8 border border-white/40"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-4 text-[#1b3a68]/40 text-sm italic">
              Bạn đợi xíu nhaaa...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-4 text-[#1b3a68]/40 text-sm italic">
              Hãy là người đầu tiên gửi lời chúc đến chúng tôi nhé!
            </div>
          ) : (
            messages.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/70 border border-[#1b3a68]/10 px-4 py-2 rounded-xl"
              >
                <h4 className="font-bold text-[#1b3a68] text-[16px] font-sans">
                  {item.name}
                </h4>
                <p className="text-[#1b3a68]/40 text-[11px] mb-1 font-sans">
                  {new Date(item.created_at).toLocaleString("vi-VN")}
                </p>
                <p className="text-[#1b3a68]/80 text-[14px] leading-relaxed font-sans">
                  {item.content}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
