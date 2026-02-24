import githubIcon from '../../assets/icons/github.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import emailIcon from '../../assets/icons/email.png';
import styles from './Contact.module.css';

const contacts = [
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
  {
    label: 'GitHub',
    value: 'github.com/roshanbellary',
    href: 'https://github.com/roshanbellary',
    icon: githubIcon,
  },
];

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{'// Contact'}</h1>
      <p className={styles.subtitle}>Get in touch</p>
      <div className={styles.links}>
        {contacts.map(({ label, value, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className={styles.contactLink}
          >
            <img src={icon} alt={label} className={styles.contactIcon} />
            <div>
              <div className={styles.contactLabel}>{label}</div>
              <div className={styles.contactValue}>{value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Contact;
