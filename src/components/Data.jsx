import React, { useEffect } from 'react';
import styles from './Data.module.css';

export default function Data() {
  useEffect(() => {
    const divElement = document.getElementById('viz1611045298454');
    const vizElement = divElement.getElementsByTagName('object')[0];
    vizElement.style.width = '100%';
    vizElement.style.height = `${divElement.offsetWidth * 0.75}px`;
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);

    const divElement1 = document.getElementById('viz1611046672812');
    const vizElement1 = divElement1.getElementsByTagName('object')[0];
    vizElement1.style.width = '100%';
    vizElement1.style.height = `${divElement1.offsetWidth * 0.75}px`;
    const scriptElement1 = document.createElement('script');
    scriptElement1.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement1.parentNode.insertBefore(scriptElement1, vizElement1);
  });

  return (
    <div className={styles.data}>
      <h1 className={styles.titre}>Quelques informations</h1>
      <div
        id="viz1611046672812"
        style={{ position: 'relative' }}
        className={styles.tableau}
      >
        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />{' '}
          <param name="embed_code_version" value="3" />{' '}
          <param name="site_root" value="" />
          <param name="name" value="carteespcesrglementes&#47;Feuille1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ca&#47;carteespcesrglementes&#47;Feuille1&#47;1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="fr" />
        </object>
      </div>
      <div
        id="viz1611045298454"
        style={{ position: 'relative' }}
        className={styles.map}
      >
        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />{' '}
          <param name="embed_code_version" value="3" />{' '}
          <param name="path" value="shared&#47;7YHT6BJ9Y" />{' '}
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;7Y&#47;7YHT6BJ9Y&#47;1.png"
          />{' '}
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="fr" />
        </object>
      </div>{' '}
    </div>
  );
}
