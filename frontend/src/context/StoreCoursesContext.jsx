"use client";
import { createContext, useContext, useState } from "react";
import * as img from "@/assets/imgs/index.js";
import audio from "../../public/audio";
// import audio from "../../public/audio";

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  //  các loại trò chơi  "card","choiceQuestion","choiceAudio","matchQuestion","writeAnswer",
  // là trò chọn từ "FillInTheBlank"
  const questionData = [
    {
          id: 1,
          img: img.img1,
          audio: audio.so1,
          matChu: "Nâng",
          nghiaTV: "Số 1",
        },
        {
          id: 2,
          img: img.img2,
          audio: audio.so2,
          matChu: "Sloong",
          nghiaTV: "Số 2",
        },
        {
          id: 3,
          img: img.img3,
          audio: audio.so3,
          matChu: "Slam",
          nghiaTV: "Số 3",
        },
        {
          id: 4,
          img: img.img4,
          audio: audio.so4,
          matChu: "Slí",
          nghiaTV: "Số 4",
        },
        {
          id: 5,
          img: img.img5,
          audio: audio.so5,
          matChu: "Hả",
          nghiaTV: "Số 5",
        },
        {
          id: 6,
          img: img.img6,
          audio: audio.so6,
          matChu: "Hốc",
          nghiaTV: "Số 6",
        },
        {
          id: 7,
          img: img.img7,
          audio: audio.so7,
          matChu: "Chất",
          nghiaTV: "Số 7",
        },
        {
          id: 8,
          img: img.img8,
          audio: audio.so8,
          matChu: "Pét",
          nghiaTV: "Số 8",
        },
        {
          id: 9,
          img: img.img9,
          audio: audio.so9,
          matChu: "Cẩu",
          nghiaTV: "Số 9",
        },
        {
          id: 10,
          img: img.img10,
          audio: audio.so10,
          matChu: "Slíp",
          nghiaTV: "Số 10",
        },
  ]
  const resource = [
    {
      id: 1,
      slug: "bai-1",
      title: "Bài 1: Học số đếm",
      types: ["card","matchQuestion"],
      question: questionData,
    },
    {
      id: 2,
      slug: "bai-2",
      title: "Bài 2: Điền từ vào chỗ trống",
      types: ["FillInTheBlank"],
      question: [
        {
          id: 1,
          first: "Lườn ché mì",
          last: "cần",
          answer: ["Hất", "Chất", "Slon", "Ché"],
          audio: audio.cau1,
          correct: "Chất",
        },
        {
          id: 2,
          first: "Pả mì",
          last: "ăn mác táo",
          answer: ["Hả", "Thả", "Slon", "Slam"],
          audio: audio.cau2,
          correct: "Hả",
        },
        {
          id: 3,
          first: "Lan pây tạy slư đảy",
          last: "pi dá.",
          answer: ["Slam", "Slí", "Sloong", "Hốc"],
          audio: audio.cau3,
          correct: "Slam",
        },
      ],
    },
    {
      id: 3,
      slug: "bai-3",
      title: "Bài 3: Chọn đáp án đúng",
      types: ["choiceQuestion"],
      question: questionData,
    },
    {
      id: 4,
      slug: "bai-4",
      title: "Bài 4: Nghe và chọn",
      types: ["choiceAudio"],
      question: questionData,
    },
    {
      id: 5,
      slug: "bai-5",
      title: "Bài 5: Nối từ",
      types: ["matchQuestion"],
      question: questionData,
    },
    {
      id: 6,
      slug: "bai-6",
      title: "Bài 6: Nghe và viết lại từ",
      types: ["writeAnswer"],
      question: questionData,
    },
  ];

  const [data, setData] = useState(resource);

  return (
    <StoreContext.Provider value={{ data, setData }}>
      {children}
    </StoreContext.Provider>
  );
};
// export ra để sử dụng như 1 hook
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context)
    throw new Error("useStore phải được sử dụng trong StoreProvider");
  return context;
};
