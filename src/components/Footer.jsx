import React from 'react';
import styles from './Footer.module.css';
import LogoMinistereEurope from '../assets/LogoMinistereEurope2020.png';
import LogoOKF from '../assets/LogoOKF.png';
import LogoWCS from '../assets/LogoWCS.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        Un projet{' '}
        <a
          href="https://fr.okfn.org/"
          className={styles.thanksLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open Knowledge Foundation France
          <img
            className={styles.footerLogoImg}
            src={LogoOKF}
            alt="Logo Open Knowledge Foundation France sur font transparent"
            id="logo-okf"
          />
        </a>{' '}
        rendu possible avec l&apos;aide du{' '}
        <a
          href="https://fr.okfn.org/"
          className={styles.thanksLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          Ministère de l&apos;Europe et des affaires Etrangères
          <img
            className={styles.footerLogoImg}
            src={LogoMinistereEurope}
            alt="Logo Ministère de l'Europe et des affaires étrangères sur fond transparent"
            id="logo-ministere-europe"
          />
        </a>{' '}
        et de la{' '}
        <a
          href="https://www.wildcodeschool.com/fr-FR"
          className={styles.thanksLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          Wild Code School
          <img
            className={styles.footerLogoImg}
            src={LogoWCS}
            alt="Logo Wild Code School sur fond transparent"
            id="logo-wcs"
          />
        </a>
      </div>

      <div className={styles.mobileLogo}>
        <a
          href="https://fr.okfn.org/"
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            className={styles.mobileLogoImg}
            src={LogoOKF}
            alt="Logo Open Knowledge Foundation France sur font transparent"
            id="logo-okf"
          />
        </a>

        <a
          href="https://fr.okfn.org/"
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            className={styles.mobileLogoImg}
            src={LogoMinistereEurope}
            alt="Logo Ministère de l'Europe et des affaires étrangères sur fond transparent"
            id="logo-ministere-europe"
          />
        </a>

        <a
          href="https://www.wildcodeschool.com/fr-FR"
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            className={styles.mobileLogoImg}
            src={LogoWCS}
            alt="Logo Wild Code School sur fond transparent"
            id="logo-wcs"
          />
        </a>
      </div>
      <ul className={styles.list}>
        <li>
          <a
            className={styles.link}
            href="https://github.com/WildCodeSchool/remotefr-js-0920-p3-okf-cites-front"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github Frontend
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href="https://github.com/WildCodeSchool/remotefr-js-0920-p3-okf-cites-back"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github Backend
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href="https://github.com/WildCodeSchool/remotefr-js-0920-p3-okf-cites-back/blob/master/api.md"
            target="_blank"
            rel="noreferrer noopener"
          >
            API
          </a>
        </li>
        <li>
          <a
            className={styles.link}
            href="http://localhost:5000/api/dump"
            target="_blank"
            rel="noreferrer noopener"
          >
            Télécharger un dump de la base de données
          </a>
        </li>
      </ul>
    </footer>
  );
}
