import { useModeStore } from "@/store/modeStore";
import styles from "./Constructor.module.css";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { FaCode } from "react-icons/fa";

export const Constructor = () => {
  const { mode, setMode } = useModeStore();

  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          onClick={() => setMode("runtime")}
          className={clsx(styles.btn, mode === "runtime" && styles.active)}
        >
          <AiOutlineEye /> Runtime
        </button>
        <button
          onClick={() => setMode("constructor")}
          className={clsx(styles.btn, mode === "constructor" && styles.active)}
        >
          <FaCode /> Constructor
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.panel}>{/* не забыть вставить блоки */}</div>
        <div className={styles.canvas}>{/* основаня  рабочая область */}</div>
      </div>
    </div>
  );
};
