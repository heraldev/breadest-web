const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/trigoymiel',
    path: 'M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10.5H7.5v3H10V21h3.5z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/trigoymiel',
    path: 'M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4.9-4.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM12 4.6c2.4 0 2.7 0 3.6.05.9.04 1.5.18 1.86.32.44.17.77.37 1.1.7.34.34.55.67.72 1.11.14.36.28.96.32 1.86.05.9.05 1.2.05 3.36s0 2.47-.05 3.36c-.04.9-.18 1.5-.32 1.86a3 3 0 0 1-.72 1.11 3 3 0 0 1-1.1.7c-.36.14-.96.28-1.86.32-.9.05-1.2.05-3.6.05s-2.7 0-3.6-.05c-.9-.04-1.5-.18-1.86-.32a3 3 0 0 1-1.1-.7 3 3 0 0 1-.72-1.11c-.14-.36-.28-.96-.32-1.86-.05-.9-.05-1.2-.05-3.36s0-2.46.05-3.36c.04-.9.18-1.5.32-1.86.17-.44.38-.77.72-1.11.33-.33.66-.53 1.1-.7.36-.14.96-.28 1.86-.32.9-.05 1.2-.05 3.6-.05z',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/524421234567',
    path: 'M12 4a8 8 0 0 0-6.9 12l-1 3.6 3.7-1A8 8 0 1 0 12 4zm4.6 11.4c-.2.5-1.1 1-1.5 1.1-.4.1-.9.1-1.4-.1-.3-.1-.8-.3-1.3-.6-2.3-1-3.8-3.3-3.9-3.5-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.9c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 1.9 1.2 2.2 1.4.3.1.4.1.6-.1.2-.2.7-.8.8-1 .2-.2.3-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3.1.2.1.6-.1 1.1z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@trigoymiel',
    path: 'M16.6 5.2c.7.9 1.7 1.5 2.9 1.7v2.6a6.6 6.6 0 0 1-2.9-.8v5.6a4.9 4.9 0 1 1-4.9-4.9c.2 0 .4 0 .6.03v2.7a2.2 2.2 0 1 0 1.6 2.1V4h2.7c0 .4 0 .8 0 1.2z',
  },
]

/**
 * Fila de íconos de redes sociales. Cada uno redirige al sitio real de la red
 * en una pestaña nueva.
 */
function SocialIcons({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="flex h-9 w-9 items-center justify-center border border-wheat/40 text-cream transition-colors hover:border-caramel hover:bg-caramel hover:text-espresso"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d={s.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SocialIcons
