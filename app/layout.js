import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Vasu Art Work - Fine Art Studio',
  description: 'Elena Vasari — Fine Art Studio. Original oil paintings, watercolors, and mixed media works available for collectors worldwide.',
  keywords: 'fine art, oil paintings, original artwork, art gallery, buy paintings online, Elena Vasari',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
