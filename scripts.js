const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const alternativas = ["a", "b", "c", "d"];
let pontuacao = 0;
let perguntaAtual = 0;

// Perguntas
const questions = [
  {
    question: "Qual desses nomes não era um casal?",
    answers: [
      {
        answer: "Jacó e Ana",
        correct: true,
      },
      {
        answer: "Isaque e Rebeca",
        correct: false,
      },
      {
        answer: "Abraão e Sara",
        correct: false,
      },
      {
        answer: "Pedro e Rute",
        correct: false,
      },
    ],
  },
  {
    question: "Onde Jacó Faleceu?",
    answers: [
      {
        answer: "Síria",
        correct: false,
      },
      {
        answer: "Egito",
        correct: true,
      },
      {
        answer: "Jericó",
        correct: false,
      },
      {
        answer: "Israel",
        correct: false,
      },
    ],
  },
  {
    question: "Qual dessas Parábolas Jesus não contou?",
    answers: [
      {
        answer: "A parábola do soldado prudente",
        correct: true,
      },
      {
        answer: "A parábola da drácma perdida",
        correct: false,
      },
      {
        answer: "A parabola do Juiz Iníquo",
        correct: false,
      },
      {
        answer: "Parábola do filho Pródigo",
        correct: false,
      },
    ],
  },
  {
    question: "O que é uma parábola?",
    answers: [
      {
        answer: "São Pequenas Histórias que explicam um conceito",
        correct: true,
      },
      {
        answer: "São Histórias poplares em forma de música",
        correct: false,
      },
      {
        answer: "São Histórias poplares em forma de Dança",
        correct: false,
      },
      {
        answer: "São um conjunto de lendas",
        correct: false,
      },
    ],
  },
  {
    question: "Quem foi o primeiro ser humano a nascer na terra?",
    answers: [
      {
        answer: "Caim",
        correct: true,
      },
      {
        answer: "Jesus",
        correct: false,
      },
      {
        answer: "Adão",
        correct: false,
      },
      {
        answer: "Davi",
        correct: false,
      },
    ],
  },
  {
    question: "Que personagem Bíblico era Ruivo?",
    answers: [
      {
        answer: "Davi",
        correct: true,
      },
      {
        answer: "Jesus",
        correct: false,
      },
      {
        answer: "Pedro",
        correct: false,
      },
      {
        answer: "Daniel",
        correct: false,
      },
    ],
  },
  {
    question: "Qual personagem bíblico era calvo e foi zombado por sua aparência?",
    answers: [
      {
        answer: "Moises",
        correct: false,
      },
      {
        answer: "Sansão",
        correct: false,
      },
      {
        answer: "Golias",
        correct: false,
      },
      {
        answer: "Eliseu",
        correct: true,
      },
    ],
  },
  {
    question: "Qual Alimento era restrito no jejum de Daniel?",
    answers: [
      {
        answer: "Frutas",
        correct: false,
      },
      {
        answer: "Vinho",
        correct: true,
      },
      {
        answer: "Carne de Porco",
        correct: false,
      },
      {
        answer: "Legumes",
        correct: false,
      },
    ],
  },
  {
    question: "Quem apareceu no monte da transfiguração junto com jesus?",
    answers: [
      {
        answer: "Abraão e moisés",
        correct: false,
      },
      {
        answer: "Jacó e Esaú",
        correct: false,
      },
      {
        answer: "Moisés e Elias",
        correct: true,
      },
      {
        answer: "Elias e Eliseu",
        correct: false,
      },
    ],
  },
  {
    question: "O nome Adão, 'adam' em hebráico siginifica: ",
    answers: [
      {
        answer: "Primeiro, primogênito",
        correct: false,
      },
      {
        answer: "Pai, patriarca",
        correct: false,
      },
      {
        answer: "semelhante, parecido",
        correct: false,
      },
      {
        answer: "Solo, terra",
        correct: true,
      },
    ],
  },


];

// Função que inicia o jogo
function init() {
  createQuestion(0);
}

function createQuestion(i) {
  // i = 0
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector("#question-txt");
  const questionNumber = question.querySelector("#question-number");

  questionText.innerText = questions[i].question;
  questionNumber.innerText = i + 1;

  // Criar o template do botão do quizz
  questions[i].answers.forEach(function (answer, i) {

    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerTxt = answerTemplate.querySelector('.question-answer');

    letterBtn.innerText = alternativas[i];
    answerTxt.innerText = answer.answer;

    answerTemplate.setAttribute("correct-answer", answer.correct);

    // Remover o hide e answer template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserindo a pergunta no answersbox
    answersBox.appendChild(answerTemplate);

    // Inserindo evento de click no botão
    answerTemplate.addEventListener('click', function () {
        checkAnswer(answerTemplate);
    })


  });
  // Incrementando a pergunta atual
  perguntaAtual++;
}

// Verificando a resposta do usuário
function checkAnswer(btn) {
    const buttons = answersBox.querySelectorAll("button");

    buttons.forEach(function (button) {
        if (button.getAttribute("correct-answer") == "true") {
            button.classList.add("correct-answer");

            // Checa se o usuário acertou a perguntou 
            if (btn == button) {
                pontuacao++;
            }
        }
        else {
            button.classList.add("wrong-answer");
        }
    });

    nextQuestion();
}

function nextQuestion(){
    setTimeout(function() {

        if (perguntaAtual >= questions.length){

            showResult();
            return;
        }
        createQuestion(perguntaAtual);
    }, 700);
}

function showResult(){


    const score = ((pontuacao / questions.length)* 100).toFixed(2);

    const displayScore = document.querySelector('#display-score');
    displayScore.innerText = score;

    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.innerText = pontuacao;

    const qtd = document.querySelector('#questions-qtd');
    qtd.innerText = questions.lenght;

    hideOrShowQuizz();
}

function hideOrShowQuizz(){
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// Reiniciar o quizz
const restart = document.querySelector("#restart");

restart.addEventListener("click", function () {
  pontuacao = 0;
  perguntaAtual = 0;
  hideOrShowQuizz();
  init();
});

init();
