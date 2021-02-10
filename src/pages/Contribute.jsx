import React, { useCallback, useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { SpeciesCardList } from '../components/SpeciesCard';
import styles from './Contribute.module.css';

export default function Contribute() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSpeciesWithMissingData = useCallback(async () => {
    setLoading(true);

    try {
      // prettier-ignore
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/species/missing-data`);
      setSpecies(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpeciesWithMissingData();
  }, [fetchSpeciesWithMissingData]);

  return (
    <main>
      <section className={styles.intro}>
        <h2>Comment contribuer ?</h2>
        <p>
          <span>C&apos;est simple.</span> Vous trouverez ici la liste des
          espèces auxquelles il manque des données. Si vous avez des
          informations concernant une espèce, vous pouvez cliquer sur celle-ci
          et vous serez alors redirigé vers sa page Wikidata afin de participer
          à l&apos;enrichissement de la base de données.
        </p>
      </section>

      <section className={styles.container}>
        <div className={styles.title}>
          <h3>Liste d&apos;espèces avec données manquantes</h3>
          <button
            className={styles.button}
            type="button"
            onClick={fetchSpeciesWithMissingData}
          >
            Voir d&apos;autres espèces
          </button>
        </div>

        <div className={styles.content}>
          <Loading loading={loading}>
            <SpeciesCardList
              species={species}
              cardContent={(speciesCard, singleSpecies) => (
                <>
                  <a
                    className={styles.link}
                    href={`https://www.wikidata.org/wiki/${singleSpecies.wikidata_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Contribuez sur la page wikidata de l'espèce"
                  >
                    {speciesCard}
                  </a>

                  <table className={styles.table}>
                    <tbody>
                      <tr>
                        <th scope="row">Id Species+ : </th>
                        <td>
                          {singleSpecies['species+_id'] ?? (
                            <strong>Donnée manquante</strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Nom vernaculaire français : </th>
                        <td>
                          {singleSpecies.common_name_fr ?? (
                            <strong>Donnée manquante</strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Nom vernaculaire anglais : </th>
                        <td>
                          {singleSpecies.common_name_en ?? (
                            <strong>Donnée manquante</strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Image : </th>
                        <td>
                          {singleSpecies.image_url ? (
                            <a
                              href={singleSpecies.image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {singleSpecies.image_url}
                            </a>
                          ) : (
                            <strong>Donnée manquante</strong>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Article wikipedia français : </th>
                        <td>
                          {singleSpecies.wikipedia_url ? (
                            <a
                              href={singleSpecies.wikipedia_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {singleSpecies.wikipedia_url}
                            </a>
                          ) : (
                            <strong>Donnée manquante</strong>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            />
          </Loading>
        </div>
      </section>
    </main>
  );
}
