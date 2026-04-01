import React from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    date: "10 Tháng 5, 2019",
    title: "Lần Đầu Gặp Gỡ",
    desc: "Chúng mình tình cờ gặp nhau tại một quán cà phê nhỏ. Ánh mắt trao nhau thay cho lời chào, bắt đầu câu chuyện tình yêu.",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "14 Tháng 2, 2020",
    title: "Lời Yêu Đầu Tiên",
    desc: "Vào một ngày Valentine đáng nhớ, lời tỏ tình giản dị nhưng chân thành nhất đã được nói ra.",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "20 Tháng 10, 2024",
    title: "Cầu Hôn",
    desc: "Dưới ánh chiều tà lãng mạn, chiếc nhẫn được trao đi với lời hứa gắn kết mãi mãi.",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "15 Tháng 10, 2026",
    title: "Về Chung Một Nhà",
    desc: "Và chuyến hành trình mới chính thức bắt đầu, với sự chứng kiến của những người thân yêu nhất.",
    img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Story() {
  return (
    <section id="story" className="py-10 px-2 relative z-10 w-full">
      <div className="text-center mb-12">
        <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 text-center uppercase tracking-[1px]">
          Chuyện Tình Yêu
        </h2>
        <div className="w-12 h-px bg-[#1b3a68] mx-auto opacity-30 mt-4"></div>
      </div>

      <div className="relative border-l border-[#1b3a68]/20 ml-4 md:ml-6 space-y-12 pb-8">
        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="relative pl-8"
          >
            {/* Timeline dot */}
            <div className="absolute w-3 h-3 rounded-full bg-[#1b3a68] -left-[6px] top-2 border-[3px] border-white shadow-sm ring-1 ring-[#1b3a68]/20"></div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-white">
              <p className="text-[#1b3a68] font-script tracking-wide text-lg mb-1">
                {item.date}
              </p>
              <h3 className="text-xl font-nvnvalky text-[#1b3a68] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-[13px] leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="rounded-xl overflow-hidden aspect-video shadow-inner">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
