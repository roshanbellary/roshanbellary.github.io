import styles from './DemoButton.module.css';

function DemoButton({ onClick, label = 'Run Demo' }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <span className={styles.arrow}>▶</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default DemoButton;
