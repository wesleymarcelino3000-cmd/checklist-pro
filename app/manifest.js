export default function manifest() {
  return {
    name: 'Checklist Pro',
    short_name: 'Checklist Pro',
    description: 'Checklist profissional para organizar e acompanhar tarefas.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0b0f14',
    theme_color: '#0b0f14',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
    ],
  };
}
