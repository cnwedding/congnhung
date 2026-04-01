import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GiftIcon from "./GiftIcon";

export default function Gifting() {
  const [selectedFamily, setSelectedFamily] = useState(null);

  const families = [
    {
      id: "trai",
      name: "Nhà Trai",
      qrUrl:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MungCuoiNhaTrai", // Placeholder
      description: "Mừng cưới cho Chú rể",
    },
    {
      id: "gai",
      name: "Nhà Gái",
      qrUrl:
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MungCuoiNhaGai", // Placeholder
      description: "Mừng cưới cho Cô dâu",
    },
  ];

  return (
    <section className="py-10 px-2 relative overflow-hidden bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[400px] mx-auto text-center"
      >
        <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 uppercase">
          Hộp mừng cưới
        </h2>
        <p className="text-[#1b3a68]/70 text-[11px] uppercase tracking-[1px] mb-1">
          Cảm ơn tình cảm của mọi người
        </p>
        <p className="text-[#1b3a68]/70 text-[11px] uppercase tracking-[1px] mb-12">
          đã dành cho chúng mình!
        </p>

        <div className="flex justify-center gap-8 px-4">
          {families.map((family) => (
            <motion.div
              key={family.id}
              whileHover={{
                scale: 1.1,
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFamily(family)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-[140px] h-[140px] rounded-[30px] border-2 border-[#1b3a68] p-4 flex items-center justify-center bg-white/50 group-hover:bg-white transition-all duration-500 relative mb-4 shadow-lg group-hover:shadow-2xl group-hover:border-[#1b3a68]">
                <motion.div
                  animate={{
                    y: [0],
                    rotate: [-2, 2, -2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full"
                >
                  <GiftIcon className="w-full h-full object-contain drop-shadow-md" />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1b3a68] rounded-full animate-pulse shadow-lg ring-4 ring-[#1b3a68]/10 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div className="absolute -bottom-2 px-3 py-1 bg-[#1b3a68] text-white text-[8px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-bold">
                  Bấm để xem
                </div>
              </div>
              <span className="text-[20px] font-nvnvalky text-[#1b3a68] group-hover:text-[#1b3a68]/80 transition-colors">
                {family.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedFamily && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFamily(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-[340px] relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedFamily(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 p-2 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="text-center mt-4">
                <h3 className="text-[24px] font-nvnvalky text-[#1b3a68] mb-1">
                  {selectedFamily.name}
                </h3>
                <p className="text-gray-500 text-xs mb-8">
                  {selectedFamily.description}
                </p>

                <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100 mb-8 aspect-square flex items-center justify-center relative shadow-inner">
                  <img
                    src={selectedFamily.qrUrl}
                    alt="QR Code"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 border-[12px] border-white/50 rounded-[30px] pointer-events-none" />
                </div>

                <p className="text-[11px] text-gray-400 italic font-light px-4">
                  * Vui lòng quét mã QR để gửi quà mừng cưới đến gia đình chúng
                  mình.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
