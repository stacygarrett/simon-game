const btnColors = [
	'red',
	'blue',
	'green',
	'yellow'
];
let gamePattern = [];
let userClickedPattern = [];
let game = false;
let level = 0;
let levelCompleted = 0;
let currScore = 0;
let bestScore = 0;

$(document).on('click', '.start-btn', function() {
	$(this).attr('disabled', true).css('opacity', 0);
	beginGame();
});

const beginGame = () => {
	game = true;
	$('#level-title').text(`Level ${level}`).attr('disabled', false).css('opacity', 1);
	nextSequence();
};

const init = () => {
	level = 0;
	$('#level-title').text('Press Start');
	gamePattern = [];
	userClickedPattern = [];
	game = false;
};

$('.btn').click(function() {
	let userPick = $(this).attr('id');
	userClickedPattern.push(userPick);
	playSound(userPick);
	animatePress(userPick);
	checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
	currScore = $('.current-score');
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			currScore.text(`${level}`);
			setTimeout(() => nextSequence(), 1000);
		}
	} else {
		$('.start-btn').attr('disabled', false).css('opacity', 1);
		endGame();
		restartGame();
		if (bestScore < level) {
			bestScore = level - 1;
			$('.best-score').text(`${bestScore}`);
		}
	}
};

const nextSequence = () => {
	userClickedPattern = [];
	level++;
	$('#level-title').text(`Level ${level}`);
	let randomNum = Math.floor(Math.random() * 4);
	const randomChosenColor = btnColors[randomNum];
	gamePattern.push(randomChosenColor);
	for (let i = 0; i < gamePattern.length; i++) {
		function timer() {
			let k = i;
			setTimeout(() => {
				$(`#${gamePattern[k]}`).fadeIn(100).fadeOut(100).fadeIn(100);
				playSound(gamePattern[k]);
			}, i * 800);
		}
		timer();
	}
};

const playSound = (name) => {
	const audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
};

const animatePress = (currentColor) => {
	$(`.${currentColor}`).addClass('pressed');
	setTimeout(() => {
		$(`.${currentColor}`).removeClass('pressed');
	}, 100);
};

const endGame = () => {
	game = false;
	playSound('incorrect');
	$('body').addClass('game-over');
	setTimeout(() => $('body').removeClass('game-over'), 800);
	$('#level-title').text('Game Over!');
	$('.start-btn').addClass('restart').removeClass('start-btn').text('Start Over');
};

const restartGame = () => {
	$('.restart').click(function() {
		$('.restart').removeClass('restart').addClass('start-btn');
		$('.current-score').text(`${0}`);
		init();
	});
};
