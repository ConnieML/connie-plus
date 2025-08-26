import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Twilio WebChat SDK - Static Loading (Support's Recommendation) */}
        <script 
          defer 
          src="https://media.twiliocdn.com/sdk/js/webchat-v3/releases/3.3.0/webchat.min.js" 
          integrity="sha256-ydLLXnNrb26iFUvKAHsYt9atwfzz0LNcgBmo0NmD5Uk=" 
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}