import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.webp";
import chureImg from "../assets/chure.webp";
import codauImg from "../assets/codau.webp";

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full flex flex-col items-center pb-12 overflow-hidden relative z-10 pt-safe"
    >
      {/* Cover Image */}
      <div className="w-full h-auto aspect-[43/76] relative shadow-md">
        <img
          src={heroImg}
          alt="Cover"
          className="w-full h-full object-cover object-center"
          fetchpriority="high"
          loading="eager"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(86, 57, 27, 0), rgb(24, 52, 105))",
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white z-10"
        >
          <div className="flex flex-col items-center justify-center mb-4 w-full">
            <div className="flex items-center gap-3 w-full ml-10">
              <h1 className="text-[clamp(80px,8vw,86px)] leading-[1] font-bigbang tracking-widest font-light drop-shadow-lg drop-shadow-white/20">
                CÔNG
              </h1>
              <img
                src="https://w.ladicdn.com/s400x400/649340684a3700001217851c/trai-tim-6-20250826162932-fwk2r.png"
                alt="heart"
                className="w-[clamp(80px,8vw,86px)] h-auto object-contain"
              />
            </div>
            <h1 className="w-full text-right mr-8 text-[clamp(80px,8vw,86px)] leading-[1] font-bigbang tracking-widest font-light drop-shadow-lg drop-shadow-white/20">
              NHUNG
            </h1>
          </div>
          <p
            className="tracking-[1px] text-[20px] text-[#1b3a68] font-bigbang font-bold absolute top-0"
            style={{
              top: "30px",
            }}
          >
            Welcome to our wedding
          </p>
          <p className="tracking-[1px] text-[20px] text-[#ffffffd1] font-bigbang absolute bottom-5">
            24.05.2026
          </p>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="px-8 py-10 text-center z-1"
      >
        <p className="font-script text-[clamp(24px,6vw,28px)] leading-8 text-[#1b3a68] italic opacity-80">
          "I have loved you for a thousand years,
          <br />
          I'll love you for a thousand more."
        </p>
      </motion.div>

      {/* Groom & Bride Section */}
      <div className="w-full flex flex-col gap-12 mt-4 relative z-10">
        {/* Groom */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between gap-1"
        >
          <div className="text-start flex flex-col w-[45%] mt-[-50px] z-10 px-2">
            <p className="font-script text-[36px] leading-[1] text-[#1b3a68] mb-1">
              Chú rể
            </p>
            <h2 className="text-[clamp(38px,8vw,42px)] text-start ml-[30px] tracking-normal leading-[1] font-bigbang text-[#1b3a68] uppercase">
              Minh Công
            </h2>
          </div>
          <div className="flex-1 right-box">
            <div className="bg-white p-2 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform rotate-3 inline-block w-[235px] max-w-[55vw]">
              <img
                src={chureImg}
                alt="Groom"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Bride */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mt-[-120px]"
        >
          <div className="flex-1 left-box flex justify-end">
            <div className="bg-white p-2 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform -rotate-3 inline-block w-[235px] max-w-[55vw]">
              <img
                src={codauImg}
                alt="Bride"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-left flex-1 z-10 px-2">
            <p className="font-script text-[36px] ml-[70px] leading-[1] text-[#1b3a68] mb-1">
              Cô dâu
            </p>
            <h2 className="text-[clamp(38px,8vw,42px)] tracking-normal leading-[1] font-bigbang text-[#1b3a68] uppercase">
              Phương Nhung
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Parents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 text-[#1b3a68] flex justify-center w-full max-w-[400px] font-nvnvalky text-[clamp(14px,3.5vw,15px)]"
      >
        <div className="flex-1 text-right border-r border-[#1b3a68]/30 pr-2 md:pr-6">
          <p className="font-bold mb-3 uppercase tracking-widest text-[#1b3a68]/80">
            Nhà Trai
          </p>
          <p className="mb-1 font-bigbang">Ông: Ngô Văn Kiệm</p>
          <p className="font-bigbang">Bà: Khúc Thị Liên</p>
        </div>
        <div className="flex-1 text-left pl-2">
          <p className="font-bold mb-3 uppercase tracking-widest text-[#1b3a68]/80">
            Nhà Gái
          </p>
          <p className="mb-1 font-bigbang">Ông: Trần Ngọc Giản</p>
          <p className="font-bigbang">Bà: Phạm Thị Nguyệt</p>
        </div>
      </motion.div>
      <img
        src="https://w.ladicdn.com/s650x650/649340684a3700001217851c/hoa-tang-20250825073356-yyt-h.png"
        alt=""
        className="absolute object-cover z-0 w-[clamp(231.2px,60vw,271.2px)] h-[clamp(231.2px,60vw,271.2px)]"
        style={{
          transform: "rotate(52deg)",
          opacity: 0.8,
          bottom: "625px",
          left: "-49px",
        }}
      />
      <img
        src="https://w.ladicdn.com/s650x650/649340684a3700001217851c/hoa-tang-20250825073356-yyt-h.png"
        alt=""
        className="absolute object-cover z-0"
        style={{
          width: "312.2px",
          height: "312.2px",
          transform: "perspective(1000px) rotate(-44deg) rotateY(180deg)",
          opacity: 0.8,
          bottom: "50px",
          left: "182px",
        }}
      />
    </section>
  );
}
