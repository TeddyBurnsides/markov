import {useEffect, useState} from 'react';
import hamlet from './hamlet';
import job from './job';
import jabberwocky from './jabberwocky';
import {initialize,buildSentence} from './logic';

const App = () => {

  const [markovModel,setMarkovModel] = useState(null);
  const [input,setInput] = useState(hamlet);
  const [inputSource, setInputSource] = useState('hamlet');
  const [output,setOutput] = useState('');
  const [buttonText,setButtonText] = useState('Generate');

  useEffect(() => { 
    setMarkovModel(initialize(input)); // initialize the markov model 
  },[input])

  const switchInputSource = (value) => {
    setInputSource(value);
    switch(value) {
      case 'hamlet': setInput(hamlet); break;
      case 'job': setInput(job); break;
      case 'jabberwocky': setInput(jabberwocky); break;
      default: throw new Error();
    }
  }

  const generate = () => {
    const maxNumberOfWords=100;
    setOutput(buildSentence(markovModel,maxNumberOfWords,input));
    setButtonText('Regenerate');
  }

  return (
    <div className="content">
      <div className="left">
       <p>Choose from several pre-selected sources:</p>
        <select value={inputSource} onChange={event => switchInputSource(event.target.value)}>
          <option value="hamlet">Hamlet</option>
          <option value="job">The Book of Job</option>
          <option value="jabberwocky">Jabberwocky</option>
        </select>
        <p>Or enter in your own text:</p>
        <textarea value={input} onChange={event => setInput(event.target.value)}></textarea>
        <button onClick={generate}>{buttonText} &rarr;</button>
      </div>
      <div className="right">{output}</div>
    </div>
  );
}

export default App;
