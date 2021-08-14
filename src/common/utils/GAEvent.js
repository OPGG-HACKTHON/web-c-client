// https://developers.google.com/analytics/devguides/collection/analyticsjs/events

// TODO: userID 추가
// https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id
// https://support.google.com/analytics/answer/3123663

export const sendGAEvent = (category, action, label, value, options) => {
  if (typeof window.ga === 'function') {
    window.ga('send', 'event', category, action, label, value, options);
  }
};
