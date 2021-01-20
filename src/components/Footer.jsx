import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
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
      </ul>
    </footer>
  );
}
