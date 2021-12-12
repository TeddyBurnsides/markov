import {useEffect, useState} from 'react';
import hamlet from './hamlet';
import job from './job';
import {initialize,buildSentence} from './logic';

const App = () => {

  const [markovModel,setMarkovModel] = useState(null);
  const [input,setInput] = useState(job);
  const [output,setOutput] = useState('');
  const [buttonText,setButtonText] = useState('Generate');

  useEffect(() => { 
    setMarkovModel(initialize(input)); // initialize the markov model 
  },[input])

  const generate = () => {
    
    setOutput(buildSentence(markovModel,100,input)); // build sentence
    setButtonText('Regenerate');
  }

  return (
    <div className="content">
      <div className="left">
        <textarea value={input} onChange={event => setInput(event.target.value)}></textarea>
        <button onClick={generate}>{buttonText} &rarr;</button>
      </div>
      <div className="right">{output}</div>
    </div>
  );
}

export default App;
