import projects from '../../data/projects';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import styles from './Projects.module.css';

function Projects() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'// Projects'}</h1>
      <p className={styles.subtitle}>Things I've built and shipped</p>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
