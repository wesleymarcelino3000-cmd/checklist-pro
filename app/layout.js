import './globals.css';

export const metadata = {
  title: 'Checklist Pro',
  description: 'Checklist profissional com sincronização via Vercel Blob',
};

export const viewport = {
  themeColor: '#0b0f14',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
