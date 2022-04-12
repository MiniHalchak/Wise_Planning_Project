const searchForm = document.querySelector('.search');
const input = document.querySelector('.input');
const infoList = document.querySelector('info-list');
const infoTickerUrl = 'https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=M_EhIQKuJcODpxzxwlrUpvo8tpGkSqet';
const infoCompName = 'https://financialmodelingprep.com/api/v3/search-name?query=meta&limit=10&exchange=NASDAQ&apikey=${apiKey}';
const infoFinNews = 'https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5&apikey=${apiKey}';
const infoCompRating = 'https://financialmodelingprep.com/api/v3/rating/${ticker}?apikey=${apiKey}'

searchForm.addEventListener('submit', retrieve)

function retrieve(e){

	if (input.value == ''){
		alert('Input field is empty')
		return
	}

	infoList.innerHTML = ''

	e.preventDefault()

	const apiKey = '00bd83fe665028f00039a626fdabd48e'
	let topic = input.value;

	let url = 'https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ&apikey=${apiKey}'

	fetch(url).then((res)=>{
		return res.json()
	}).then((data)=>{
		console.log(data)
		data.articles.forEach(article =>{
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.setAttribute('href', article.url );
			a.setAttribute('target', '-blank');
			a.textContent = article.title;
			li.appendChild(a);
			infoList.appendChild(li);
		})

	}).catch((error)=>{
		console.log(error);
	})

}





fetch('https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=00bd83fe665028f00039a626fdabd48e')
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(err => console.error(err));