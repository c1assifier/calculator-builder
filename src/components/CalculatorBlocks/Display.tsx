import { useCalculatorStore } from "@/store/calculatorStore";
import { useModeStore } from "@/store/modeStore";
import styles from "./Display.module.css";

export const Display = () => {
  const { input, result } = useCalculatorStore();
  const { mode } = useModeStore();

  return (
    <div className={styles.display}>
      {mode === "runtime" ? result || input || "0" : "52"}
    </div>
  );
};
