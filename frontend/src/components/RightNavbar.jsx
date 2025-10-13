"use client";

const RightNavbar = () => {
    const progress = 69;

    return (
        <div className="hidden lg:block lg:w-3/12 min-h-screen px-6 py-4  border-l-[3px] border-blue-200 shadow-lg ">
            <div className="w-full  rounded-2xl border-2 border-gray-300 shadow-md p-4 mb-6">
                <h1 className="lg:text-3xl md:text-2xl font-bold text-center">
                    Tiến trình
                </h1>
                <div className="relative w-full bg-gray-200 h-4 my-4 rounded-full overflow-hidden">
                    <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-l from-blue-400 to-blue-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center px-4 text-xs font-bold text-white">
                        {progress}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RightNavbar;
