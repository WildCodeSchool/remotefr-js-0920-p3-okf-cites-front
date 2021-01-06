import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IcomoonReact from 'icomoon-react';

import styles from './Species.module.css';
import iconSet from '../assets/selection.json';

export default function Species() {
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
  });

  useEffect(() => {
    fetch(`http://localhost:5000/species/${id}`)
      .then((res) => res.json())
      .then((species_) => setSpecies(species_));
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
        <p>Revenir aux résultats de recherche</p>
      </div>
      <section className={styles.speciesDetailsContent}>
        <p className={styles.classification}>
          {species.kingdom} &gt; {species.phylum} &gt; {species.class} &gt;
          {species.order} &gt; {species.family} &gt; {species.genus} &gt;
          {species.species} &gt; {species.subspecies}
          &gt;
          <span id={styles.lastClassification}>{species.name}</span>
        </p>
        <div className={styles.speciesTitle}>
          <h1>{species.common_name}</h1>
          <p className={styles.citesI}>{species.cites}</p>
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
          années de prison, ainsi que la confiscation du spécimen ou de l'objet
          issu du spécimen.
        </p>
        <p className={styles.speciesDescription}>
          Les espèces inscrites à l'annexe II sont celles qui, bien que n'étant
          pas nécessairement menacées actuellement d'extinction, pourraient le
          devenir si le commerce de leurs spécimens n'était pas étroitement
          contrôlé. Le commerce international des spécimens des espèces
          inscrites à l'Annexe II peut être autorisé. Quand c'est le cas, un
          permis d'exportation ou un certificat de réexploitation est délivré;
          un permis d'importation n'est pas nécessaire.
        </p>
      </section>
    </main>
  );
}
