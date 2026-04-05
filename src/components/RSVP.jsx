import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// --- SUPABASE CONFIG ---
const supabaseUrl = "https://ftdogihgmtchtyrchcwq.supabase.co";
const supabaseKey = "sb_publishable_oOv2nUm0MfeSO5PHAA8Icg_q6soXBkM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    
    try {
      const { error } = await supabase.from("rsvp").insert([
        {
          fullName: formData.name,
          attend: formData.attending === "yes" ? "YES" : "NO",
          guestNumber: formData.guests,
        },
      ]);
      
      if (error) throw error;
      
      setFormData({
        name: "",
        attending: "yes",
        guests: "1",
      });
      setMessage("Gửi phản hồi thành công");
      
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      alert("Không thể gửi phản hồi: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-10 px-2 relative   w-full">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-titleSection tracking-[1px] font-nvnvalky text-[#1b3a68] mb-2 uppercase"
        >
          Xác Nhận Tham Dự
        </motion.h2>
        <p className="text-[#1b3a68]/70 text-[11px] uppercase tracking-widest mb-4">
          Vui lòng phản hồi trước 01.09.2026
        </p>
        <div className="w-12 h-px bg-[#1b3a68] mx-auto opacity-30 mt-4"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-white"
      >
        <form onSubmit={handleSubmit} className="space-y-5 relative">
          {message && (
            <div className="p-3 bg-[#e6f4ea] text-[#1e4620] rounded-xl text-center text-[13px] font-bold border border-[#ceead6] shadow-sm mb-4">
              {message}
            </div>
          )}
          <div>
              <label
                htmlFor="name"
                className="block text-[11px] font-bold uppercase tracking-widest text-[#1b3a68]/80 mb-2"
              >
                Họ & Tên
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white border border-[#1b3a68]/10 p-4 outline-none focus:ring-1 focus:ring-[#1b3a68]/50 transition-shadow rounded-xl text-gray-700 text-sm shadow-inner"
                placeholder="Nhập tên của bạn..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#1b3a68]/80 mb-2">
                Bạn sẽ tham dự chứ?
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-xl border border-transparent hover:border-[#1b3a68]/20 transition-colors shadow-sm">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={(e) =>
                      setFormData({ ...formData, attending: e.target.value })
                    }
                    className="accent-[#1b3a68] w-4 h-4"
                  />
                  <span className="text-[13px] text-gray-700 font-medium">
                    Có, Mình sẽ đến!
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-xl border border-transparent hover:border-[#1b3a68]/20 transition-colors shadow-sm">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={(e) =>
                      setFormData({ ...formData, attending: e.target.value })
                    }
                    className="accent-[#1b3a68] w-4 h-4"
                  />
                  <span className="text-[13px] text-gray-700 font-medium tracking-tight">
                    Tiếc quá, mình không thể tham dự
                  </span>
                </label>
              </div>
            </div>

            {formData.attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <label
                  htmlFor="guests"
                  className="block text-[11px] font-bold uppercase tracking-widest text-[#1b3a68]/80 mb-2 mt-4"
                >
                  Số Lượng Khách Đi Cùng
                </label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full bg-white border border-[#1b3a68]/10 p-4 outline-none focus:ring-1 focus:ring-[#1b3a68]/50 transition-shadow rounded-xl text-gray-700 text-sm cursor-pointer shadow-inner appearance-none relative"
                >
                  <option value="1">1 Người (Chỉ mình tôi)</option>
                  <option value="2">2 Người</option>
                  <option value="3">3 Người</option>
                  <option value="4">4 Người</option>
                  <option value="5">5 Người</option>
                </select>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1b3a68] text-white py-4 font-nvnvalky text-lg tracking-wider hover:bg-opacity-90 shadow-[0_4px_15px_rgb(27,58,104,0.3)] transition-all duration-300 mt-6 rounded-xl relative overflow-hidden group disabled:opacity-70"
            >
              <span className="relative z-10">{isSubmitting ? "Đang gửi..." : "Gửi Phản Hồi"}</span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </form>
      </motion.div>
    </section>
  );
}
