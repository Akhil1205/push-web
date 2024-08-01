var webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: 'BGWDYQe9M09Kkr_bcwf_HeJJ4zE4OvO0JkOfJ-_R4jgCqS1ua_TgXV3tyes3kh0vd3b1o7lmDhBuMoX8XnYznBk',
  privateKey: 'D9RVP6BfO-ihzIeaLQpwxVYkUf5tmWI-BpbeM40TwLU'
};

webpush.setVapidDetails(
  'Akhileswar.Reddy@target.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
// const pushSubscription = {
//   endpoint: '.....',
//   keys: {
//     auth: '.....',
//     p256dh: '.....'
//   }
// };

webpush.sendNotification(pushSubscription, 'Your Push Payload Text');

// var vap = webpush.generateVAPIDKeys();
// console.log(vap);