Promise.all([
  import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'),
  import('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js')
]).then(([firebaseApp, firebaseMessaging]) => {
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

  // Inicializa o Firebase
  const app = firebaseApp.initializeApp(firebaseConfig);
  const messaging = firebaseMessaging.getMessaging(app);

  // Manipulador de Mensagens em Segundo Plano
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Recebida mensagem em segundo plano', payload);

    // Personalize a notificação conforme necessário
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'Images/ApexIcon_v2-01.png'
    };

    // Mostra a notificação
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
});
