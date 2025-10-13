export default function LangSelect({ label, value, onChange }) {
    return (
        <label className="flex flex-col md:flex-row md:items-center gap-2 text-sm font-medium text-gray-600">
            <span>{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full md:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
                <option value="tay">Tày</option>
                <option value="vi">Việt</option>
            </select>
        </label>
    );
}
