import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  RadialAreaChart,
  RadialAxis,
  RadialAreaSeries,
  PieChart,
  Heatmap,
} from 'reaviz';
import styles from './Data.module.css';

export default function Data() {
  const { id } = useParams();
  const [datavis, setDatavis] = useState({
    kingdom: null,
    animalia: null,
    plantae: null,
  });

  const innerRadius = 0.1;

  const animated = true;

  const interpolation = 'smooth';
  const color = 'cybertron';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/species/stats`)
      .then((res) => res.json())
      .then((datavis_) => setDatavis(datavis_));
  }, [id]);

  console.log(datavis);
  return (
    <div className={styles.global}>
      {datavis.kingdom == null ? (
        ''
      ) : (
        <div className={styles.pie}>
          <h2 className={styles.titre}>Répartition des espèces</h2>
          <PieChart
            id="1"
            height="60vh"
            width="60vh"
            data={[
              { key: 'Animal', data: datavis.kingdom.animalia.total },
              {
                key: 'Végétal',
                data: datavis.kingdom.plantae.total,
                color: 'c',
              },
            ]}
          />
        </div>
      )}

      <div className={styles.data}>
        {datavis.kingdom == null ? (
          ''
        ) : (
          <div>
            <h2 className={styles.titre}>
              Informations manquantes parmi les animaux
            </h2>
            <RadialAreaChart
              id="2"
              height="60vh"
              width="60vh"
              data={[
                {
                  id: '16',
                  key: 'ID Wikidata',
                  data: datavis.kingdom.animalia.wikidata_id,
                },
                {
                  id: '17',
                  key: 'CITES',
                  data: datavis.kingdom.animalia.cites,
                },
                {
                  id: '21',
                  key: 'Photo',
                  data: datavis.kingdom.animalia.image_url,
                },
                {
                  id: '18',
                  key: 'Nom commun fr',
                  data: datavis.kingdom.animalia.common_name_fr,
                },
                {
                  id: '19',
                  key: 'Description',
                  data: datavis.kingdom.animalia.wikipedia_url,
                },
                {
                  id: '20',
                  key: 'Nom commun En',
                  data: datavis.kingdom.animalia.common_name_fr,
                },
              ]}
              innerRadius={innerRadius}
              axis={<RadialAxis type="category" />}
              series={
                <RadialAreaSeries
                  id="3"
                  colorScheme={color}
                  animated={animated}
                  interpolation={interpolation}
                />
              }
            />
          </div>
        )}

        {datavis.kingdom == null ? (
          ''
        ) : (
          <div>
            <h2 className={styles.titre}>
              Informations manquantes parmi les plantes
            </h2>
            <RadialAreaChart
              id="4"
              height="60vh"
              width="60vh"
              data={[
                {
                  id: '11',
                  key: 'ID Wikidata',
                  data: datavis.kingdom.plantae.wikidata_id,
                },
                {
                  id: '12',
                  key: 'CITES',
                  data: datavis.kingdom.plantae.cites,
                },
                {
                  id: '22',
                  key: 'Photo',
                  data: datavis.kingdom.plantae.image_url,
                },
                {
                  id: '13',
                  key: 'Nom commun fr',
                  data: datavis.kingdom.plantae.common_name_fr,
                },
                {
                  id: '14',
                  key: 'Description',
                  data: datavis.kingdom.plantae.wikipedia_url,
                },
                {
                  id: '15',
                  key: 'Nom commun En',
                  data: datavis.kingdom.plantae.common_name_en,
                },
              ]}
              innerRadius={innerRadius}
              axis={<RadialAxis type="category" />}
              series={
                <RadialAreaSeries
                  id="5"
                  colorScheme={color}
                  animated={animated}
                  interpolation={interpolation}
                />
              }
            />
          </div>
        )}
      </div>
      {/* repartition class animal  */}
      <div className={styles.pieClass}>
        {datavis.animalia == null ? (
          ''
        ) : (
          <div className={styles.pie}>
            <h2 className={styles.titre}>Classes au sein du règne animal</h2>
            <PieChart
              id="6"
              height="60vh"
              width="60vh"
              data={Object.entries(datavis.animalia).map(
                ([key, classTotal_]) => ({
                  key: `${key}`,
                  data: classTotal_.total,
                }),
              )}
            />
          </div>
        )}

        {datavis.plantae == null ? (
          ''
        ) : (
          <div className={styles.pie}>
            <h2 className={styles.titre}>Ordres au sein du règne Végétal</h2>
            <PieChart
              id="7"
              height="60vh"
              width="60vh"
              data={Object.entries(datavis.plantae).map(
                ([key, orderTotal_]) => ({
                  key: `${key}`,
                  data: orderTotal_.total,
                }),
              )}
            />
          </div>
        )}
      </div>
      <div className={styles.heat}>
        {/* heatmap animalia
         */}
        {datavis.animalia == null ? (
          ''
        ) : (
          <div>
            <Heatmap
              id="8"
              height="60vh"
              width="43vh"
              data={[
                {
                  key: 'Nom commun fr',
                  data: Object.entries(datavis.animalia).map(
                    ([key, nomFr]) => ({
                      key: `${key}`,
                      data: nomFr.common_name_fr,
                    }),
                  ),
                },
                {
                  key: 'Nom commun En',
                  data: Object.entries(datavis.animalia).map(
                    ([key, nomEr]) => ({
                      key: `${key}`,
                      data: nomEr.common_name_en,
                    }),
                  ),
                },
                {
                  key: 'Cites',
                  data: Object.entries(datavis.animalia).map(
                    ([key, nomFr]) => ({
                      key: `${key}`,
                      data: nomFr.common_name_fr,
                    }),
                  ),
                },
                {
                  key: 'Images',
                  data: Object.entries(datavis.animalia).map(
                    ([key, image]) => ({
                      key: `${key}`,
                      data: image.image_url,
                    }),
                  ),
                },

                {
                  key: 'Wiki ID',
                  data: Object.entries(datavis.animalia).map(
                    ([key, wikiId]) => ({
                      key: `${key}`,
                      data: wikiId.wikidata_id,
                    }),
                  ),
                },
                {
                  key: 'Description',
                  data: Object.entries(datavis.animalia).map(
                    ([key, wikiArticle]) => ({
                      key: `${key}`,
                      data: wikiArticle.wikipedia_url,
                    }),
                  ),
                },
              ]}
            />
          </div>
        )}

        {/* heatmap animalia
         */}
        {datavis.plantae == null ? (
          ''
        ) : (
          <div>
            <Heatmap
              id="9"
              height="60vh"
              width="43vh"
              data={[
                {
                  key: 'Nom commun fr',
                  data: Object.entries(datavis.plantae).map(([key, nomFr]) => ({
                    key: `${key}`,
                    data: nomFr.common_name_fr,
                  })),
                },
                {
                  key: 'Nom commun En',
                  data: Object.entries(datavis.plantae).map(([key, nomEr]) => ({
                    key: `${key}`,
                    data: nomEr.common_name_en,
                  })),
                },
                {
                  key: 'Cites',
                  data: Object.entries(datavis.plantae).map(([key, nomFr]) => ({
                    key: `${key}`,
                    data: nomFr.common_name_fr,
                  })),
                },
                {
                  key: 'Images',
                  data: Object.entries(datavis.plantae).map(([key, image]) => ({
                    key: `${key}`,
                    data: image.image_url,
                  })),
                },

                {
                  key: 'Wiki ID',
                  data: Object.entries(datavis.plantae).map(
                    ([key, wikiId]) => ({
                      key: `${key}`,
                      data: wikiId.wikidata_id,
                    }),
                  ),
                },
                {
                  key: 'Description',
                  data: Object.entries(datavis.plantae).map(
                    ([key, wikiArticle]) => ({
                      key: `${key}`,
                      data: wikiArticle.wikipedia_url,
                    }),
                  ),
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
