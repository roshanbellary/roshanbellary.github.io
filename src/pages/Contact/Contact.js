import githubIcon from '../../assets/icons/github.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import emailIcon from '../../assets/icons/email.png';
import styles from './Contact.module.css';

const orbitingContacts = [
  {
    label: 'Email',
    value: 'rbellary@wharton.upenn.edu',
    href: 'mailto:rbellary@wharton.upenn.edu',
    icon: emailIcon,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/roshanbellary',
    href: 'https://www.linkedin.com/in/roshanbellary/',
    icon: linkedinIcon,
  },
];

const centerContact = {
  label: 'GitHub',
  value: 'github.com/roshanbellary',
  href: 'https://github.com/roshanbellary',
  icon: githubIcon,
};

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'// Contact'}</h1>
      <p className={styles.subtitle}>Get in touch</p>
      <div className={styles.orbitContainer}>
        <div className={styles.orbitRing} />
        <a
          href={centerContact.href}
          target="_blank"
          rel="noreferrer"
          className={styles.centerPlanet}
        >
          <div className={styles.centerGlow} />
          <img
            src={centerContact.icon}
            alt={centerContact.label}
            className={styles.centerIcon}
          />
          <span className={styles.centerLabel}>{centerContact.label}</span>
        </a>
        {orbitingContacts.map((contact, index) => (
          <div
            key={contact.label}
            className={styles.orbitWrapper}
            style={{
              animationDelay: `${-index * (20 / orbitingContacts.length)}s`,
            }}
          >
            <a
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className={styles.orbitItem}
            >
              <img
                src={contact.icon}
                alt={contact.label}
                className={styles.orbitIcon}
              />
              <span className={styles.orbitLabel}>{contact.label}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
