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
  }, []);

  return (
    <main>
      <section className="container">
        <h2>Comment contribuer ?</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nisi
          excepturi molestias sequi recusandae, officia eaque fugit alias vel
          animi corrupti amet suscipit error quod unde veniam quidem voluptates
          at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          blanditiis architecto, sed sapiente rerum inventore eos, quasi
          perspiciatis consequatur quaerat consequuntur corporis pariatur quia
          unde officiis autem voluptatem voluptatum numquam.
        </p>
      </section>

      <section>
        <h2>Espèces avec données manquantes</h2>

        <button
          className={styles.button}
          type="button"
          onClick={fetchSpeciesWithMissingData}
        >
          Voir d'autres espèces
        </button>

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
