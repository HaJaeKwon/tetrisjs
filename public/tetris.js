const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

var isRunning = true;

var backgroundMusic = new Audio("Xenon 2 - Megablast title music Atari ST.mp3");
var isBackgroundMusicPause = true;

var laserSound = new Audio("Laser Blasts-SoundBible.com-108608437.mp3");
var quickDropSound = new Audio("Laser-SoundBible.com-602495617.mp3");
var gameoverSound = new Audio("Game_Over_Sound_Effects_[High_Quality_Free_Download].mp3");

function BackgroundMusicStart() {
	console.log("BackgroundMusicStart");
	if(isBackgroundMusicPause) {
		backgroundMusic.play();
		isBackgroundMusicPause = false;
		document.getElementById('musicButton').innerText = "Music Pause";
	} else {
		backgroundMusic.pause();
		isBackgroundMusicPause = true;
		document.getElementById('musicButton').innerText = "Music Start";
	}
}

function arenaSweep() {

	let rowCount = 1;

	outer: for(let y = arena.length - 1; y >= 0; --y) {
		for(let x = 0; x < arena[y].length; ++x) {
			if(arena[y][x] === 0) {
				continue outer;
			}
		}

		const row = arena.splice(y, 1)[0].fill(0);
		arena.unshift(row);
		++y;

		player.score += rowCount * 10;
		rowCount *= 2;
	}

	if(!isBackgroundMusicPause && rowCount>1) {
		laserSound.pause();
		laserSound.load();
		laserSound.play();
	}
}


const matrix = [
	[0,0,0],
	[1,1,1],
	[0,1,0],
];

