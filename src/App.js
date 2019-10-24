import React, {useState, useEffect} from 'react';
import Card from './components/Card/Card'
import {workers} from './workers'
import planesLogo from './assets/planesLogo.svg'
import './App.css';

function App() {

  const [likedState, setLikedState] = useState('neutral')
  const [feedback, setFeedback] = useState('')
  const [likedWorkers, setLikedWorkers] = useState([])
  const [dislikedWorkers, setDislikedWorkers] = useState([])

  let cardBuffer = []

  const CardStack = () =>{

    if(cardBuffer.length < 1){
      for(let i = 0; i < workers.length; i++){  
        cardBuffer.push(
          <div className='App-card' draggable={true} onDragStart={e => e.target.style.opacity = 0.5} onDragEnd={e => dragend(e)} style={{position: 'fixed', zIndex: i, transform: `rotate(${i*1})`}} key={`key${i}`}>
            <Card source={workers[i].pic} name={workers[i].name} job={workers[i].job} />
          </div>
        )
      }
    }
    return cardBuffer

  }


  const dragend = e => {
    let worker = reverseObjectify(e.target)

    if(likedState === 'like'){
      setLikedWorkers([...likedWorkers, worker])
      setFeedback(`You Liked ${worker.name}`)
      e.target.style.animation = 'addLike 1s forwards'
      
    }
    else if(likedState === 'dislike'){
      setDislikedWorkers([...dislikedWorkers, worker])
      setFeedback(`You Disliked ${worker.name}`)
      e.target.style.animation = 'removeLike 1s forwards'
    }
    else{
      e.target.style.opacity = 1
    }
  }

  const reverseObjectify = div => {
    let name = div.getElementsByClassName('Card-name')[0].textContent
    let pic = div.getElementsByClassName('Card-image')[0].src
    let job = div.getElementsByClassName('Card-job')[0].textContent
    let worker = {name: name, pic: pic, job: job}

    return worker
  }

  return (
    <div className="App-container">

      <div id='App-drop-dislike' onDragOver={e => setLikedState('dislike')}></div>
      <div id='App-card-container' >{CardStack()}</div>
      <div id='App-drop-like' onDragOver={e => setLikedState('like')}> </div>
      <div><img className='App-logo' src={planesLogo} alt='logo'></img></div>
      <div id='App-feedback'>
        {feedback}
      </div>
      <div><img className='App-logo' src={planesLogo} alt='logo'></img></div>

    </div>
  );
}

export default App;
