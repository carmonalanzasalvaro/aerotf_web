import { motion } from 'framer-motion'
import ActivityHoverSlider from './ui/ActivityHoverSlider'
import fastenersImg from '../assets/activity-fasteners.jpg'
import bearingsImg from '../assets/activity-bearings.jpg'
import toolsImg from '../assets/activity-tools.jpg'
import defenseImg from '../assets/activity-defense.jpg'

const slides = [
  {
    id: 'defense',
    eyebrow: '01 · misión crítica',
    title: 'Defensa & aplicaciones militares',
    imageUrl: defenseImg,
    imagePosition: '54% 46%',
    desc: 'Componentes bajo especificaciones MIL-SPEC y estándares OTAN, con cadena de custodia documentada para programas de defensa nacionales e internacionales.',
    tags: ['MIL-SPEC', 'OTAN', 'AS/NZS', 'Misión crítica'],
  },
  {
    id: 'fasteners',
    eyebrow: '02 · estructura primaria',
    title: 'Fijaciones aeronáuticas',
    imageUrl: fastenersImg,
    imagePosition: '52% 46%',
    desc: 'Gestión y distribución de tornillos, tuercas, remaches y pines certificados bajo estándares internacionales para estructura primaria y secundaria.',
    tags: ['NAS', 'MS', 'ABS', 'BAC', 'AN', 'LN', 'CR'],
  },
  {
    id: 'bearings',
    eyebrow: '03 · motores y rotación',
    title: 'Rodamientos & cojinetes',
    imageUrl: bearingsImg,
    imagePosition: '54% 48%',
    desc: 'Componentes de rodadura conformes con especificaciones MS, M y ABS para aplicaciones de alta exigencia en motores y trenes de aterrizaje.',
    tags: ['Ball bearings', 'Rod ends', 'Spherical', 'Roller'],
  },
  {
    id: 'tools',
    eyebrow: '04 · producción y MRO',
    title: 'Herramientas aeronáuticas',
    imageUrl: toolsImg,
    imagePosition: '50% 50%',
    desc: 'Utillaje especializado para líneas de producción y MRO, con documentación de calibración y trazabilidad completa hasta el fabricante original.',
    tags: ['Hand tools', 'Power tools', 'Special tools', 'Calibración'],
  },
]

export default function Products() {
  return (
    <section id="actividad" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.52 }}
          className="mb-14 max-w-4xl md:mb-16"
        >
          <p className="activity-section-kicker">Líneas de actividad</p>
          <h2 className="activity-section-title">Especialización técnica en cada área de suministro</h2>
          <p className="activity-section-copy">
            Un recorrido más limpio y técnico: slider facetado, imagen insinuada en la composición
            y detalle documental siempre fuera de la fotografía.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.58, delay: 0.04 }}
        >
          <ActivityHoverSlider slides={slides} />
        </motion.div>
      </div>
    </section>
  )
}
