const button = document.querySelector('.upload-btn');
const nav = document.querySelector('.nav');
let OBJ_WEATHER = [];

button.addEventListener('click', gettingADateByPressing);

// спрацювання при кліку
function gettingADateByPressing() {
	const inputWeather = document.querySelector('.input_weather').value;

	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputWeather}&appid=2d36c39e8f1229ec349781478b6b3a9a`;
	// запит на сервер
	async function requestToServer() {
		try {
			let value = await fetch(url);

			if (value.status !== 200) {
				throw Error('error');
			}
			return value.json();
		} catch (err) {
			console.log(err, 'err_1');
		}
	}
	//збереження інформації
	async function savingInformation() {
		try {
			let value = await requestToServer();
			if (value === undefined) {
				throw Error('error');
			}
			// OBJ_WEATHER = []
			await OBJ_WEATHER.unshift(value);
			await slideScrolling();
		} catch (err) {
			console.log(err, 'err_2');
		}
	}
	savingInformation();
}

// робота з отриманими даними
function slideScrolling() {
	weatherDataProcessing();
	setTimeout(() => {
		nav.classList.add('app');
	}, 1500);
}

// рес ст
function rest() {
	nav.classList.remove('app');
}

function weatherDataProcessing() {
	const slide1_block = document.querySelectorAll('.slide1_block .block');
	let objInfo;
	let filtered = OBJ_WEATHER[0].list.filter((ooo, i) => i % 2 === 0);
	let filtered1 = OBJ_WEATHER[0].list.filter((ooo, i) => i % 2);

	+filtered[0].dt_txt.split(' ')[1].split(':')[0] % 2
		? (objInfo = filtered)
		: (objInfo = filtered1);

	let key = 0;
	weatherDataProcessingBlock(objInfo);
	for (let i = 0; i < slide1_block.length; i++) {
		let timeObj = objInfo[key].dt_txt.split(' ')[1].split(':')[0];
		let timeBlock = slide1_block[i].children[1].textContent.split(':')[0];
		if (timeObj !== timeBlock) {
			slide1_block[i].children[2].innerHTML = '-';
			slide1_block[i].children[3].innerHTML = '-';
			slide1_block[i].children[4].innerHTML = '-';
			slide1_block[i].children[5].innerHTML = '-';
			slide1_block[i].children[6].innerHTML = '-';
		}
		if (timeObj === timeBlock) {
			let stanPogoda = objInfo[key].weather[0].description;

			switch (stanPogoda) {
				case 'scattered clouds':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/414/414825.png';
					break;
				case 'few clouds':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/616/616682.png';
					break;
				case 'overcast clouds':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/984/984576.png';
					break;
				case 'broken clouds':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/1638/1638813.png';
					break;
				case 'clear sky':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/4076/4076552.png';
					break;
				case 'light rain':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/2930/2930058.png';
					break;
				case 'moderate rain':
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/1146/1146797.png';
					break;
				default:
					slide1_block[i].children[2].children[0].src =
						'https://image.flaticon.com/icons/png/512/59/59576.png';
					break;
			}

			slide1_block[i].children[3].innerHTML = Math.round(
				objInfo[key].main.temp - 273.15
			);
			slide1_block[i].children[4].innerHTML = `${Math.round(
				objInfo[key].main.temp_max - 272.5
			)} - ${Math.round(objInfo[key].main.temp_min - 273.8)}`;

			slide1_block[i].children[5].innerHTML = objInfo[key].wind.speed;
			slide1_block[i].children[6].innerHTML = stanPogoda;

			key++;
		}
	}
	console.log(OBJ_WEATHER);
}

function weatherDataProcessingBlock(Info) {
	const slide1_dey = document.querySelectorAll('.slide1_dey .text_dey');
	const inputWeather = document.querySelector('.input_weather').value;
	let ii = 0;
	let Info2 = Info.filter((ooo, i) => {
		if (i === ii) {
			ii = ii + 4;
			return ooo;
		}
	});
	for (let i = 0; i < Info2.length; i++) {
		slide1_dey[i].children[0].innerHTML = inputWeather;
		slide1_dey[i].children[1].innerHTML = Info2[i].dt_txt
			.split(' ')[0]
			.split(' ')[0];
	}
}
