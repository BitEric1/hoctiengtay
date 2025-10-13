"use client";
import { createContext, useContext, useState } from "react";
import * as img from "@/assets/imgs/index.js";
import audio from "../../public/audio";
// import audio from "../../public/audio";

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  //  các loại trò chơi  "card","choiceQuestion","choiceAudio","matchQuestion","writeAnswer",
  // là trò chọn từ "FillInTheBlank"

  const resource = [
    {
      id: "chuong-I",
      title: "Chương 1: Số đếm",
      lessons: [
        {
          id: "bai-1",
          title: "Số đếm từ 1 đến 10",
          slug: "/chuong1-bai1",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }
          ]
        },
        //Bài 2 số đếm 10 - 100
        {
          id: "bai2",
          slug: "/chuong1-bai2",
          title: "Bài 2: Số đếm từ 10 đến 100",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
        //bài 3
        {
          id: "bai3",
          slug: "/chuong1-bai3",
          title: "Bài 3: Số hàng trăm",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
        //Bài 4 số hàng nghìn
        {
          id: "bai4",
          slug: "/chuong1-bai4",
          title: "Bài 4: Số hàng nghìn",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
      ]
    },
    {
      id: "chuong-II",
      title: "Chương 2: Số đếm",
      lessons: [
        {
          id: "bai1",
          title: "Số đếm từ 1 đến 10",
          slug: "/chuong2-bai1",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }
          ]
        },
        //Bài 2 số đếm 10 - 100
        {
          id: "bai2",
          slug: "/chuong2-bai2",
          title: "Bài 2: Số đếm từ 10 đến 100",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
        //bài 3
        {
          id: "bai3",
          title: "Bài 3: Số hàng trăm",
          slug: "/chuong2-bai3",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
        //Bài 4 số hàng nghìn
        {
          id: "bai4",
          title: "Bài 4: Số hàng nghìn",
          slug: "/chuong2-bai4",
          questions: [
            {
              id: 1,
              types: ["Card", "ChoiceQuestion", "ChoiceAudio", "MatchQuestion", "WriteAnswer"],
              questions: [
                { id: 1, img: img.img1, audio: audio.so1, matChu: "Nâng", nghiaTV: "Số 1" },
                { id: 2, img: img.img2, audio: audio.so2, matChu: "Sloong", nghiaTV: "Số 2" },
                { id: 3, img: img.img3, audio: audio.so3, matChu: "Slam", nghiaTV: "Số 3" },
                { id: 4, img: img.img4, audio: audio.so4, matChu: "Slí", nghiaTV: "Số 4" },
                { id: 5, img: img.img5, audio: audio.so5, matChu: "Hả", nghiaTV: "Số 5" },
                // {id: 6, img: img.img6, audio: audio.so6, matChu: "Hốc", nghiaTV: "Số 6"},
                // {id: 7, img: img.img7, audio: audio.so7, matChu: "Chất", nghiaTV: "Số 7"},
                // {id: 8, img: img.img8, audio: audio.so8, matChu: "Pét", nghiaTV: "Số 8"},
                // {id: 9, img: img.img9, audio: audio.so9, matChu: "Cẩu", nghiaTV: "Số 9"},
                // {id: 10, img: img.img10, audio: audio.so10, matChu: "Slíp", nghiaTV: "Số 10"},
              ]

            },
            {
              id: 2,
              types: ["FillInTheBlank",],
              questions: [
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
                }
              ]


            }

          ]
        },
      ]
    },


  ]

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
