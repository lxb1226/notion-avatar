/* eslint-disable func-names, no-param-reassign, prefer-rest-params, prefer-destructuring */

export const initClarity = () => {
  if (
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID &&
    process.env.NODE_ENV === 'production'
  ) {
    // Microsoft Clarity script injection
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = `https://www.clarity.ms/tag/${i}`;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(
      window,
      document,
      'clarity',
      'script',
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    );
  }
};

export const identify = (userId, userHint) => {
  if (
    typeof window !== 'undefined' &&
    window.clarity &&
    process.env.NODE_ENV === 'production'
  ) {
    window.clarity('identify', userId, userHint);
  }
};

export const event = (eventName) => {
  if (
    typeof window !== 'undefined' &&
    window.clarity &&
    process.env.NODE_ENV === 'production'
  ) {
    window.clarity('event', eventName);
  }
};

export const consent = (hasConsent) => {
  if (
    typeof window !== 'undefined' &&
    window.clarity &&
    process.env.NODE_ENV === 'production'
  ) {
    window.clarity('consent', hasConsent);
  }
};
