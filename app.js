const trivia = new TriviaLibrary();
const url = "https://opentdb.com/api.php?amount=1";
const qList = document.getElementById("qList");
let pointCounter = 0;

function triviaGet() {
  trivia
    .get(url)
    .then(data => generateQuestionsAnswers(data))
    .catch(err => console.log(err));
}

function generateQuestionsAnswers(data) {
  document.getElementById("counter").innerHTML = `Counter: ${pointCounter}`;
  qList.innerHTML = "Loading...";
  let output = "<ul>";

  if (data.results !== "") {
    data.results.forEach(e => {
      output += `<h3>${e.question}</h3>`;
      answers = e.incorrect_answers;
      answers.push(e.correct_answer);
      answers = arrayShuffle(answers);

      answers.forEach(a => {
        output += `<button id='btn' class='btn' onClick='checkAnswers("${a}", "${
          e.correct_answer
        }")'>${a}</button>`;
      });
    });
    output += "</ul></a><p id='result'></p>";
    qList.innerHTML = output;
  }
}

function arrayShuffle(array) {
  let currIndex = array.length,
    tempValue,
    randIndex;

  while (0 !== currIndex) {
    randIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;

    tempValue = array[currIndex];
    array[currIndex] = array[randIndex];
    array[randIndex] = tempValue;
  }

  return array;
}

function changeButton() {
  console.log(event);
}

checkAnswers = (currentAnswer, correctAnswer) => {
  let result = currentAnswer === correctAnswer ? true : false;
  console.log(`Current answer: ${currentAnswer}`);
  console.log(`Correct answer: ${correctAnswer}`);
  console.log(`And result is: ${result}`);
  if (result === true) {
    event.target.style.backgroundColor = "#86c232";
    document.getElementById("result").innerHTML =
      "<span>Correct!</span> Take the next one!";
    qList.innerHTML += `<button class="btn" onClick="(triviaGet(), pointCounter++)">Next</button>`;
  } else {
    event.target.style.backgroundColor = "#f76c6c";
    document.getElementById("result").innerHTML = "Incorrect! Try again.";
  }
};

triviaGet();
