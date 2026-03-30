import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon   from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useTheme, themes } from '../context/ThemeContext'
import { MapPin, Phone, Mail } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow })

const TILES = {
  dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
}
const POS = [40.4935, -3.8752]

const contactItems = [
  { icon: MapPin, label: 'Dirección', value: 'P.I. Europolis, Bristol 14B — Las Rozas, Madrid' },
  { icon: Phone,  label: 'Teléfono',  value: '+34 916 388 377' },
  { icon: Mail,   label: 'Email',     value: 'info@aerotf.com' },
]

export default function MapSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { theme } = useTheme()
  const tileMode  = themes[theme]?.vars['--map-tiles'] || 'dark'

  return (
    <section id="contacto" className="py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs tracking-widest uppercase font-semibold mb-3"
             style={{
               color: 'var(--accent)',
               fontFamily: "'JetBrains Mono', monospace",
             }}>
            Ubicación & Contacto
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient leading-tight"
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                letterSpacing: '-0.03em',
              }}>
            Dónde encontrarnos
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-2xl overflow-hidden mb-6"
          style={{ height: '460px' }}
        >
          <MapContainer center={POS} zoom={15}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={false}>
            <TileLayer key={tileMode} url={TILES[tileMode]}
                       attribution='&copy; <a href="https://carto.com">CARTO</a>' />
            <Marker position={POS}>
              <Popup>
                <strong>AeroTF</strong><br />
                P.I. Europolis, Bristol 14B<br />Las Rozas, Madrid
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {contactItems.map(({ icon: Icon, label, value }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="glass rounded-xl px-6 py-5 flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                   style={{
                     background: 'var(--accent-bg)',
                     border: '1px solid rgba(200,16,46,0.18)',
                   }}>
                <Icon size={16} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-0.5"
                   style={{
                     color: 'var(--text-ghost)',
                     fontFamily: "'JetBrains Mono', monospace",
                   }}>
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