// Importa os scripts do Firebase
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js');

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDJqIRd11jCSzx64_8dpWPVpIdNFzl07RE",
    authDomain: "apexhub-f1.firebaseapp.com",
    projectId: "apexhub-f1",
    storageBucket: "apexhub-f1.appspot.com",
    messagingSenderId: "931355642260",
    appId: "1:931355642260:web:a439e04c49bf8d5d1fa781",
    measurementId: "G-0KWSCPC724"
};

// VAPID Key
const vapidKey = "BPvCrGZMQ0lw0DjkCAIvYpmmo9Mwwv69hizLIoh6aliJ5VkICoF8HDdo_I9sTtNwXiyxS0x9hbfdJAQs52utEDU"; // Sua chave VAPID

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Obtém uma instância do Firebase Messaging para manipular mensagens em background
const messaging = firebase.messaging();

// Manipulador de mensagens em background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize a notificação conforme necessário
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'Images/ApexIcon_v2-01.png'
  };

  // Exibe a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});
