export default function manifest() {
  return {
    name: 'Checklist Pro',
    short_name: 'Checklist Pro',
    description: 'Checklist profissional para organizar e acompanhar tarefas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f14',
    theme_color: '#0b0f14',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
  };
}
