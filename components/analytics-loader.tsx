'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function AnalyticsLoader() {
  const [consent, setConsent] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consentValue = localStorage.getItem('cookie_consent')
      setConsent(consentValue)
      if (consentValue === 'accepted' && !loaded) {
        setLoaded(true)
      }
    }

    checkConsent()

    const handleCookieAccepted = () => {
      setConsent('accepted')
      if (!loaded) {
        setLoaded(true)
      }
    }

    window.addEventListener('cookieAccepted', handleCookieAccepted)
    return () => window.removeEventListener('cookieAccepted', handleCookieAccepted)
  }, [loaded])

  if (!loaded) return null

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPZ3LQK8');`}
      </Script>

      {/* Google Analytics 4 and Google Ads are configured INSIDE the GTM container above.
          The container was inspected on 2026-08-30 and already carries a Google tag for
          G-G53L4J28WK and AW-18234638471, plus a Conversion Linker. Loading gtag.js here as
          well ran a second config for the same measurement ID, so every visit produced two
          page_view hits in GA4. The direct snippet is deliberately gone — add tags in GTM.
          The Meta Pixel stays here because the container has no Facebook tag. */}

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1251813450482768');
fbq('track', 'PageView');`}
      </Script>

      {/* Vercel analytics are also consent-gated for a consistent privacy posture. */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
