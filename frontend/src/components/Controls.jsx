function Controls({ selected, isWrong, onCheck, onRetry, onSkip }) {
  return (
    <div className="mt-6 flex gap-4">
      <button
        className="px-4 py-2 rounded bg-gray-200"
        onClick={onSkip}
      >
        Bỏ qua
      </button>

      {!isWrong ? (
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={onCheck}
          disabled={!selected}
        >
          Kiểm tra
        </button>
      ) : (
        <button
          className="px-4 py-2 rounded bg-yellow-500 text-white"
          onClick={onRetry}
        >
          Thử lại
        </button>
      )}
    </div>
  );
}

export default Controls;
