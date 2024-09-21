const loadingScreen = {
  element: document.querySelector(".loading-overlay"),
  heading: null,
  headingText: '',
  colorInterval: null,

  show(){
    this.element.style.display = "flex";
    this.colorize();
  },

  hide(){
    this.element.style.display = "none";
    clearInterval(this.colorInterval);
    this.heading.innerHTML = '';
    this.heading.textContent = this.headingText;
  },
  //Seizure Warning??
  colorize(){
    let headingTextLength = this.heading.textContent.length;
    const colors = [' #39FF14', '#00FFFF', '#FFFF00', '#FF0000', '#FF33F6', '#FF00FF', '#FF8433', '#FFBD33'];
    
    function changeColor(letter) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      letter.style.color = randomColor;
    }

    this.heading.innerHTML = '';

    for(let i=0; i<headingTextLength; i++){
      const spanElem = document.createElement('span');
      spanElem.className="anim-letter";
      spanElem.textContent = this.headingText[i];

      this.heading.appendChild(spanElem);
      
      this.colorInterval = setInterval( () => changeColor(spanElem), 10);


    }
  },

  init(){
    this.heading = this.element.querySelector('h1');
    this.headingText = this.heading.textContent;
    this.hide();
  }
};


function getFetch(){
  const url = `https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple`

  loadingScreen.show();
  var fetchData = function(){
    fetch(url)
    .then(res => res.json())
    .then(data =>formatData(data))
    .then(() => loadingScreen.hide())
    .catch(error=>setTimeout(fetchData, 4000));
  };

  fetchData();
}

function formatData(data){

  let dataObj = data.results[0];
  let question = dataObj.question;
  let correctAnswers = dataObj.correct_answer;
  let incorrectAnswers = dataObj.incorrect_answers;
  let allAnswers = incorrectAnswers.concat(correctAnswers);

  // correctly formatting special characters in the 'question'
  question = question
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&ouml;/g, 'ö');

  // Shuffle the allAnswers array 🔀
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }

  displayEverything(question, correctAnswers, allAnswers);

}


function displayEverything(question, correctAnswer, answers){
  let displayQuestionDiv = document.querySelector('.displayQuestion');
  let displayAnswers = document.querySelector('.displayAnswers');
  let correctOrNot = document.querySelector('.hideUntilAnswered');
  
  displayQuestionDiv.innerHTML = question;
  displayAnswers.textContent = ''; // clear previous answers

  answers.forEach(answer => {
    answerParagraph = document.createElement('p');
    answerParagraph.textContent = answer;
    displayAnswers.appendChild(answerParagraph);
    answerParagraph.style = 'cursor: pointer;';

    answerParagraph.addEventListener('click', function(){
      if(this.textContent === correctAnswer){
        alert('Correct!');
        setTimeout(() => {
          getFetch();
        }, 2000)
      }
      else{
        alert('Wrong!');
        setTimeout(() => {
          getFetch();
        }, 2000)
      }
    })
  })

}

function init(){
  loadingScreen.init();
  document.querySelector('.getQuestion').addEventListener('click', getFetch)
}
init();