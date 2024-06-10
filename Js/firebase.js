// NOTIFICATION

// Importando Firebase
import { doc } from "firebase/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Solicitando permissão
async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Permissão de notificação concedida.');
    // Corrigindo a chamada ao getToken
    const token = await getToken(messaging, { vapidKey: "BPvCrGZMQ0lw0DjkCAIvYpmmo9Mwwv69hizLIoh6aliJ5VkICoF8HDdo_I9sTtNwXiyxS0x9hbfdJAQs52utEDU" });
    console.log('Token:', token);
  } else {
    console.log('Não foi possível obter permissão para enviar notificações.');
  }
}

requestPermission();

// Lidando com mensagens recebidas quando o aplicativo está em primeiro plano
onMessage(messaging, (payload) => {
  console.log('Em Primeiro Plano:', payload);
  // Personalizando a notificação aqui
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'Images/ApexIcon_v2-01.png'
  };

  // Exibindo a notificação
  new Notification(notificationTitle, notificationOptions);
});



document.getElementById('notificar').addEventListener('click', () => {
    const notificationTitle = 'Notificação de Teste';
    const notificationOptions = {
        body: 'Esta é uma notificação de teste.',
        icon: 'Images/ApexIcon_v2-01.png'
    };
    
    new Notification(notificationTitle, notificationOptions);
    });
    