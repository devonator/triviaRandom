document.querySelector('.getQuestion').addEventListener('click', getFetch)


function getFetch(){
  const url = `https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      formatData(data)
  })
}

function formatData(data){
  let question = data.results[0].question
  let correctAnswers = data.results[0].correct_answer
  let incorrectAnswers = data.results[0].incorrect_answers
  let allAnswers = incorrectAnswers.concat(correctAnswers)

  // correctly formatting special characters in the 'question'
  question = question
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&ouml;/g, 'ö')

  // Shuffle the allAnswers array 🔀
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }

  displayEverything(question, correctAnswers, allAnswers)

}


function displayEverything(question, correctAnswer, answers){
  let displayQuestionDiv = document.querySelector('.displayQuestion')
  let displayAnswers = document.querySelector('.displayAnswers')
  let correctOrNot = document.querySelector('.hideUntilAnswered')
  
  displayQuestionDiv.innerHTML = question
  displayAnswers.textContent = '' // clear previous answers

  answers.forEach(answer => {
    answerParagraph = document.createElement('p')
    answerParagraph.textContent = answer
    displayAnswers.appendChild(answerParagraph)
    answerParagraph.style = 'cursor: pointer;'

    answerParagraph.addEventListener('click', function(){
      if(this.textContent === correctAnswer){
        alert('Correct!')
        setTimeout(() => {
          getFetch()
        }, 2000)
      }
      else{
        alert('Wrong!')
        setTimeout(() => {
          getFetch()
        }, 2000)
      }
    })
  })
  console.log(correctAnswer)

}
