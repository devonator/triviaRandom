document.querySelector('.getQuestion').addEventListener('click', getFetch);
document.querySelector('.showAns').addEventListener('click', showAnswer)


function showAnswer(){
  document.querySelector('ul').classList.toggle('hidden')
}

function getFetch(){
  const url = `https://opentdb.com/api.php?amount=1&difficulty=easy`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let questionContainer = document.querySelector('.displayQuestion')
      let answerContainer = document.querySelector('.displayAnswer')
      let categoryContainer = document.querySelector('span')
      let question = data.results[0].question
      .replaceAll('&quot;', '"')
      .replaceAll("&#039;", "'")
      .replaceAll('&amp;', '&') // characters & " ' do not render properly when pulled from the API. there must be a better way to to this. will come back to later
      let answer = data.results[0].correct_answer
      .replaceAll('&quot;', '"')
      .replaceAll("&#039;", "'")
      .replaceAll('&amp;', '&')
      let category = data.results[0].category
      let questionType = data.results[0].type

      questionContainer.innerText = question
      categoryContainer.innerText = `Category: ${category}`

      document.querySelector('ul').textContent = ''
      const li = document.createElement('li')
      li.textContent = answer
      document.querySelector('ul').appendChild(li)
        

        // this part displays all incorrect answers. I'll come back to this later. I would like to style the correct answer green when the user clicks anywhere within the ul. maybe turn the incorrect answers red, too.
        
      // if(questionType === 'multiple'){
      //   let multipleChoice = data.results[0].incorrect_answers

      //   multipleChoice.forEach(el => {
      //     const li = document.createElement('li')
      //     li.textContent = el
      //     document.querySelector('ul').appendChild(li)
      //   })
      // }
        
      document.querySelector('ul').classList.add('hidden')
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}