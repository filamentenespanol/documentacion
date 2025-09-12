import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Img?: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Traducción Fiel',
    Img: require('@site/static/img/traduccion.png').default,
    description: (
      <>
        Mantenemos una traducción fiel y actualizada de la documentación oficial 
        de Filament v4, respetando la estructura y el contenido original.
      </>
    ),
  },
  {
    title: 'Comunidad Hispanohablante',
    Img: require('@site/static/img/fix.png').default,
    description: (
      <>
        Creado por y para la comunidad de desarrolladores que hablan español.
        Colabora con nosotros a través de <code>issues</code> y <code>pull requests</code>.
      </>
    ),
  },
  {
    title: 'Código Abierto',
    Img: require('@site/static/img/opensource.png').default,
    description: (
      <>
        Este proyecto es completamente open source. Puedes contribuir, 
        reportar errores o sugerir mejoras en nuestro repositorio de GitHub.
      </>
    ),
  },
];

function Feature({title, Svg, Img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg && <Svg className={styles.featureSvg} role="img" />}
        {Img && <img src={Img} className={styles.featureImg} alt={title} />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}