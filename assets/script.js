//variable
var searchPolyData = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-04-08/2022-04-08?adjusted=true&sort=asc&limit=120&apiKey=jVeWqQOEafgJX73FKFxxBZJ0M5RtPnp6';

// let polyApiKey = "jVeWqQOEafgJX73FKFxxBZJ0M5RtPnp6";

function polyData(request) {
      fetch(searchPolyData)
        .then(function(res) {
            console.log(res);
            return res.json()
        })
        .then(function(data){
            console.log(data);
        });
    }
    polyData(searchPolyData);

//Add company rating to add recommendations (green, red, yellow)
var financialCompany = 'https://financialmodelingprep.com/api/v3/historical-rating/AAPL?limit=100&apikey=6b5b1e9afa1a31cc4e5f0033e2ee6e9b';
// financialModelingApi = "6b5b1e9afa1a31cc4e5f0033e2ee6e9b"

function financeData(request) {
    fetch(financialCompany)
      .then(function(res) {
          console.log(res);
          return res.json()
      })
      .then(function(data){
          console.log(data);
      });
  }
  financeData(financialCompany);

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