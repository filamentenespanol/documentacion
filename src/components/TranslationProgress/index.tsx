import React from 'react';
import styles from './TranslationProgress.module.css';

interface TranslationProgressProps {
  progress?: number;
}

export default function TranslationProgress({ progress = 25 }: TranslationProgressProps) {
  return (
    <section className={styles.translationProgressSection}>
      <div className="container">
        <div className={`alert alert--warning ${styles.progressAlert}`}>
          <div className={styles.progressHeader}>
            <h3 className={styles.progressTitle}>
              🚧 Traducción en Progreso
            </h3>
          </div>

          <p className={styles.progressDescription}>
            Este proyecto está siendo traducido activamente por la comunidad. 
            Actualmente tenemos un <strong>{progress}% completado</strong>.
          </p>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarBackground}>
              <div 
                className={styles.progressBar} 
                style={{width: `${progress}%`}}
              >
                <span className={styles.progressText}>{progress}%</span>
              </div>
            </div>
          </div>

          <div className={styles.callToAction}>
            <p>
              <strong>¿Quieres ayudar?</strong> Consulta nuestra{' '}
              <a 
                href="https://github.com/filamentenespanol/documentacion/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contributeLink}
              >
                guía de contribución
              </a>{' '}
              o revisa las{' '}
              <a 
                href="https://github.com/filamentenespanol/documentacion/issues"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contributeLink}
              >
                tareas pendientes
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}