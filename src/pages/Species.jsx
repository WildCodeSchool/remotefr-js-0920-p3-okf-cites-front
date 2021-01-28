import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import IcomoonReact from 'icomoon-react';

import styles from './Species.module.css';
import iconSet from '../assets/selection.json';
import CITES from '../components/CITES';
import { Loading, LoadingState } from '../components/Loading';

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

const citesDescription = {
  I:
    'Espèce menacée d`extinction. Le commerce international de leurs spécimens est illégal.',
  'I/II':
    'Espèce menacée d`extinction. Le commerce international de leurs spécimens est illégal.',
  II:
    'Espèce pouvant être menacée d`extinction si le commerce de leurs spécimens n`est pas étroitement contrôlé. Le commerce international de leurs spécimens peut être autorisé lorsqu`un permis d`exportation ou de réexportation est délivré.',
  III:
    'Espèce vulnérable. Le commerce international de leurs spécimens n`est autorisé que sur présentation des permis ou certificats appropriés.',
  '?': 'Annexe inconnu ou incertain',
};

function CitesDescription({ cites }) {
  return (
    <div className={styles.citesDescription}>{citesDescription[cites]}</div>
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
    cites: '?',
    summary: '',
    image_url: '',
    countries: {},
    wikidata_id: '',
  });
  const [loading, setLoading] = useState(LoadingState.Loading);

  const fetchSpecies = useCallback(() => {
    setLoading(LoadingState.Loading);

    fetch(`${process.env.REACT_APP_API_URL}/api/species/${id}`)
      .then((res) => res.json())
      .then((species_) => {
        setSpecies(species_);
        setLoading(LoadingState.NotLoading);
      })
      .catch(() => setLoading(LoadingState.Error));
  }, [id]);

  useEffect(fetchSpecies, [fetchSpecies]);

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
        <Loading state={loading} onTryAgain={fetchSpecies}>
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
          <h2 className={styles.citesState}>
            Statut Cites : Annexe {species.cites}
          </h2>
          <h3>
            <CitesDescription cites={species.cites} />
          </h3>
          <p className={styles.speciesDescription}>
            En fonction du pays où le spécimen a été identifié et du type
            d'infraction, les sanctions peuvent aller d'une amende à plusieurs
            années de prison, ainsi que la confiscation du spécimen ou de
            l'objet issu du spécimen.
          </p>
          <p className={styles.contribute}>
            Cette page manque d&apos;informations. <br /> Contribuez à
            l&apos;enrichissement de la base de données en vous rendant sur
            cette page : <br />
            <a href={`https://www.wikidata.org/wiki/${species.wikidata_id}`}>
              {' '}
              <span>Page Wikidata de l&apos;espèce</span>
            </a>
          </p>

          <div className={styles.countryList}>
            <CountryList
              label="Espèce native :"
              countries={species.countries.native}
            />
            <CountryList
              label="Espèce introduite :"
              countries={species.countries.introduced}
            />
            <CountryList
              label="Espèce réintroduite :"
              countries={species.countries.reintroduced}
            />
            <CountryList
              label="Espèce éteinte :"
              countries={species.countries.extinct}
            />
            <CountryList
              label="Statut incertain :"
              countries={species.countries.uncertain}
            />
          </div>
        </Loading>
      </section>
    </main>
  );
}
