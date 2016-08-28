var winCounter =0; 

function hideCoins(){
	document.getElementById('heads').style.display = 'none';
	document.getElementById('tails').style.display = 'none';
	document.getElementById('tailsButton').setAttribute("disabled", true);
	document.getElementById('headsButton').setAttribute("disabled", true);
	
	
}

function isHeads() {
	return Math.random() < .5; 
}

function flip(choice){
	hideCoins();
	document.getElementById('spin').style.display = '';

	if(isHeads()){

		if(choice == 'heads'){
			winCounter++;
		}else{
			winCounter=0;
		}	

		setTimeout(function () {
			document.getElementById('spin').style.display = 'none';
			document.getElementById('heads').style.display = '';
			updateScore();		
		}, 1000)

	}else{

		if(choice == 'tails'){
			winCounter++;
		}else{
			winCounter=0;
		}	
		setTimeout(function () {
			document.getElementById('spin').style.display = 'none';
			document.getElementById('tails').style.display = '';
			
			updateScore();
		}, 1000)
	}
}

function updateScore() {
	document.getElementById('scoreLabel').innerHTML = winCounter.toString();
	document.getElementById('tailsButton').removeAttribute("disabled");  
	document.getElementById('headsButton').removeAttribute("disabled");
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log("sw regd");    
  }).catch(function() {
    console.log("sw failed");
  });
}