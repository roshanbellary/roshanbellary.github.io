import skills from '../../data/skills';
import SkillBadge from '../../Components/SkillBadge/SkillBadge';
import headshot from '../../assets/images/roshan.png';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.greeting}>$ whoami</p>
          <h1 className={styles.name}>Roshan Bellary</h1>
          <p className={styles.tagline}>
            Software Engineer | UPenn M&T '27
          </p>
          <p className={styles.bio}>
            I'm a student in the Jerome Fisher M&T Program at the University of Pennsylvania,
            pursuing an accelerated M.S.E & B.S.E in Computer Science (AI concentration) and
            a B.S. in Economics (Finance concentration). I'm passionate about building
            high-performance systems at the intersection of software engineering and quantitative finance.
          </p>
        </div>
        <img
          src={headshot}
          alt="Roshan Bellary"
          className={styles.headshot}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{'// Education'}</h2>
        <div className={styles.education}>
          <div className={styles.eduItem}>
            <p className={styles.eduSchool}>
              University of Pennsylvania - M&T Program
            </p>
            <p className={styles.eduDetails}>
              Accelerated M.S.E & B.S.E in Computer Science (AI) + B.S. in Economics (Finance)
              <br />
              President of M&T Board | Wharton Investment Trading Group | Joseph Wharton Scholars | Phi Kappa Psi
            </p>
          </div>
          <div className={styles.eduItem}>
            <p className={styles.eduSchool}>Valley Christian High School</p>
            <p className={styles.eduDetails}>
              Valedictorian 
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{'// Awards'}</h2>
        <div className={styles.awards}>
          <p className={styles.awardItem}>USA Computing Olympiad - Gold Ranking</p>
          <p className={styles.awardItem}>USA Physics Olympiad - 2x Bronze Medal (Top 100 nationwide)</p>
          <p className={styles.awardItem}>4x AIME Qualifier (Top 2.5% nationwide)</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{'// Skills'}</h2>
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillCategory}>
              <span className={styles.skillLabel}>{category}</span>
              <div className={styles.skillTags}>
                {items.map(skill => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