function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for(let y = 0; y < m.length; ++y) {
		for(let x = 0; x < m[y].length; ++x) {
			if(m[y][x] !== 0 &&
				(arena[y+o.y] &&
				arena[y+o.y][x+o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function createPiece(type) {
	if(type === 'T') {
		return [
			[0,0,0],
			[1,1,1],
			[0,1,0],
		];
	} else if(type === 'O') {
		return [
			[2,2],
			[2,2],
		];
	} else if(type === 'L') {
		return [
			[0,3,0],
			[0,3,0],
			[0,3,3],
		];
	} else if(type === 'J') {
		return [
			[0,4,0],
			[0,4,0],
			[4,4,0],
		];
	} else if(type === 'I') {
		return [
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0],
			[0,5,0,0],
		];
	} else if(type === 'S') {
		return [
			[0,6,6],
			[6,6,0],
			[0,0,0],
		];
	} else if(type === 'Z') {
		return [
			[7,7,0],
			[0,7,7],
			[0,0,0],
		];
	}
}

function draw() {
	context.fillStyle = '#000';
	context.fillRect(0,0,canvas.width,canvas.height);

	drawMatrix(arena, {x:0, y:0});
	drawMatrix(player.matrix, player.pos);
}


function drawMatrix(matrix, offset) {
	matrix.forEach((row,y) => {
		row.forEach((value,x) => {
			if(value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x,
								 y + offset.y,
								 1,1);
			}
		});
	});
}

function merge(arena, player) {
	player.matrix.forEach((row,y) => {
		row.forEach((value, x) => {
			if(value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		})
	})
}

function playerDrop() {
	player.pos.y++;
	if(collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		//debugger;
		arenaSweep();
		updateScore();
	}
	dropCounter = 0;
}

function playerQuickDrop() {

	const pos = player.pos.y;

	while(collide(arena, player) === false) {
		player.pos.y++;
	}
	player.pos.y--;
	merge(arena, player);
	playerReset();
	arenaSweep();
	updateScore();

	dropCounter = 0;

	if(!isBackgroundMusicPause) {
		quickDropSound.pause();
		quickDropSound.load();
		quickDropSound.play();
	}
}

function playerMove(dir) {
	player.pos.x += dir;
	if(collide(arena, player)) {
		player.pos.x -= dir;
	}
}

function playerReset() {
	const pieces = 'ILJOTSZ';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) -
					(player.matrix[0].length / 2 | 0);

	if(collide(arena, player)) {

		if(player.score !== 0) {
			setTimeout(function () {
		        backgroundMusic.pause();
				gameoverSound.play();
				isRunning = false;
				alertScoreboard();
		    }, 1000);
		} else {
			arena.forEach(row => row.fill(0));
			player.score = 0;
			updateScore();
		}
	}
}

function playerRotate(dir) {

	const pos = player.pos.x;

	let offset = 1;
	rotate(player.matrix, dir);
	while(collide(arena, player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if(offset > player.matrix[0].length) {
			rotate(player.matrix, -dir);
			player.pos.x = pos;
			return;
		}
	}
}

function rotate(matrix, dir) {
	for(let y = 0; y<matrix.length; ++y) {
		for(let x = 0; x < y; ++x) {
			[
				matrix[x][y],
				matrix[y][x],
			] = [
				matrix[y][x],
				matrix[x][y],
			]
		}
	}
	if(dir>0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}
}

function alertScoreboard() {
	swal({
		title: "Update Your Score!!",
		text: "Write your user name",
		type: "input",
		showCancelButton: false,
		closeOnConfirm: false,
	}, function(inputValue) {
		if (inputValue === false) {
			return false;
		}
		if (inputValue === "") {
			swal.showInputError("You need to write something!");
			return false
		}

		swal("Nice!", "You wrote: " + inputValue, "success");

		postScore(inputValue, player.score);

		if(!isBackgroundMusicPause) backgroundMusic.play();
		arena.forEach(row => row.fill(0));
		player.score = 0;
		updateScore();
	});
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function postScore(name, score) {

	console.log("name, score : ", name, score);
	$.ajax({
		url:"https://tetris-server-hajaekwon.c9users.io/users/score",
		type:"post",
		data: {
			score : score,
			name : name
		},
		success: function(result) {
			if(result) {
				console.log("success update score");
			} else {
				console.log("fail update score");
			}
			isRunning = true;
		},
		error: function() {
			console.log("error update score");
			isRunning = true;
		}
	})
}

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	if(isRunning) {

		dropCounter += deltaTime;
		if(dropCounter > dropInterval) {
			playerDrop();
		}

		if(backgroundMusic.ended && !isBackgroundMusicPause) {
			backgroundMusic.play();
		}

	
		draw();
	}
	requestAnimationFrame(update);
}

function updateScore() {
	document.getElementById('score').innerText = player.score;

	$.ajax({
			url:"https://tetris-server-hajaekwon.c9users.io/users/score",
			type:"get",
			success: function(result) {
				var innerHTML = "<ul class=score>";
				var score = 0;
				var name = "";

				console.log("updateScore", result);

				$.each(result.data, function(index, item) {
					score = item.score;
					name = item.name;
					innerHTML += "<li>"+name+" : "+score+"</li>";
				});
				innerHTML += "</ul>"
				$('.score').remove();
				$('#scoreList').append(innerHTML);
			},
			error: function() {
				console.log("error get score");
			}
		});
}

const colors = [
	null,
	'#FF0D72',
	'#0DC2FF',
	'#0DFF72',
	'#F538FF',
	'#FF8E0D',
	'#FFE138',
	'#3877FF',
];

const arena = createMatrix(12, 20);
console.log(arena); console.table(arena);

const player = {
	pos : {x:0, y:0},
	matrix: null,
	score: 0,
}

document.addEventListener('keydown', event => {
	//console.log(event);
	if(!isRunning) {

	} else if(event.keyCode === 37) {
		playerMove(-1);
	} else if(event.keyCode === 39) {
		playerMove(1);
	} else if(event.keyCode === 40) {
		playerDrop();
	} else if(event.keyCode === 81) {
		playerRotate(-1);
	} else if(event.keyCode === 87) {
		playerRotate(1);
	} else if(event.keyCode === 32) {
		playerQuickDrop();
	}
});

BackgroundMusicStart();
playerReset();
updateScore();
update();