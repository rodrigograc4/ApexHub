// importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// firebase.initializeApp({
//   apiKey: "AIzaSyDJqIRd11jCSzx64_8dpWPVpIdNFzl07RE",
//   authDomain: "apexhub-f1.firebaseapp.com",
//   projectId: "apexhub-f1",
//   storageBucket: "apexhub-f1.appspot.com",
//   messagingSenderId: "931355642260",
//   appId: "1:931355642260:web:a439e04c49bf8d5d1fa781",
//   measurementId: "G-0KWSCPC724"
// });

// const messaging = firebase.messaging();

// console.log('[firebase-messaging-sw.js] Inicializando firebase-messaging-sw.js');

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Recebida mensagem em segundo plano', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//       body: payload.notification.body,
//       icon: 'https://rodrigograc4.github.io/ApexHub-F1/Images/ApexIcon_v2-01.png'
//   };

//   console.log('[firebase-messaging-sw.js] Exibindo notificação', notificationTitle);

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
