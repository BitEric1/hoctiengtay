// Map token trong DB → file ở /public (để test local)
// Ví dụ: "audio.so1" -> "/audio/1.m4a"
//        "audio.cau1" -> "/audio/cau1.m4a"
//        "img.img1"   -> "/imgs/img1.png"
export function resolveMedia(token) {
    if (!token) return null;
    if (typeof token !== "string") return token;

    if (token.startsWith("audio.so")) {
        const n = token.replace("audio.so", "");
        return `/audio/${n}.m4a`;
    }
    if (token.startsWith("audio.cau")) {
        const n = token.replace("audio.cau", "");
        return `/audio/cau${n}.m4a`;
    }
    if (token.startsWith("img.img")) {
        const n = token.replace("img.img", "");
        return `/imgs/img${n}.png`; // đổi .png nếu ảnh của bạn là .webp/.jpg
    }
    // Trường hợp đã là URL thật
    return token;
}
