// chat-embed.js — centralise la config et charge le script Chatbase
window.chatbaseConfig = window.chatbaseConfig || { chatbotId: "kb9lUeZiS5_bIBaRHfCw6" };
(function(){
  if(document.getElementById(window.chatbaseConfig.chatbotId)) return;
  const s = document.createElement('script');
  s.src = 'https://www.chatbase.co/embed.min.js';
  s.id = window.chatbaseConfig.chatbotId;
  s.defer = true;
  document.head.appendChild(s);
})();
