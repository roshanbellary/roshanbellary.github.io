import styles from './ExperienceCard.module.css';

function ExperienceCard({ role, company, dates, description, technologies }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.role}>{role}</h3>
        <span className={styles.dates}>{dates}</span>
      </div>
      <p className={styles.company}>{company}</p>
      <ul className={styles.bullets}>
        {description.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
      {technologies && technologies.length > 0 && (
        <div className={styles.tags}>
          {technologies.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceCard;
