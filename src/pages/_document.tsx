import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* DNS prefetch for external resources */}
          <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//www.clarity.ms" />

          {/* Preconnect for critical external resources */}
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />

          {/* 代码高亮样式 - 使用preload + onload for non-blocking */}
          <link
            rel="preload"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
            as="style"
            onLoad={(e) => {
              const target = e.target as HTMLLinkElement;
              target.onload = null;
              target.rel = 'stylesheet';
            }}
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
            />
          </noscript>

          {/* Google Analytics */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
            </>
          )}

          {/* Microsoft Clarity */}
          {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID &&
            process.env.NODE_ENV === 'production' && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
                }}
              />
            )}

          {/* Umami Analytics - Only in production */}
          {process.env.NODE_ENV === 'production' &&
            process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID &&
            process.env.NEXT_PUBLIC_UMAMI_URL && (
              <script
                async
                src={process.env.NEXT_PUBLIC_UMAMI_URL}
                data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
              />
            )}
        </Head>
        <body className="font-bold">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
