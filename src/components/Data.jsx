import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  RadialAreaChart,
  RadialAxis,
  RadialAreaSeries,
  PieChart,
} from 'reaviz';
import styles from './Data.module.css';

export default function Data() {
  const { id } = useParams();
  const [datavis, setDatavis] = useState({
    kingdomDataWikiId: '',
    kingdomDataCites: '',
    kingdomDataCommonFr: '',
    kingdomDataCommonEn: '',
    kingdomDataImage: '',
    kingdomDataTotal: '',
    kingdomDataArticle: '',
  });

  // const innerRadius = number('Inner Radius', 0.1);
  const innerRadius = 0.1;
  // const animated = boolean('Animated', true);
  const animated = true;
  // const hasGradient = boolean('Gradient', true);

  // const autoRotate = boolean('Auto Rotate Labels', true);

  // const color = select('Color Scheme', schemes, 'cybertron');

  // const gradient = hasGradient ? <RadialGradient /> : null;
  // const tickCount = number('Tick Count', 5);

  // const arcCount = number('Arc Count', 10);

  // const tickPosition = select(
  //   'Tick Position',
  //   {
  //     inside: 'inside',
  //     outside: 'outside',
  //   },
  //   'inside',
  // );

  // const interpolation = select(
  //   'Interpolation',
  //   {
  //     linear: 'linear',
  //     smooth: 'smooth',
  //   },
  //   'smooth',
  // );
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
      {datavis.kingdomDataWikiId[0] === undefined ? (
        ''
      ) : (
        <div className={styles.pie}>
          <h2 className={styles.titre}>Répartition des espèces</h2>
          <PieChart
            height={300}
            width={300}
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
        {datavis.kingdomDataWikiId[0] === undefined ? (
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
                  // area={<RadialArea gradient={gradient} />}
                />
              }
              // axis={
              //   <RadialAxis
              //     arcs={<RadialAxisArcSeries count={arcCount} />}
              //     ticks={
              //       <RadialAxisTickSeries
              //         count={tickCount}
              //         tick={
              //           <RadialAxisTick
              //             line={<RadialAxisTickLine position={tickPosition} />}
              //             label={<RadialAxisTickLabel autoRotate={autoRotate} />}
              //           />
              //         }
              //       />
              //     }
              //   />
              // }
            />
          </div>
        )}

        {datavis.kingdomDataWikiId[1] === undefined ? (
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
    </div>
  );
}
