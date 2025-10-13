const stripLeadingNumber = (s) => (s ?? "").replace(/^\s*\d+\.\s*/, "").trim();

const normalizeSpaces = (s) => (s ?? "").replace(/\s+/g, " ").trim();

const lowerNoTone = (s) =>
    normalizeSpaces(s)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

module.exports = { stripLeadingNumber, normalizeSpaces, lowerNoTone };
