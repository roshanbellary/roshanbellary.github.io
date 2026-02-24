import styles from './ProjectCard.module.css';

function ProjectCard({ title, award, date, description, technologies, links }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {award && <span className={styles.award}>{award}</span>}
      </div>
      <p className={styles.date}>{date}</p>
      <p className={styles.description}>{description}</p>
      {technologies && technologies.length > 0 && (
        <div className={styles.tags}>
          {technologies.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>
      )}
      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" className={styles.link}>
              [{label}]
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
