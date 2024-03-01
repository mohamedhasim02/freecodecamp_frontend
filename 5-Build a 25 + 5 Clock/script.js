import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'


//componente  Break
  const Break = ( { habilitarDeshab, contadorbreak, setContadorbreak} ) => {
    
  return (
    <div>
          <div id="break-label">Break Length</div>
            <div className="contenedor-break">
            <button
              id="break-increment"
              disabled={habilitarDeshab} 
              onClick={
                (contadorbreak < 60) 
                ? () => setContadorbreak(contadorbreak + 1) 
                : null } 
                  >+</button>
              <div id="break-length">{contadorbreak}</div>
            <button 
              id="break-decrement" 
              disabled={habilitarDeshab} 
              onClick={
                (contadorbreak > 1) 
                ? () => setContadorbreak(contadorbreak - 1)  
                : null }
              >-</button>
          </div>
      </div>
  )
}

  
//Componente Session
  const Session = ( { habilitarDeshab, incrementarSession, decrementarSession, contadorsession  } ) => {
  return (
          <div>
             <div id="session-label">Session Length</div>
                <div className="contenedor-session">
                    <button disabled={habilitarDeshab} onClick={incrementarSession} id="session-increment">+</button>
                    <div id="session-length">{contadorsession}</div>
                    <button disabled={habilitarDeshab} onClick={decrementarSession} id="session-decrement">-</button>
              </div>
         </div>
  )
}
  

 //componente tiempo-reloj
const Time = ( { activarReloj,mostarTitle, tiempo } ) => {
  
  //reloj minutos segundos 25:00
  const tiempoMinSec = () => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo - minutos * 60;
    let seconds;
    let minutes;
    if (segundos < 10) {
      seconds = `0${segundos}`  
    } else {
      seconds = segundos
    }
    
    if(minutos < 10) {
      minutes = `0${minutos}`
    } else {
      minutes = minutos
    }
    return minutes + ":" + seconds;
  }
  
  //titulo
  const title = () => {
    if (mostarTitle === "titleReloj") {
      return "Session"
    } else {
      return "Break"
    }
  }
  
  return (
      <div>
          <div className="contenedor-tiempo">
             <div id="timer-label">{title()}</div>
             <div id="time-left">{tiempoMinSec()}</div>
          </div>
          <button onClick={activarReloj} id="start_stop">Start -Stop</button>
      </div> 
  )
}
  


//componente principal
function App() {
  //contador break
  const [contadorbreak, setContadorbreak] = React.useState(5);
  //contador session
  const [contadorsession, setContadorsession] = React.useState(25);
  //disabled
  const [habilitarDeshab, setHabilitardeshab] = React.useState(false);
  //tiempo en segundos
  const [tiempo, setTiempo] = React.useState(1500);
  //titulo reloj
  const [mostarTitle, setmostarTitle] = React.useState("titleReloj");
  
  
  const value = 60; 
  
  //contador session
   const incrementarSession = () => {
    if(contadorsession < value){
      setContadorsession(contadorsession + 1)
      setTiempo(tiempo + value)
    }
  }
  
  const decrementarSession = () => {
    if(contadorsession > 1){
      setContadorsession(contadorsession - 1)
      setTiempo(tiempo - value)
    }
  }
  
  
  //habilitar reloj
  const timeout = setTimeout(() => {
    if(tiempo && habilitarDeshab === true){
      setTiempo(tiempo - 1)
    }
  }, 1000);
  
  
  //activar reloj  
  const activarReloj = () => {
    clearTimeout(timeout);
    setHabilitardeshab(!habilitarDeshab);
  }
  
  
  //reset reloj
  const resetReloj = () => {
    const audio = document.getElementById("beep");
    if(!tiempo && mostarTitle === "titleReloj"){
      setTiempo(contadorbreak * value);
      setmostarTitle("BREAK");
      audio.play();
    }
    if(!tiempo && mostarTitle === "BREAK"){
      setTiempo(contadorsession * value)
      setmostarTitle("titleReloj");
      audio.pause();
      //audio.currentTime = 0;
    }
  }
  
  
  //reloj
  const reloj = () => {
    if(habilitarDeshab){
      timeout
      resetReloj()
    }else {
      clearTimeout(timeout)
    }
  }
  
  
  //reset
  const reset = () => {
    const audio = document.getElementById("beep");
    clearTimeout(timeout);
    setContadorbreak(5);
    setContadorsession(25);
    setTiempo(1500);
    setHabilitardeshab(false);
    setmostarTitle("titleReloj");
    audio.pause();
    audio.currentTime = 0;
  }
  
  
  React.useEffect(() => {
    reloj()
  }, [habilitarDeshab, tiempo, timeout])
  
  return (
   <div className="App">
      <h2 className="title">25 + 5 Clock</h2>
      <div className="contenedor-length">
          <Break 
            habilitarDeshab={habilitarDeshab} 
            contadorbreak={contadorbreak}
            setContadorbreak={setContadorbreak} />
          <Session 
            habilitarDeshab={habilitarDeshab} 
            incrementarSession={incrementarSession}
            decrementarSession={decrementarSession} 
            contadorsession={contadorsession} />
      </div>
      <div className="contenedor-btn">
        <Time 
          activarReloj={activarReloj} 
          mostarTitle={mostarTitle} 
          tiempo={tiempo}/>
        <button onClick={reset} id="reset">Reset</button>
     </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>);
}

ReactDOM.render(<App />,document.getElementById("root"))
