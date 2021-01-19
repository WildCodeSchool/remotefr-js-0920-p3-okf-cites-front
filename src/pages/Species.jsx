import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import IcomoonReact from 'icomoon-react';

import styles from './Species.module.css';
import iconSet from '../assets/selection.json';
import CITES from '../components/CITES';
import { Loading } from '../components/Loading';

function CountryList({ label, countries }) {
  if (countries == null) return '';

  return (
    <div>
      {label}
      <ul>
        {countries.map((country, i) => (
          <li key={country.iso_code}>
            <abbr title={country.iso_code}>{country.name}</abbr>
            {country.uncertain && '?'}
            {i !== countries.length - 1 && ', '}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Species() {
  const location = useLocation();

  const { id } = useParams();
  const [species, setSpecies] = useState({
    kingdom: '',
    phylum: '',
    class: '',
    order: '',
    family: '',
    genus: '',
    species: '',
    subspecies: '',
    name: '',
    common_name: '',
    cites: '',
    summary: '',
    image_url: '',
    countries: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/species/${id}`)
      .then((res) => res.json())
      .then((species_) => setSpecies(species_))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <main className={styles.speciesDetails}>
      <div id={styles.resultsReturn}>
        <IcomoonReact
          id={styles.arrowLeft2}
          iconSet={iconSet}
          size={20}
          icon="arrow-left2"
        />
        <Link
          className={styles.returnLink}
          to={location.state?.prevSearchPath ?? '/'}
        >
          Revenir aux résultats de recherche
        </Link>
      </div>

      <section className={`${styles.speciesDetailsContent} container`}>
        <Loading loading={loading}>
          <p className={styles.classification}>
            {[
              species.kingdom,
              species.phylum,
              species.class,
              species.order,
              species.family,
              species.genus,
              species.species,
              species.subspecies,
            ]
              .filter((val) => val != null)
              .join(' > ')}
            {/* String ' >' to keep whitespace */}
            {' >'}{' '}
            <strong id={styles.lastClassification}>{species.name}</strong>
          </p>
          <div className={styles.speciesTitle}>
            <h1>{species.common_name}</h1>
            <span>
              <CITES cites={species.cites} />
            </span>
          </div>
          <p className={styles.name}>{species.name}</p>
          <img className={styles.speciesImg} src={species.image_url} alt="" />
          <p className={styles.speciesDescription}>
            Le Mammouth laineux est une espèce éteinte de la famille des
            élèphantidés qui a vécu durant le Pléistocène et, pour ses derniers
            représentants, au cours de l'Holocène il y a seulement 4000 ans.
          </p>
          <h2 className={styles.citesState}>
            Statut Cites : Annexe {species.cites}
          </h2>
          <h3>Menacée d'extinction. Commerce international illégal</h3>
          <p className={styles.speciesDescription}>
            En fonction du pays où le spécimen a été identifié et du type
            d'infraction, les sanctions peuvent aller d'une amende à plusieurs
            années de prison, ainsi que la confiscation du spécimen ou de
            l'objet issu du spécimen.
          </p>
          <p className={styles.speciesDescription}>
            Les espèces inscrites à l'annexe II sont celles qui, bien que
            n'étant pas nécessairement menacées actuellement d'extinction,
            pourraient le devenir si le commerce de leurs spécimens n'était pas
            étroitement contrôlé. Le commerce international des spécimens des
            espèces inscrites à l'Annexe II peut être autorisé. Quand c'est le
            cas, un permis d'exportation ou un certificat de réexploitation est
            délivré; un permis d'importation n'est pas nécessaire.
          </p>

          <div>
            <CountryList
              label="Natif à :"
              countries={species.countries.native}
            />
            <CountryList
              label="Introduit :"
              countries={species.countries.introduced}
            />
            <CountryList
              label="Réintroduit à :"
              countries={species.countries.reintroduced}
            />
            <CountryList
              label="Eteint à :"
              countries={species.countries.extinct}
            />
            <CountryList
              label="Incertain à :"
              countries={species.countries.uncertain}
            />
          </div>
        </Loading>
      </section>
    </main>
  );
}
