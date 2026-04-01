import React from "react";
import footerImg from "../assets/footer.webp";

export default function Footer() {
  return (
    <footer className="w-full pt-2 px-0 relative z-1 flex flex-col items-center">
      <div className="relative w-full aspect-[2/3] rounded-2xl rounded-b-none overflow-hidden group">
        <img
          src={footerImg}
          alt="Footer background"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(86, 57, 27, 0), rgb(24, 52, 105))",
          }}
        ></div>
        <div className="absolute inset-0 bg-transparent flex pb-[50px] flex-col justify-end text-white text-center">
          <h2 className="text-5xl font-script leading-[1px] mb-12 text-white drop-shadow-lg">
            Thank you!
          </h2>

          <div className="space-y-1 font-nvnvalky opacity-95 text-[12px] tracking-[1px] px-6 leading-relaxed drop-shadow-md">
            <p>Cảm ơn bạn đã dành tình cảm cho chúng mình!</p>
            <p className="leading-[30px]">
              Sự hiện diện của bạn chính là điều vô cùng quý giá đối với chúng
              mình. Yêu bạn rất nhiều!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
