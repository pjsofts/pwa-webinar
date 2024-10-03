const webpush = require("web-push");

// VAPID keys
const publicVapidKey =
  "BB4GUgHL5_Goi7U2QqaFs2mHK4hIn2emVf3CgqzjMZH8Nf7MIqyhdLwmoSzq_xXu73XhFz-9G9Q0Tpn-z1Z74k4";
const privateVapidKey = "HDs7qcB7fnSoNgZVcFYI7I9HA7mZ19zlZr3CzkSeC94";

webpush.setVapidDetails("https://localhost:5500", publicVapidKey, privateVapidKey);

// Subscription object (from the client)
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fyQ_9z9ogyo:APA91bFtMNMkfhpZIUxwJS0-BHjDl3IDBksQSRDi9jI6e8dR2LuxOTyh8kmJ3mvaFFI3AGAGGnXQfFJfs7bHr1YuggdFY5DYgjVg5-D_MurIyw3akM-axyHcmDvJ-naon1VxQmIKZj2J",
  expirationTime: null,
  keys: {
    p256dh:
      "BG6OPCEro1qQt_7ag5Yb-0kDY8jThFzo79pG5tgdK26GPUzcE9R5QYFiosfWwS-lCOtUiuEJH2BUN899Irw0DuU",
    auth: "ky8l08aGFBXcoN1Mg5gsWQ",
  },
};

// Payload to send
const payload = JSON.stringify({
  title: "PWA Webinar Push test",
  body: "This is a push notification test webinar.",
});

// Send Notification
webpush
  .sendNotification(pushSubscription, payload)
  .then((response) => console.log("Push notification sent:", response))
  .catch((error) => console.error("Error sending notification:", error));
