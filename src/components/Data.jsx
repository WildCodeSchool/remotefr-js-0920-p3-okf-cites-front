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
    fetch(`http://localhost:5000/api/species/datavis`)
      .then((res) => res.json())
      .then((datavis_) => setDatavis(datavis_));
  }, [id]);

  console.log(datavis);

  return (
    <div className={styles.global}>
      {datavis.kingdomDataWikiId?.[0] == null ? (
        ''
      ) : (
        <div className={styles.pie}>
          <h2 className={styles.titre}>Répartition des espèces</h2>
          <PieChart
            height={500}
            width={500}
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
              height={450}
              width={450}
              data={[
                {
                  key: 'ID Wikidata',
                  data: datavis.kingdomDataWikiId[0].count,
                },
                { key: 'CITES', data: datavis.kingdomDataCites[0].count },
                { key: 'Photo', data: datavis.kingdomDataImage[0].count },
                {
                  key: 'Nom commun fr',
                  data: datavis.kingdomDataCommonFr[0].count,
                },
                {
                  key: 'Description',
                  data: datavis.kingdomDataArticle[0].count,
                },
                {
                  key: 'Nom commun En',
                  data: datavis.kingdomDataCommonEn[0].count,
                },
              ]}
              innerRadius={innerRadius}
              axis={<RadialAxis type="category" />}
              series={
                <RadialAreaSeries
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
              height={450}
              width={450}
              data={[
                {
                  key: 'ID Wikidata',
                  data: datavis.kingdomDataWikiId[1].count,
                },
                { key: 'CITES', data: datavis.kingdomDataCites[1].count },
                { key: 'Photo', data: datavis.kingdomDataImage[1].count },
                {
                  key: 'Nom commun fr',
                  data: datavis.kingdomDataCommonFr[1].count,
                },
                {
                  key: 'Description',
                  data: datavis.kingdomDataArticle[1].count,
                },
                {
                  key: 'Nom commun En',
                  data: datavis.kingdomDataCommonEn[1].count,
                },
              ]}
              innerRadius={innerRadius}
              axis={<RadialAxis type="category" />}
              series={
                <RadialAreaSeries
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
              height={500}
              width={500}
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
              height={500}
              width={500}
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
              height={800}
              width={500}
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
                  key: 'WikiArticle',
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
              height={800}
              width={500}
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
                  key: 'WikiArticle',
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
