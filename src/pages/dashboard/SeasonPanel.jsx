
import { useEffect, useState } from 'react'
import {
  getBannerTemporada,
  actualizarBannerTemporada
} from '../../services/editorService.js'

export default function SeasonPanel() {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getBannerTemporada()
      .then(setActive)
      .catch(err =>
        setError(err.error || 'No se pudo consultar el banner')
      )
      .finally(() => setLoading(false))
  }, [])

  async function toggleBanner() {
    const next = !active
    setSaving(true)
    setError('')

    try {
      await actualizarBannerTemporada(next)
      setActive(next)
    } catch (err) {
      setError(err.error || 'No se pudo actualizar el banner')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-2xl border border-wheat/40 bg-cream p-6 shadow-lg">
      <h2 className="font-display text-2xl font-bold text-espresso">
        Actualización de Temporada
      </h2>

      <p className="mt-2 text-sm text-roast/70">
        Activa o desactiva el banner de temporada del sitio web.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-wheat/20 p-5">
        <div>
          <h3 className="font-semibold text-espresso">
            Especial de Temporada
          </h3>
          <p className="text-sm text-roast/70">
            {loading
              ? 'Cargando...'
              : active ? 'Promoción activa' : 'Promoción inactiva'}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleBanner}
          disabled={loading || saving}
          role="switch"
          aria-checked={active}
          aria-label="Activar banner de temporada"
          className={`relative h-8 w-14 rounded-full transition-colors disabled:opacity-50 ${
            active ? 'bg-caramel' : 'bg-wheat/70'
          }`}
        >
          <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
            active ? 'left-7' : 'left-1'
          }`} />
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-wheat/40 p-5 text-center">
        <span className="text-sm font-semibold text-espresso">
          {active
            ? '❄️ Temporada ACTIVA'
            : '🍞 Temporada INACTIVA'}
        </span>
      </div>
    </section>
  )
}
