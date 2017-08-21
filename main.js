// stores our questions, answers, and correct answers
const QUESTIONS = [
	{number: "1", 
	question: "What does the theory of evolution say about modern human origins?", 
	a: "A. Humans come from Apes", 
	b: "B. Humans share a common ancestor with Apes", 
	c: "C. Humans were created by a race of aliens", 
	d: "D. Humans were created by gods", 
	correctAnswer: "b"},

	{number: "2", 
	question: "Humans use what percentage of their brains?", 
	a: "A. 5%", b: "B. 10%", 
	c: "C. 12%", 
	d: "D. 100%", 
	correctAnswer: "d"},

	{number: "3", 
	question: "How old is the Earth?", 
	a: "A. 6000 years old", 
	b: "B. 4.5 billion years old", 
	c: "C. 2.3 million years old", 
	d: "D. 3.2 billion years old", 
	correctAnswer: "b"},

	{number: "4", 
	question: "What is the age of the Universe?", 
	a: "A. infinite", b: "B. 12.2 million years old", 
	c: "C. 10.2 billion years old", 
	d: "D. 13.7 billion years old", 
	correctAnswer: "d"},

	{number: "5", 
	question: "What is the study of the process by which life arises naturally from inorganic matter called?", 
	a: "A. evolution", 
	b: "B. biogenesis", 
	c: "C. genesis", 
	d: "D. abiogenesis", 
	correctAnswer: "d"},

	{number: "6", 
	question: "At what rate does gravity cause objects to accelerate?", 
	a: "A. 10 meters per second squared", b: "B. 9.5 feet per second", 
	c: "C. 9.8 meters per second per second", 
	d: "D. it depends on the object's mass", 
	correctAnswer: "c"},

	{number: "7", 
	question: "What causes seasons on Earth?", 
	a: "A. Earth's distance from the sun", 
	b: "B. Earth's rotation on its axis", 
	c: "C. Earth's axial tilt", 
	d: "D. coronal mass ejections", 
	correctAnswer: "c"},

	{number: "8", 
	question: "What is the brightest star in the night sky?", 
	a: "A. Canopus", 
	b: "B. Polaris", 
	c: "C. Sirius A", 
	d: "D. Venus", 
	correctAnswer: "c"},

	{number: "9", 
	question: "How long does a housefly live on average", 
	a: "A. 24 days", 
	b: "B. 24 hours", 
	c: "C. 28 weeks", 
	d: "D. 28 days", 
	correctAnswer: "d"},

	{number: "10", 
	question: "What particle is known as the \"God\" particle?", 
	a: "A. the Wigs Bosom", 
	b: "B. La Particula Deus", 
	c: "C. the Atom", 
	d: "D. the Higgs Boson", 
	correctAnswer: "d"}
	];

// handles what happens when the start button is clicked
function handleStartButtonClicked() {
	$('.js-start').click(event => {
		renderQuestionPage(0, 0);
	});
}

// handles what happens when the next button is clicked
function handleNextButtonClicked(questionNum, results) {
	$('.js-next').click(event => {
		$('.js-is_correct').html(``);
		$('.js-is_not_correct').html(``);
		if (questionNum < (QUESTIONS.length - 1)) {
			return [questionNum++, renderQuestionPage(questionNum, results)];
		}
		renderResultsPage(results);
	});
}

// handles what happens when the restart button is clicked
function handleRestartButtonClicked() {
	$('.js-restart').click(event => {
		location.reload();
	});
}

// renders the start page in the DOM
function renderStartPage() {
	$('.js-results').html(``);
	$(".js-question_page").hide();
	$(".js-results_page").hide();
	$(".js-start_page").show();
}

// renders our questions and answers
function renderQuestionAndAnswers(questionNum) {
	$('.js-question').html(`<p>${QUESTIONS[questionNum].question}</p>`);
	$('.js-answers').html(`<button class="ans_button" id="a">${QUESTIONS[questionNum].a}</button>
		<button class="ans_button" id="b">${QUESTIONS[questionNum].b}</button>
		<button class="ans_button" id="c">${QUESTIONS[questionNum].c}</button>
		<button class="ans_button" id="d">${QUESTIONS[questionNum].d}</button>
		`);
}

// checks whether a selected answer is correct and responds accordingly
function isCorrect(questionNum, results) {
	$('.ans_button').click(function() {
		if ($(this).attr('id') == `${QUESTIONS[questionNum].correctAnswer}`) {
			return [$(this).addClass('correct'), $('.js-is_correct').html(`<p>Correct!</p>`), $('.ans_button').prop('disabled', true), results++, handleNextButtonClicked(questionNum, results)];
		} 
		return [$(this).addClass('incorrect'), $('.js-is_not_correct').html(`<p>Incorrect!</p>`), $('.ans_button').prop('disabled', true), handleNextButtonClicked(questionNum, results)];
	});
}

// renders what question the user is currently on
function renderCurrentQuestionStatus(questionNum) {
	$('.js-question-number').html(`<p>Question <span>${QUESTIONS[questionNum].number}</span> of 10</p>`);
}

// renders our question pages in the DOM
function renderQuestionPage(questionNum, results) {
	$(".js-start_page").hide();
	$(".js-question_page").show();
	renderCurrentQuestionStatus(questionNum)
	renderQuestionAndAnswers(questionNum);
	isCorrect(questionNum, results);
}

// renders the amount of questions the user answered correctly
function renderResults(results) {
	$('.js-results').html(`You answered <span>${results}</span> out of 10 questions correctly!`);
}

// renders our results page
function renderResultsPage(results) {
	$(".js-question_page").hide();
	$(".js-results_page").show();
	renderResults(results);
	handleRestartButtonClicked()
	if (results == 10) {
		return $('.js-message').html(`Congratulations! You are a Science Nerd!`);
	} else if (results < 10 && results > 6) {
		return $('.js-message').html(`Way to go, you are a science buff. Try again for nerd status!`);
	} else if (results == 6) {
		return $('.js-message').html(`Cool! You know some science but you're no nerd. Try again!`);
	} else if (results == 5) {
		return $('.js-message').html(`Not bad, but not too good either. Try Again.`);
	} else {
		return $('.js-message').html(`Science seems to have escaped you. Hope you find it soon!`);
	}
}

// Starts our science quiz app
function handleScienceQuiz() {
	renderStartPage();
	handleStartButtonClicked();
}

handleScienceQuiz();