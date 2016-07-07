var winCounter =0; 

function hideCoins(){
	document.getElementById('heads').style.display = 'none';
	document.getElementById('tails').style.display = 'none';
	
	
}

function isHeads() {
	return Math.random() < .5; 
}

function flip(choice){
	hideCoins();
	if(isHeads()){
		document.getElementById('heads').style.display = '';
		if(choice == 'heads'){
			winCounter++;
		}else{
			winCounter=0;
		}	
	}else{
		document.getElementById('tails').style.display = '';
		if(choice == 'tails'){
			winCounter++;
		}else{
			winCounter=0;
		}	
	}
	updateScore();
}

function updateScore() {
	document.getElementById('scoreLabel').innerHTML = winCounter.toString();
}
