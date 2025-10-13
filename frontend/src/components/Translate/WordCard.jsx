export default function WordCard({ item }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 mb-4 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800">{item.matChu}</h3>
            <div className="mt-4 space-y-3 text-gray-700">
                {item.meanings?.slice(0, 5).map((m, idx) => (
                    <div
                        key={idx}
                        className="border-t border-gray-100 pt-3 first:border-t-0 first:pt-0"
                    >
                        <div>
                            <span className="font-semibold text-blue-600">
                                Tiếng Việt:
                            </span>{" "}
                            {m.nghiaTV}
                        </div>
                        {m.nghiaVH && (
                            <div>
                                <span className="font-semibold">VH:</span>{" "}
                                {m.nghiaVH}
                            </div>
                        )}
                        {m.dongNghia && (
                            <div>
                                <span className="font-semibold">
                                    Đồng nghĩa:
                                </span>{" "}
                                {m.dongNghia}
                            </div>
                        )}
                        {m.traiNghia && (
                            <div>
                                <span className="font-semibold">
                                    Trái nghĩa:
                                </span>{" "}
                                {m.traiNghia}
                            </div>
                        )}
                        {m.bienThe && (
                            <div>
                                <span className="font-semibold">Biến thể:</span>{" "}
                                {m.bienThe}
                            </div>
                        )}
                        {m.ghiChu && (
                            <div className="mt-1">
                                <em className="text-sm text-gray-500">
                                    {m.ghiChu}
                                </em>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
