import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Navbar.module.css';

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
NavLink.PropTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default function Navbar() {
  return (
    <header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
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
    </header>
  );
}
