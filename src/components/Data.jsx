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
    kingdomDataWikiId: null,
    kingdomDataCites: null,
    kingdomDataCommonFr: null,
    kingdomDataCommonEn: null,
    kingdomDataImage: null,
    kingdomDataTotal: null,
    kingdomDataArticle: null,
    ClassDataDispatch: null,
    ClassDataDispatchVeg: null,
    ClassDataDispatchCites: null,
    ClassDataDispatchVegCites: null,
    ClassDataDispatchImage: null,
    ClassDataDispatchCommonFr: null,
    ClassDataDispatchCommonEn: null,
    ClassDataDispatchWikiID: null,
    ClassDataDispatchWikArticle: null,
    ClassDataDispatchVegImage: null,
    ClassDataDispatchVegCommonFr: null,
    ClassDataDispatchVegCommonEn: null,
    ClassDataDispatchVegWikiID: null,
    ClassDataDispatchVegWikArticle: null,
  });

  const innerRadius = 0.1;

  const animated = true;

  const interpolation = 'smooth';
  const color = 'cybertron';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/species/datavis`)
      .then((res) => res.json())
      .then((datavis_) => setDatavis(datavis_));
  }, [id]);

  return (
    <div className={styles.global}>
      {datavis.kingdomDataWikiId?.[0] == null ? (
        ''
      ) : (
        <div className={styles.pie}>
          <h2 className={styles.titre}>Répartition des espèces</h2>
          <PieChart
            id="1"
            height="60vh"
            width="60vh"
            data={[
              { key: 'Animal', data: datavis.kingdomDataTotal[0].count },
              {
                key: 'Végétal',
                data: datavis.kingdomDataTotal[1].count,
                color: 'c',
              },
            ]}
          />
        </div>
      )}

      <div className={styles.data}>
        {datavis.kingdomDataWikiId?.[0] == null ? (
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
                  data: datavis.kingdomDataWikiId[0].count,
                },
                {
                  id: '17',
                  key: 'CITES',
                  data: datavis.kingdomDataCites[0].count,
                },
                {
                  id: '21',
                  key: 'Photo',
                  data: datavis.kingdomDataImage[0].count,
                },
                {
                  id: '18',
                  key: 'Nom commun fr',
                  data: datavis.kingdomDataCommonFr[0].count,
                },
                {
                  id: '19',
                  key: 'Description',
                  data: datavis.kingdomDataArticle[0].count,
                },
                {
                  id: '20',
                  key: 'Nom commun En',
                  data: datavis.kingdomDataCommonEn[0].count,
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

        {datavis.kingdomDataWikiId?.[0] == null ? (
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
                  data: datavis.kingdomDataWikiId[1].count,
                },
                {
                  id: '12',
                  key: 'CITES',
                  data: datavis.kingdomDataCites[1].count,
                },
                {
                  id: '22',
                  key: 'Photo',
                  data: datavis.kingdomDataImage[1].count,
                },
                {
                  id: '13',
                  key: 'Nom commun fr',
                  data: datavis.kingdomDataCommonFr[1].count,
                },
                {
                  id: '14',
                  key: 'Description',
                  data: datavis.kingdomDataArticle[1].count,
                },
                {
                  id: '15',
                  key: 'Nom commun En',
                  data: datavis.kingdomDataCommonEn[1].count,
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
      <div className={styles.pieClass}>
        {datavis.kingdomDataWikiId?.[0] == null ? (
          ''
        ) : (
          <div className={styles.pie}>
            <h2 className={styles.titre}>Classes au sein du règne animal</h2>
            <PieChart
              id="6"
              height="60vh"
              width="60vh"
              data={datavis.ClassDataDispatch.map((dispatchClass) => ({
                key: `${dispatchClass.class}`,
                data: dispatchClass.count,
              }))}
            />
          </div>
        )}

        {datavis.kingdomDataWikiId?.[0] == null ? (
          ''
        ) : (
          <div className={styles.pie}>
            <h2 className={styles.titre}>Ordres au sein du règne Végétal</h2>
            <PieChart
              id="7"
              height="60vh"
              width="60vh"
              data={datavis.ClassDataDispatchVeg.map((dispatchClass) => ({
                key: `${dispatchClass.order}`,
                data: dispatchClass.count,
              }))}
            />
          </div>
        )}
      </div>
      <div className={styles.heat}>
        {/* heatmap animalia
         */}
        {datavis.kingdomDataCites?.[0] == null ? (
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
                  data: datavis.ClassDataDispatchCommonFr.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.class}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Nom commun En',
                  data: datavis.ClassDataDispatchCommonEn.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.class}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Cites',
                  data: datavis.ClassDataDispatchCites.map((dispatchClass) => ({
                    key: `${dispatchClass.class}`,
                    data: dispatchClass.count,
                  })),
                },
                {
                  key: 'Images',
                  data: datavis.ClassDataDispatchImage.map((dispatchClass) => ({
                    key: `${dispatchClass.class}`,
                    data: dispatchClass.count,
                  })),
                },

                {
                  key: 'Wiki ID',
                  data: datavis.ClassDataDispatchWikiID.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.class}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Description',
                  data: datavis.ClassDataDispatchWikArticle.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.class}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
              ]}
            />
          </div>
        )}

        {/* heatmap animalia
         */}
        {datavis.kingdomDataCites?.[0] == null ? (
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
                  data: datavis.ClassDataDispatchVegCommonFr.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Nom commun En',
                  data: datavis.ClassDataDispatchVegCommonEn.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Cites',
                  data: datavis.ClassDataDispatchVegCites.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Images',
                  data: datavis.ClassDataDispatchVegImage.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },

                {
                  key: 'Wiki ID',
                  data: datavis.ClassDataDispatchVegWikiID.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
                    }),
                  ),
                },
                {
                  key: 'Description',
                  data: datavis.ClassDataDispatchVegWikArticle.map(
                    (dispatchClass) => ({
                      key: `${dispatchClass.order}`,
                      data: dispatchClass.count,
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
