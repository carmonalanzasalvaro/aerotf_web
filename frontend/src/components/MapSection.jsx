import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useTheme, themes } from '../context/ThemeContext'
import { MapPin, Phone, Mail } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow })

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
}
const POS = [40.4935, -3.8752]

const contactItems = [
  { icon: MapPin, label: 'Dirección', value: 'P.I. Europolis, Bristol 14B — Las Rozas, Madrid' },
  { icon: Phone, label: 'Teléfono', value: '+34 916 388 377' },
  { icon: Mail, label: 'Email', value: 'info@aerotf.com' },
]

export default function MapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { theme } = useTheme()
  const tileMode = themes[theme]?.vars['--map-tiles'] || 'light'

  return (
    <section id="contacto" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            Ubicación & Contacto
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
            Dónde encontrarnos
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Operamos desde Las Rozas, Madrid, con atención técnica y comercial para suministro
            aeronáutico certificado, programas de defensa y operaciones MRO.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-[2rem] mb-6"
          style={{ height: '460px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--card-stroke)' }}
        >
          <div className="h-full w-full" style={{ background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)', padding: '14px' }}>
            <div className="h-full w-full overflow-hidden rounded-[1.45rem]" style={{ border: '1px solid var(--border-faint)' }}>
              <MapContainer center={POS} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer key={tileMode} url={TILES[tileMode]} attribution='&copy; <a href="https://carto.com">CARTO</a>' />
                <Marker position={POS}>
                  <Popup>
                    <strong>AeroTF</strong>
                    <br />
                    P.I. Europolis, Bristol 14B
                    <br />
                    Las Rozas, Madrid
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {contactItems.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 + i * 0.08 }}
              className="rounded-[1.35rem] px-5 py-5 flex items-center gap-4"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-stroke)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0" style={{ background: 'var(--accent-bg)', border: '1px solid var(--border-soft)' }}>
                <Icon size={16} style={{ color: 'var(--accent)' }} strokeWidth={1.6} />
              </div>
              <div>
                <p className="mb-0.5 text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)' }}>
                  {label}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
