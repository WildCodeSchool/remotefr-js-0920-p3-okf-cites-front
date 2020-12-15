import React from 'react';
import styles from './SingleCard.module.css';

const tables = [
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
  {
    photo:
      'https://db3pap006files.storage.live.com/y4mcDoldqRAERhHqpO7oluMqq0qWNhOGGPr_iRj8ObgR_Yhlq0XLJfyC7yV4wMBxAi8goge14tknA5hSq3RGsUmlUYuhxKYvt-A0hyFLdyWPm94_fIK6IRs-mici9ie5yjxkgitQhLN_H6Wamov3LXBHuT1KZZCQ7J3ypzka127sLYYXwVizbfGmhXn_yQQYoiL?width=224&height=225&cropmode=none',
    description:
      ' Mais il faut savoir que dans la nature, il existe également de nombreux animaux particulièrement étranges. On sait que la nature recèle de merveilles, il faut également se rendre compte que des créatures pas spécialement très belles peuplent également notre planète.',
    nomscientifique: 'Felis silvestris catus',
    nomcommun: 'Boule de poils',
    statutespece: 'Espèce menaçante',
  },
];

export default function SingleCard() {
  return (
    <div className={styles.cardContainer}>
      {tables.map((table) => (
        <div className={styles.singleCard}>
          <figure className={styles.picCard}>
            <img
              className={styles.animalPic}
              alt={styles.scientificName}
              src={table.photo}
            />
            <figcaption className={styles.caption}>
              {table.statutespece}
            </figcaption>
          </figure>

          <h2 className={styles.vernacular}>{table.nomcummun}</h2>
          <h3 className={styles.scientific}>{table.nomscientifique}</h3>
          <p className={styles.resume}>{table.description}</p>
        </div>
      ))}
    </div>
  );
}
