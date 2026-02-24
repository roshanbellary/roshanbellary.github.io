import experience from '../../data/experience';
import ExperienceCard from '../../Components/ExperienceCard/ExperienceCard';
import styles from './Experience.module.css';

function Experience() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'// Experience'}</h1>
      <p className={styles.subtitle}>Where I've worked and what I've built</p>
      <div className={styles.timeline}>
        {experience.map((exp, i) => (
          <div key={i} className={styles.timelineItem}>
            <ExperienceCard {...exp} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
