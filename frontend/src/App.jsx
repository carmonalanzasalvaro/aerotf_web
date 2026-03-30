import { ThemeProvider } from './context/ThemeContext'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Stats      from './components/Stats'
import Products   from './components/Products'
import Quality    from './components/Quality'
import MapSection from './components/MapSection'
import Footer     from './components/Footer'
import ThemePicker from './components/ThemePicker'

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Products />
          <Quality />
          <MapSection />
        </main>
        <Footer />
        {import.meta.env.DEV && <ThemePicker />}
      </div>
    </ThemeProvider>
  )
}