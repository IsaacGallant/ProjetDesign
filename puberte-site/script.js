document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  const chatForm = document.querySelector('#chat-form');
  if (chatForm) {
    const chatHistory = document.querySelector('#chat-history');
    const chatInput = document.querySelector('#chat-input');
    const examples = document.querySelectorAll('.example-questions button');

    const responses = [
      {
        keywords: ['bouton', 'acné', 'peau'],
        text: 'Les boutons sont très courants pendant la puberté. Ils apparaissent car ta peau produit plus de sébum. Nettoie ton visage doucement, évite de toucher tes boutons, et si cela te gêne beaucoup, parle avec une infirmière ou un dermatologue.'
      },
      {
        keywords: ['poils', 'corps', 'pilosité'],
        text: 'Les poils apparaissent dans de nouvelles zones parce que ton corps produit des hormones. C’est normal, et chacun·e a son propre rythme. Tu peux choisir d’avoir une routine de toilettage qui te convient.'
      },
      {
        keywords: ['voix', 'grandir', 'taille'],
        text: 'La croissance et la voix sont liées aux hormones. Tu peux grandir d’un coup ou progressivement. Si tu es inquiet·ète, parle-en à ta famille ou à un médecin pour vérifier que tout évolue bien.'
      },
      {
        keywords: ['humeur', 'triste', 'stress', 'colère'],
        text: 'Les humeurs changent souvent pendant la puberté. C’est normal de se sentir fatigué·e, anxieux·se, content·e ou en colère. Prendre du recul, en parler et faire des activités que tu aimes peut aider.'
      },
      {
        keywords: ['relation', 'amour', 'amitié', 'couple'],
        text: 'Les relations évoluent pendant l’adolescence. Tu peux avoir de nouveaux sentiments ou te poser des questions sur l’amitié et l’amour. Sois authentique, respecte tes limites et parle avec quelqu’un si tu as besoin.'
      },
      {
        keywords: ['parler', 'aide', 'adultes', 'parents'],
        text: 'Parler de ce que tu vis peut aider beaucoup. Choisis un adulte en qui tu as confiance, un ami proche ou un professionnel de santé. Dire ce que tu ressens n’est pas une faiblesse.'
      }
    ];

    function addMessage(role, text) {
      const message = document.createElement('div');
      message.className = `message ${role}`;
      message.textContent = text;
      chatHistory.appendChild(message);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function getResponse(question) {
      const cleaned = question.toLowerCase();
      for (const item of responses) {
        if (item.keywords.some(keyword => cleaned.includes(keyword))) {
          return item.text;
        }
      }
      return 'Je ne connais pas encore la réponse exacte à ta question, mais essaie de la reformuler ou regarde les pages du site pour plus d’informations. Si tu veux, je peux te proposer des thèmes à explorer.';
    }

    chatForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const question = chatInput.value.trim();
      if (!question) {
        return;
      }
      addMessage('user', question);
      chatInput.value = '';
      const answer = getResponse(question);
      setTimeout(() => addMessage('bot', answer), 400);
    });

    examples.forEach(button => {
      button.addEventListener('click', function () {
        const question = this.textContent.trim();
        chatInput.value = question;
        chatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      });
    });
  }
});
