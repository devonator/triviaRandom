document.querySelector(".getQuestion").addEventListener("click", getFetch);
document.querySelector(".showAns").addEventListener("click", showAnswer);

function showAnswer() {
  document.querySelector("ul").classList.toggle("hidden");
  console.log("working");
}

function getFetch() {
  const url = `https://opentdb.com/api.php?amount=1&difficulty=easy`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      let questionContainer = document.querySelector(".displayQuestion");
      // let answerContainer = document.querySelector(".displayAnswer");
      let categoryContainer = document.querySelector("span");
      let question = data.results[0].question
        .replaceAll("&quot;", '"')
        .replaceAll("&#039;", "'")
        .replaceAll("&amp;", "&"); // characters & " ' do not render properly when pulled from the API. will come back to later. *thumbsup.jpg*
      let answer = data.results[0].correct_answer
        .replaceAll("&quot;", '"')
        .replaceAll("&#039;", "'")
        .replaceAll("&amp;", "&")
        .toString();
      let category = data.results[0].category;
      let questionType = data.results[0].type;

      questionContainer.innerText = question;
      categoryContainer.innerText = `Category: ${category}`;

      // document.querySelector('li').addEventListener('click', colorChange)
      //     function colorChange(){
      //       answer.style.background = 'green'
      //     }

      document.querySelector("ul").textContent = ""; // clears previous answers

      if (questionType === "multiple") {
        // let answer = data.results[0].correct_answer
        // .replaceAll("&quot;", '"')
        // .replaceAll("&#039;", "'")
        // .replaceAll("&amp;", "&");
        multipleAnswers = data.results[0].incorrect_answers;
        multipleAnswers.push(answer);

        function shuffle(arrOfAnswers) {
          // shuffles the new array of answers after adding the correct answer
          for (let i = arrOfAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arrOfAnswers[i], arrOfAnswers[j]] = [arrOfAnswers[j],arrOfAnswers[i]];
          }

          document
            .querySelector("ul")
            .addEventListener("click", function handleClick() {
              console.log("element clicked");
              document.querySelector("ul").style.color = "red";
              answer.style.color = "green";
            });
          console.log(multipleAnswers);
          console.log(multipleAnswers.indexOf(answer)); // just checkin'
        }
        shuffle(multipleAnswers);

        multipleAnswers.forEach((answerLi) => {
          // add answer choices to the dom as 'li' elms
          let li = document.createElement("li");
          li.textContent = answerLi;
          document.querySelector("ul").appendChild(li);
        });
        document.querySelector("ul").classList.add("hidden");
      }

      document.querySelector("ul").classList.add("hidden");
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
