// src/utils/tokenToAsset.js
import audioMap from "../../public/audio/index.js";
import * as imgs from "../../public/imgs/index.js";

// "img.img1" -> imgs.img1, "audio.so1" -> audioMap.so1
export const tokenToAsset = (v) => {
    if (typeof v !== "string") return v;
    if (v.startsWith("img.")) return imgs[v.split(".")[1]] || v;
    if (v.startsWith("audio.")) return audioMap[v.split(".")[1]] || v;
    return v;
};

// Map toàn bộ lesson trả về từ API
export const hydrateLesson = (lesson) => ({
    ...lesson,
    questions: (lesson.questions || []).map((g) => ({
        ...g,
        questions: (g.questions || []).map((q) => ({
            ...q,
            img: tokenToAsset(q.img),
            audio: tokenToAsset(q.audio),
        })),
    })),
});
