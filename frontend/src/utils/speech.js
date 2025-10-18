export function normalizeText(s = "") {
    return String(s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s']/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function levenshtein(a, b) {
    a = normalizeText(a);
    b = normalizeText(b);
    const m = a.length,
        n = b.length;
    if (!m) return n;
    if (!n) return m;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }
    return dp[m][n];
}

export function similarityScore(target, actual) {
    const A = normalizeText(target),
        B = normalizeText(actual);
    if (!A && !B) return 100;
    const d = levenshtein(A, B);
    const worst = Math.max(A.length, B.length) || 1;
    return Math.round((1 - d / worst) * 100);
}

export function getRecognition() {
    const SR =
        typeof window !== "undefined" &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return null;
    const rec = new SR();
    rec.lang = "vi-VN";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    return rec;
}
