import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/story1.webp";
import img2 from "../assets/story2.webp";
import img3 from "../assets/story3.webp";
import img4 from "../assets/story4.webp";
import music1 from "../assets/tungayemden.m4a";
import music2 from "../assets/chicanminhconhau.m4a";
import music3 from "../assets/ngaynaynguoicongainay.m4a";
import music4 from "../assets/50namvesau.m4a";

const StoryMusicControl = ({ musicSrc, id }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleGlobalPlay = (e) => {
      if (isPlaying && e.detail !== id) {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("global-play", handleGlobalPlay);
    return () => window.removeEventListener("global-play", handleGlobalPlay);
  }, [isPlaying, id]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent("global-pause", { detail: id }));
    } else {
      window.dispatchEvent(new CustomEvent("global-play", { detail: id }));
      audioRef.current?.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    window.dispatchEvent(new CustomEvent("global-pause", { detail: id }));
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      {/* Progress Bar & Date */}
      <div className="mt-2 mb-3 px-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] w-6 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-1.5 bg-white/30 rounded-full relative backdrop-blur-sm overflow-hidden border border-white/20">
            <div
              className="absolute left-0 top-0 h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] w-6 text-left">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 px-4 py-1 relative">
        <button className="text-white hover:text-gray-300 transition-colors">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-md"
          >
            <polygon points="11,18 3,12 11,6" />
            <polygon points="21,18 13,12 21,6" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="text-white hover:scale-110 transition-transform"
        >
          {isPlaying ? (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-md"
            >
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-md relative left-[2px]"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <button className="text-white hover:text-gray-300 transition-colors">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-md"
          >
            <polygon points="3,18 11,12 3,6" />
            <polygon points="13,18 21,12 13,6" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default function Story() {
  return (
    <section id="story" className="py-10 px-2 relative z-10 w-full">
      <div className="text-center mb-12">
        <h2 className="text-titleSection font-nvnvalky text-[#1b3a68] mb-2 text-center uppercase tracking-[1px]">
          Chuyện Chúng Mình
        </h2>
        <div className="w-12 h-px bg-[#1b3a68] mx-auto opacity-30 mt-4"></div>
      </div>

      <div className="relative border-l border-[#1b3a68]/20 ml-2 space-y-12 pb-8">
        {/* Khối 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0 }}
          className="relative pl-4"
        >
          <div className="absolute w-3 h-3 rounded-full bg-[#1b3a68] -left-[6px] top-2 border-[3px] border-white shadow-sm ring-1 ring-[#1b3a68]/20"></div>
          <div className="relative aspect-square w-full rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-white/40 overflow-hidden group flex flex-col justify-end">
            <img
              src={img1}
              alt="Story 1"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute h-[70%] top-[30%] inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0"></div>
            <div className="z-10 w-full">
              {/* Bạn có thể dễ dàng chèn custom title / text JSX vào đây */}
              <div className="mb-4 px-1">
                <p className="text-white/80 font-script tracking-wide text-[24px]">
                  Tháng 11, 2023
                </p>
                <p className="text-white/80 text-[11.5px] font-sans text-justify font-medium drop-shadow-md">
                  Với xác suất gặp nhau chỉ 0.00487, chúng mình đã vượt qua mọi
                  rào cản, cùng nhau bước vào hành trình phiêu lưu kéo dài trọn
                  đời.
                </p>
              </div>
              <StoryMusicControl musicSrc={music1} id="story1" />
            </div>
          </div>
        </motion.div>

        {/* Khối 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative pl-4"
        >
          <div className="absolute w-3 h-3 rounded-full bg-[#1b3a68] -left-[6px] top-2 border-[3px] border-white shadow-sm ring-1 ring-[#1b3a68]/20"></div>
          <div className="relative aspect-square w-full rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-white/40 overflow-hidden group flex flex-col justify-end">
            <img
              src={img2}
              alt="Story 2"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute h-[70%] top-[30%] inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0"></div>
            <div className="z-10 w-full">
              <div className="mb-4 px-1">
                <p className="text-white/80 font-script tracking-wide text-[24px]">
                  Tháng 10, 2024
                </p>
                <p className="text-white/80 text-[11.5px] font-sans text-justify font-medium drop-shadow-md">
                  Tình yêu lớn dần trong những điều bình dị nhất, khi cả hai
                  nhận ra rằng chỉ cần có nhau, mọi ngày đều trở nên đặc biệt.
                </p>
              </div>
              <StoryMusicControl musicSrc={music2} id="story2" />
            </div>
          </div>
        </motion.div>

        {/* Khối 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative pl-4"
        >
          <div className="absolute w-3 h-3 rounded-full bg-[#1b3a68] -left-[6px] top-2 border-[3px] border-white shadow-sm ring-1 ring-[#1b3a68]/20"></div>
          <div className="relative aspect-square w-full rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-white/40 overflow-hidden group flex flex-col justify-end">
            <img
              src={img3}
              alt="Story 3"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute h-[70%] top-[30%] inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0"></div>
            <div className="z-10 w-full">
              <div className="mb-4 px-1">
                <p className="text-white/80 font-script tracking-wide text-[24px]">
                  Tháng 12, 2025
                </p>
                <p className="text-white/80 text-[11.5px] font-sans text-justify font-medium drop-shadow-md">
                  Khi mọi do dự dần nhường chỗ cho chắc chắn, một lời hứa được
                  nói ra - giản dị nhưng là mãi mãi.
                </p>
              </div>
              <StoryMusicControl musicSrc={music3} id="story3" />
            </div>
          </div>
        </motion.div>

        {/* Khối 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative pl-4"
        >
          <div className="absolute w-3 h-3 rounded-full bg-[#1b3a68] -left-[6px] top-2 border-[3px] border-white shadow-sm ring-1 ring-[#1b3a68]/20"></div>
          <div className="relative aspect-square w-full rounded-[24px] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.15)] border border-white/40 overflow-hidden group flex flex-col justify-end">
            <img
              src={img4}
              alt="Story 4"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute h-[70%] top-[30%] inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0"></div>
            <div className="z-10 w-full">
              <div className="mb-4 px-1">
                <p className="text-white/80 font-script tracking-wide text-[24px]">
                  Tháng 5, 2026
                </p>
                <p className="text-white/80 text-[11.5px] font-sans text-justify font-medium drop-shadow-md">
                  Giữa hàng vạn người, ta gặp được người mình nên gặp. giữa hàng
                  vạn năm, trong cõi thời gian hoang hoải, không sớm một bước,
                  cũng chẳng muộn một giây, chỉ vừa vặn tìm thấy nhau.
                </p>
              </div>
              <StoryMusicControl musicSrc={music4} id="story4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
