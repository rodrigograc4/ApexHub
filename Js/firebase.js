// NOTIFICATION

// Importando Firebase
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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

    // Enviar token para o servidor
    await sendTokenToServer(token);
  } else {
    console.log('Não foi possível obter permissão para enviar notificações.');
  }
}

const firestore = getFirestore(app);

// Função para salvar o token no Firestore
async function sendTokenToServer(token) {
  try {
    const docRef = await addDoc(collection(firestore, "tokens"), {
      token: token,
    });
    console.log("Token salvo com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao salvar o token: ", e);
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

// Função para recuperar tokens do Firestore
async function getTokensFromServer() {
    const querySnapshot = await getDocs(collection(firestore, "tokens"));
    const tokens = [];
    querySnapshot.forEach((doc) => {
      tokens.push(doc.data().token);
    });
    console.log('Tokens:', tokens);
    return tokens;
  }
  
  // Função para enviar notificações
  async function sendNotificationToAll(title, body) {
    const tokens = await getTokensFromServer();
    
    tokens.forEach(token => {
      const notificationOptions = {
        body: body,
        icon: 'Images/ApexIcon_v2-01.png',
        tag: token  // Usando o token como tag para evitar duplicatas
      };

      console.log('Enviando notificação para:', token);
      
      new Notification(title, notificationOptions);
    });
  }
  

  document.getElementById('notificar').addEventListener('click', () => {
    console.log('Notificando todos os usuários...');
    
    const notificationTitle = 'Notificação de Teste';
    const notificationBody = 'Esta é uma notificação de teste.';
  
    sendNotificationToAll(notificationTitle, notificationBody);
  });
  