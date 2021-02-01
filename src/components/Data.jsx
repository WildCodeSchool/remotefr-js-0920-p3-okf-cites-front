import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  RadialAreaChart,
  RadialAxis,
  RadialAreaSeries,
  PieChart,
  Heatmap,
} from 'reaviz';
import styles from './Data.module.css';
import { useMediaQuery } from '../utils';

export default function Data() {
  const [datavis, setDatavis] = useState({
    kingdom: null,
    animalia: null,
    plantae: null,
  });
  const isMobile = useMediaQuery('(max-width: 991.98px)');

  const innerRadius = 0.1;

  const animated = true;

  const interpolation = 'smooth';
  const color = 'cybertron';

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/species/stats`)
      .then((res) => res.json())
      .then((datavis_) => setDatavis(datavis_));
  }, []);

  const getHeatmapData = useCallback((obj) => {
    if (obj == null) return [];

    const dataCommonNameFr = {
      key: 'Nom commun fr',
      data: [],
    };
    const dataCommonNameEN = {
      key: 'Nom commun en',
      data: [],
    };
    const dataCites = {
      key: 'CITES',
      data: [],
    };
    const dataImage = {
      key: 'Images',
      data: [],
    };
    const dataWikidataId = {
      key: 'Wiki ID',
      data: [],
    };
    const dataWikipediaUrl = {
      key: 'Description',
      data: [],
    };

    Object.entries(obj).forEach(([key, stats]) => {
      dataCommonNameFr.data.push({
        key,
        data: stats.common_name_fr,
      });
      dataCommonNameEN.data.push({
        key,
        data: stats.common_name_en,
      });
      dataCites.data.push({
        key,
        data: stats.cites,
      });
      dataImage.data.push({
        key,
        data: stats.image_url,
      });
      dataWikidataId.data.push({
        key,
        data: stats.wikidata_id,
      });
      dataWikipediaUrl.data.push({
        key,
        data: stats.wikipedia_url,
      });
    });

    return [
      dataCommonNameFr,
      dataCommonNameEN,
      dataCites,
      dataImage,
      dataWikidataId,
      dataWikipediaUrl,
    ];
  }, []);

  const animaliaHeatmapData = useMemo(() => getHeatmapData(datavis.animalia), [
    datavis,
    getHeatmapData,
  ]);
  const plantaeHeatmapData = useMemo(() => getHeatmapData(datavis.plantae), [
    datavis,
    getHeatmapData,
  ]);

  return (
    <div className={styles.global}>
      <h1 className={styles.title}>
        S'informer sur la répartition des espèces
      </h1>
      {datavis.kingdom == null ? (
        ''
      ) : (
        <div className={styles.pie}>
          <h2 className={styles.graphTitle}>Répartition des espèces</h2>
          <PieChart
            id="1"
            height="60vh"
            width="100vw"
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
            <h2 className={styles.graphTitle}>
              Informations manquantes parmi les animaux
            </h2>
            <RadialAreaChart
              id="2"
              height="60vh"
              width={isMobile ? '100vw' : '50vw'}
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
            <h2 className={styles.graphTitle}>
              Informations manquantes parmi les plantes
            </h2>
            <RadialAreaChart
              id="4"
              height="60vh"
              width={isMobile ? '100vw' : '50vw'}
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
            <h2 className={styles.graphTitle}>
              Classes au sein du règne animal
            </h2>
            <PieChart
              id="6"
              height="60vh"
              width={isMobile ? '100vw' : '50vw'}
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
            <h2 className={styles.graphTitle}>
              Ordres au sein du règne Végétal
            </h2>
            <PieChart
              id="7"
              height="60vh"
              width={isMobile ? '100vw' : '50vw'}
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
        {/* heatmap animalia */}
        {datavis.animalia != null && (
          <div className={styles.heatmap}>
            <Heatmap
              id="8"
              height="60vh"
              width={isMobile ? '80vw' : '20vw'}
              data={animaliaHeatmapData}
            />
          </div>
        )}

        {/* heatmap plantae */}
        {datavis.plantae != null && (
          <div className={styles.heatmap}>
            <Heatmap
              id="9"
              height="60vh"
              width={isMobile ? '80vw' : '20vw'}
              data={plantaeHeatmapData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
