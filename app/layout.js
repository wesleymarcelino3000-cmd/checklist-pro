import './globals.css';

export const metadata = {
  title: 'Checklist Pro',
  description: 'Checklist profissional com sincronização via Vercel Blob',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  appleWebApp: {
    capable: true,
    title: 'Checklist Pro',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  themeColor: '#0b0f14',
  colorScheme: 'dark',
};

const swScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  });
}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </body>
    </html>
  );
}
