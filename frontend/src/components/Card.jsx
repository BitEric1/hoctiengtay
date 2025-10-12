"use client";
import Image from "next/image";

function Card({ count, title, image, audio, onClick, active }) {
  const handleClick = () => {
    if (audio) {
      const sound = new Audio(audio);
      sound.play();
    }
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col items-center justify-between cursor-pointer rounded-xl border-[2px] border-transparent p-4 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${
        active
          ? "bg-blue-100 border-blue-500 shadow-blue-300"
          : "bg-white hover:border-blue-400"
      }`}
    >
      <span
        className={`absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold transition ${
          active
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-gray-100 text-gray-600 border-gray-300"
        }`}
      >
        {count + 1}
      </span>

      <Image
        width={200}
        height={200}
        className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        src={image}
        alt={title}
      />

      <span
        className={`mt-3 text-lg font-bold text-center transition ${
          active ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

export default Card;
