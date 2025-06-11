import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";

export const Display = () => {
  const { input, result } = useCalculatorStore();
  const { mode } = useModeStore();

  return (
    <div
      style={{
        padding: 12,
        background: "#222",
        color: "white",
        borderRadius: 12,
        fontSize: 24,
        textAlign: "center",
        border: "2px solid #444",
      }}
    >
      {mode === "runtime" ? result || input || "0" : "52"}
    </div>
  );
};
