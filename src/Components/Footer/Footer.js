import styles from './Footer.module.css';
import githubIcon from '../../assets/icons/github.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import emailIcon from '../../assets/icons/email.png';
import instagramIcon from '../../assets/icons/instagram.png';

const socialLinks = [
  { href: 'https://github.com/roshanbellary', icon: githubIcon, alt: 'GitHub' },
  { href: 'https://www.linkedin.com/in/roshanbellary/', icon: linkedinIcon, alt: 'LinkedIn' },
  { href: 'https://instagram.com/roshan.bellary/', icon: instagramIcon, alt: 'Instagram' },
  { href: 'mailto:rbellary@wharton.upenn.edu', icon: emailIcon, alt: 'Email' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        {socialLinks.map(({ href, icon, alt }) => (
          <a
            key={alt}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className={styles.socialLink}
            aria-label={alt}
          >
            <img src={icon} alt={alt} />
          </a>
        ))}
      </div>
      <p className={styles.copyright}>Roshan Bellary</p>
    </footer>
  );
}

export default Footer;
