import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import elephantLogo from '../assets/elephant-logo.png';
import styles from './Navbar.module.css';
import Icon from './Icon';

const links = [
  {
    title: 'Explorer',
    description: "Connaître le statut d'une plante ou d'un animal",
    url: '/',
  },
  {
    title: 'Visualiser',
    description: 'Découvrir la base CITES de la répartition des espèces',
    url: '/visualiser',
  },
  {
    title: 'Contribuer',
    description: "Participer à l'enrichissement de la base de données",
    url: '/contribuer',
  },
];

function NavbarLink({ title, description, url }) {
  return (
    <NavLink
      exact
      to={url}
      className={styles.navbarLink}
      activeClassName={styles.active}
    >
      <h1 className={styles.navbarLinkTitle}>{title}</h1>
      <span>{description}</span>
    </NavLink>
  );
}
NavbarLink.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navbarListRef = useRef();

  useEffect(() => {
    const el = navbarListRef.current;

    if (open) {
      // Open menu

      // Calculate expended height
      el.style.height = 'auto';
      const { height } = el.getBoundingClientRect();
      el.style.height = '';

      // Double requestAnimationFrame for the transition to work
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.height = `${height}px`;
        });
      });
    } else {
      // Close menu
      el.style.height = '';
    }
  }, [open]);

  return (
    <nav className={styles.nav}>
      <Link className={styles.navbarBrand} title="Page d'accueil" to="/">
        <img
          className={styles.brandLogo}
          src={elephantLogo}
          alt="Dessin éléphant noir sur fond transparent"
          id="elephant-logo"
        />
        Mémoires <br /> d'Éléphant
      </Link>

      <button
        className={`${styles.burgerButton} ${open ? styles.active : ''}`}
        type="button"
        title={`${open ? 'Fermer' : 'Ouvrir'} le menu de navigation`}
        aria-expanded={open}
        aria-controls="navbar-list"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Icon icon="menu" size="2rem" color="var(--dark-blue)" />
      </button>

      <ul id="navbar-list" className={styles.navList} ref={navbarListRef}>
        {links.map((link) => (
          <li key={link.title}>
            <NavbarLink
              title={link.title}
              description={link.description}
              url={link.url}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
