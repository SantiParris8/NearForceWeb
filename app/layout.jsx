import './globals.css'

export const metadata = {
  title: 'NearForce - Salesforce Consulting Excellence',
  description: 'Leading Salesforce consulting firm delivering exceptional CRM solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}