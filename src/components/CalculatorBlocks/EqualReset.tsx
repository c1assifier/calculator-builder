import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import styles from "./CalculatorButton.module.css";

export const EqualReset = () => {
  const { calculate, reset } = useCalculatorStore();
  const { mode } = useModeStore();

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        className={styles.btn}
        onClick={calculate}
        disabled={mode !== "runtime"}
      >
        =
      </button>
      <button
        className={styles.btn}
        onClick={reset}
        disabled={mode !== "runtime"}
      >
        C
      </button>
    </div>
  );
};
