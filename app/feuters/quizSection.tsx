import { DarkStar } from "../icons/darkStar";

export const QuizSection = ({ onClose }: { onClose: () => void }) => {
  return (
    // <div className="w-full flex justify-center">
    <div className="max-w-[720px] w-full border rounded-xl shadow-sm p-8">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold flex gap-2">
            <DarkStar /> Quick test
          </h1>
          <p className="text-sm text-muted-foreground">
            Take a quick test about your knowledge
          </p>
        </div>
        <button
          className="cursor-pointer w-12 h-10 bg-white border border-[#8080803e] rounded-lg"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="border rounded-lg p-6">
        <div className="flex justify-between mb-4 items-center gap-2">
          <p>What was Genghis Khan’s birth name?</p>
          <span className="text-sm text-gray-400"> 1/ 5</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {["Yesugei", "Temüjin", "Jamukha", "Toghrul"].map((opt) => (
            <button
              key={opt}
              className="border rounded py-3 hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};
