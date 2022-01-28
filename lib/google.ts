// TODO: Move google constants to .env, was having issues with process.env
//       outside of pages earlier, which is why I have it like this

// Google Analytics tracking id
export const GA_TRACKING_ID = "G-JQED345CE5";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  // If the user navigates before gtag is loaded we error, so we nullcheck
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Google client id, used for signin
export const GOOGLE_CLIENT_ID =
  "688338426307-s4v1qoj1kiinfkc6f5ibdd8sjm8l8kie.apps.googleusercontent.com";
