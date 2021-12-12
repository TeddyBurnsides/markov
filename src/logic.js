// generate sentence from a markov array given a starting word
const buildSentence = (markov,maxValue,input) => {

	if (!markov) return false; // only continue if we've initialized the array

	input = input.split('. ');

	let startWord = getRandomWord(input)

	//let sentenceDIV=document.getElementById('content') // define sentence element
	let sentence;
	//sentenceDIV.innerHTML = makeTitleCase(startWord) + ' '; // print first word with an uppercase letter
	sentence = makeTitleCase(startWord) + ' ';
	
	let nextWord,counter,currentIndex;
	counter=0 // start counter
	do { // build sentence word by word
		currentIndex = markov.findIndex(word => word[0] === startWord);
		if (currentIndex !== -1) { // found value
			nextWord = getNextWord(markov,currentIndex); // get the most probable next word
			startWord=nextWord; // allows loop to look for the next word in the sentence
			//sentenceDIV.append(nextWord + ' '); // print to screen
			sentence = sentence + nextWord + ' ';
		}
		counter++; // counter used to stop this do/while loop before it gets too long
		if (currentIndex === -1 && counter <= maxValue) { // start over if we end a sentence
			startWord=getRandomWord(input);
			//sentenceDIV.innerHTML = sentenceDIV.innerHTML.slice(0,-1); // remove last space
			sentence = sentence.slice(0,-1);
			//sentenceDIV.append('. ' + makeTitleCase(startWord) + ' '); // add start word
			sentence = sentence + '. ' + makeTitleCase(startWord) + ' ';
		}
	} while (counter < maxValue); // hard coded infinite loop breaker
	//sentenceDIV.innerHTML = sentenceDIV.innerHTML.slice(0,-1) + '.'; // remove last space + add a periods
	sentence = sentence.slice(0,-1) + '.';

	return sentence;
}
// transform a word into title case
const makeTitleCase = (word) => {
	return word.charAt(0).toUpperCase() + word.slice(1)
}
// choose a random word from the array given
const getRandomWord = input => {
	const randomIndex = Math.floor(Math.random() * input.join(' ').split(' ').length);
	return input.join(' ').split(' ')[randomIndex].toLowerCase();
}
// returns the next word from the markov array given the current word
const getNextWord = (markov,index) => {
	const nextWordIndex=Math.floor(Math.random() * markov[index][1].length);
	return markov[index][1][nextWordIndex];
}
// generate markov array
const initialize = input => {
	let initial,follower,index,markov = [],allFollowers  = [];

	input = input.split('. ');

	for (let sentence of input) { // loop through each sentence provided
		sentence=sentence.toString().split(' '); // convert each sentence to array with a word per element
		for (let k=0; k<sentence.length-1; k++) { // loop through each word in sentence to get pairs
			initial = sentence[k].toLowerCase();
			follower = sentence[k+1].toLowerCase();
			if (!markov.length) { // if array doesn't exist, create it 
				markov.push([initial,[follower]]);
			} else { // only need to do fancy logic if array exists
				index = markov.findIndex(word => word[0] === initial) // look for index of "initial" value in array
				if (index!==-1) { // if found, append new value
					allFollowers=markov[index][1];
					allFollowers.push(follower);
					markov[index][1] = allFollowers;			
				} else {
					markov.push([initial,[follower]]);
				}
			}
		}
	}
	return markov;
}

export {initialize,getRandomWord,buildSentence};