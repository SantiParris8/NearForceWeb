import './globals.css'

export const metadata = {
  title: 'NearForce - Salesforce Excellence',
  description: 'Leading Salesforce consulting firm delivering exceptional CRM solutions.',
  icons: {
    icon: '/NearForceWeb/favicon.ico', // Now directly in public folder
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/NearForceWeb/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}