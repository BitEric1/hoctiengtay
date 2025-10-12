// components/Options.jsx
import Card from "../Card/Card";

function Options({ options, selected, onSelect, correctId, showResult }) {
  return (
    <div className="flex gap-4 mt-4">
      {options.map((item, index) => {
        let extraClass = "";

        if (showResult) {
          if (item.id === selected && item.id === correctId) {
            extraClass = "border-green-500 bg-green-200"; // đúng
          } else if (item.id === selected && item.id !== correctId) {
            extraClass = "border-red-500 bg-red-200"; // sai
          } else if (item.id === correctId) {
            extraClass = "border-green-500 bg-green-200"; // highlight đáp án đúng
          }
        } else if (item.id === selected) {
          extraClass = "border-blue-500 bg-blue-200"; // đang chọn
        }

        return (
          <Card
            key={item.id}
            title={item.matChu}
            image={item.img}
            audio={item.audio}
            count={index + 1}
            onClick={() => !showResult && onSelect(item.id)}
            className={`transition ${extraClass}`}
          />
        );
      })}
    </div>
  );
}

export default Options;
