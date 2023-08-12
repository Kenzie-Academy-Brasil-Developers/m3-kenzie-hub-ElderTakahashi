import styles from "./style.module.scss";
import { forwardRef } from "react";

export const Select = forwardRef(({ error, label, children, ...rest }, ref) => {
  return (
    <div className={styles.selectBox}>
      <label className="label">{label}</label>
      <select ref={ref} {...rest} className={error ? "errorBorder" : null}>
        {children}
      </select>
      {error ? <p className="inputError">*{error.message}</p> : null}
    </div>
  );
});
