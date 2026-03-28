export default function Footer() {
  return (
    <footer className="py-10 mt-8" style={{ borderTop: '1px solid var(--border-faint)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row
                      items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded flex items-center justify-center
                           text-white font-black text-xs"
                style={{ background: 'var(--accent)' }}>AT</span>
          <span className="text-sm tracking-widest uppercase"
                style={{ color: 'var(--text-faint)' }}>
            Aero<span style={{ color: 'var(--accent)' }}>TF</span>
          </span>
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--text-ghost)' }}>
          © {new Date().getFullYear()} Aerospace Tools & Fasteners S.L. — Las Rozas, Madrid
        </p>
        <p className="text-xs" style={{ color: 'var(--text-ghost)' }}>
          ENAC · FAA · EASA
        </p>
      </div>
    </footer>
  )
}