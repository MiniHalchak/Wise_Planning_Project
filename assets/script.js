const submitBtn = document.querySelector('#submitBtn');
const input = document.querySelector('.input');
const infoList = document.querySelector('#info-list');
const infoTickerUrl = 'https://api.polygon.io/v3/reference/tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=M_EhIQKuJcODpxzxwlrUpvo8tpGkSqet';
const infoCompName = 'https://financialmodelingprep.com/api/v3/search-name?query=meta&limit=10&exchange=NASDAQ&apikey=${apiKey}';
const infoFinNews = 'https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5&apikey=${apiKey}';
const infoCompRating = 'https://financialmodelingprep.com/api/v3/rating/${ticker}?apikey=${apiKey}'
let searchResults = [];
submitBtn.addEventListener('click', retrieve);

//
function retrieve(e){
  // searchResults = [
  //   {symbol: 'AAPL', name: 'Apple Inc.', currency: 'USD', stockExchange: 'NASDAQ Global Select', exchangeShortName: 'NASDAQ'},
  //   {symbol: 'MLP', name: 'Maui Land & Pineapple Company, Inc.', currency: 'USD', stockExchange: 'New York Stock Exchange', exchangeShortName: 'NYSE'},
  //   {symbol: 'APLE', name: 'Apple Hospitality REIT, Inc.', currency: 'USD', stockExchange: 'New York Stock Exchange', exchangeShortName: 'NYSE'}];
  e.preventDefault();
	if (input.value == ''){
		alert('Input field is empty')
		return
	}

	// infoList.innerHTML = ''

	const apiKey = '0d784df591c50ec5f238976a008df8c3'
	let searchTerm = input.value;
//US has these 3 exchanges, so we would need to call the 3 markets to show all the companies in those exchanges 
  let queryNasqad = `https://financialmodelingprep.com/api/v3/search-name?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${apiKey}`;
  let queryNyse = `https://financialmodelingprep.com/api/v3/search-name?query=${searchTerm}&limit=10&exchange=NYSE&apikey=${apiKey}`;
  let queryAmex = `https://financialmodelingprep.com/api/v3/search-name?query=${searchTerm}&limit=10&exchange=AMEX&apikey=${apiKey}`;
//Array with the 3 exchanges so then we were able to iterate in those 3 results
  let exchangesArr = [queryNasqad, queryNyse, queryAmex ];
if (searchResults.length == 0) { 
  for (exchange in exchangesArr){
    fetch(exchangesArr[exchange]).then((res)=>{
      return res.json()
    }).then((data)=>{
      agregateSearchRes(data);
    }).catch((error)=>{
      console.log(error);
    })
  }
}
  displaySearchRes(searchResults);
}
//this function merges all 3 results into 1 array that is on line 32
function agregateSearchRes(data){
  for (result in data){
    searchResults.push(data[result]);
  }
}
//this shows/creates html elements
function displaySearchRes(data){
  data.forEach(searchResult =>{
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('data-ticker', searchResult.symbol);
    a.textContent = searchResult.name;
    li.appendChild(a);
    ul.appendChild(li);
    infoList.appendChild(ul);
  })
}
//listener that listens to any click given to any a element in the infoList
infoList.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches("a") === true) {
      var ticker = element.getAttribute("data-ticker");
      polyData(ticker);
  }
});

//function that calls polygon by ticker

function polyData(ticker) {
  var queryTicker = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=jVeWqQOEafgJX73FKFxxBZJ0M5RtPnp6`;
    fetch(queryTicker)
      .then(function(res) {
          console.log(res);
          return res.json()
      })
      .then(function(data){
          console.log(data);
      });
    }

  //to do:
  //display Polygon Data: closing price, highest, lowest
  //create call for news to display on main page
  //create call for gainers and losers to be displayed on main page

  //rotating phrase
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.typeT = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };

