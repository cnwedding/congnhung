import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Lễ Vu Quy",
    time: "09h00 - Thứ Hai",
    date: "18.05.2026",
    lunarDate: "(Tức ngày 02 Tháng 04 Năm Bính Ngọ)",
    venueName: "TƯ GIA NHÀ GÁI",
    address: "Thôn Hưng Cường - Xã Vĩnh Bảo - TP Hải Phòng",
    mapLabel: "https://maps.app.goo.gl/ir563e6gGskysNVVA",
  },
  {
    title: "Lễ Cưới Nhà Gái",
    time: "08h30 - Chủ Nhật",
    date: "24.05.2026",
    lunarDate: "(Tức ngày 08 Tháng 04 Năm Bính Ngọ)",
    venueName: "NHÀ HÀNG TIỆC CƯỚI",
    address: "Thôn Hưng Cường - Xã Vĩnh Bảo - TP Hải Phòng",
    mapLabel: "https://maps.app.goo.gl/ir563e6gGskysNVVA",
  },
  {
    title: "Lễ Cưới Nhà Trai",
    time: "08h00 - Chủ Nhật",
    date: "24.05.2026",
    lunarDate: "(Tức ngày 08 Tháng 04 Năm Bính Ngọ)",
    venueName: "TƯ GIA NHÀ TRAI",
    address: "Thôn Hạ Đồng - Xã Thuỵ Anh - Tỉnh Hưng Yên",
    mapLabel: "https://maps.app.goo.gl/ZVe5ouPv62o8cGjk8",
  },
];

export default function EventDetails() {
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const guestName = urlParams.get("name") || "Bạn & Người thương";

  const pathname =
    typeof window !== "undefined"
      ? window.location.pathname.toLowerCase()
      : "/";

  let displayEvents = events;
  if (pathname === "/cong") {
    displayEvents = [events[0], events[2]];
  } else if (pathname === "/nhung") {
    displayEvents = [events[0], events[1]];
  }

  return (
    <section
      id="event"
      className="py-10 px-0 relative z-10 w-full overflow-hidden"
    >
      <div className="text-center mb-0 relative">
        <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] uppercase tracking-[1px] leading-[46px]">
          Trân trọng
        </h2>
        <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 uppercase tracking-[1px] leading-[46px]">
          kính mời
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center mt-8 mb-8"
      >
        <div className="relative">
          <span className="font-nvnvalky tracking-[1px] text-[clamp(32px,6vw,36px)] text-[#a60606] leading-tight block">
            {guestName}
          </span>
        </div>
        <div className="flex flex-col items-center mt-8 space-y-1">
          <p className="text-[#1b3a68]/80 text-[14px] leading-relaxed max-w-[320px] font-sans">
            Đến dự bữa tiệc thân mật mừng hạnh phúc
          </p>
          <p className="text-[#1b3a68]/80 text-[14px] leading-relaxed max-w-[320px] font-sans">
            cùng gia đình chúng tôi
          </p>
        </div>
      </motion.div>

      <div className="space-y-12 pb-12">
        {displayEvents.map((event, idx) => {
          const isRight = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isRight ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 10 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="relative w-full"
            >
              {/* Title Section */}
              <div
                className={`flex w-full ${isRight ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`bg-[#1b3a68] text-white font-nvnvalky uppercase px-8 py-3 text-[24px] tracking-widest shadow-md ${
                    isRight ? "rounded-l-full" : "rounded-r-full"
                  }`}
                >
                  {event.title}
                </div>
              </div>

              {/* Date & Time Info */}
              <div
                className={`px-6 mt-4 font- flex gap-4 ${isRight ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Vertical Line */}
                <div className="w-[1.5px] bg-[#1b3a68] self-stretch rounded-full opacity-80 shrink-0"></div>

                {/* Text Container */}
                <div
                  className={`flex flex-col justify-center gap-1 ${isRight ? "items-end text-right" : "items-start text-left"}`}
                >
                  <p className="text-[#1b3a68] font-bold text-[16px] tracking-wide font-sans">
                    {event.time}
                  </p>
                  <p className="text-[#1b3a68] font-bold text-[16px] tracking-wide font-sans">
                    {event.date}
                  </p>
                  <p className="text-[#1b3a68]/90 text-[14px] font-sans italic mt-1">
                    {event.lunarDate}
                  </p>
                </div>
              </div>

              {/* Venue Container */}
              <div className="px-12 mt-6">
                <div className="border-[1.5px] border-[#1b3a68] rounded-[20px] px-6 py-4 text-center relative bg-transparent shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[#1b3a68] font-medium text-[16px] mb-2 leading-relaxed uppercase tracking-wide">
                    TẠI: {event.venueName}
                  </p>
                  <p className="text-[#1b3a68] text-[14px] uppercase tracking-wide leading-relaxed">
                    {event.address}
                  </p>

                  <div className="mt-3">
                    <a
                      href={event.mapLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-2 bg-[#1b3a68] text-white text-[12px] font-bold uppercase tracking-widest rounded-full hover:bg-opacity-90 transition-colors shadow-md"
                    >
                      XEM CHỈ ĐƯỜNG
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
