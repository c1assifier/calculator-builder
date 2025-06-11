import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import styles from "./CalculatorButton.module.css";

export const Operators = () => {
  const { inputOperator } = useCalculatorStore();
  const { mode } = useModeStore();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        className={styles.btn}
        onClick={() => inputOperator("+")}
        disabled={mode !== "runtime"}
      >
        +
      </button>
      <button
        className={styles.btn}
        onClick={() => inputOperator("-")}
        disabled={mode !== "runtime"}
      >
        −
      </button>
    </div>
  );
};
