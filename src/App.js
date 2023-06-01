import './App.css';
import React from 'react';

function App() {
  return (<Reloj/>);
}
var x;
class Reloj extends React.Component{
  constructor(props){
    super(props)
    this.state={
      blen:5,
      break:5,
      slen:25,
      session:25,
      status:'session',
      pause:true,
      sec:0,
    };
  };
  reset=()=>{
    clearInterval(x);
    let s=document.getElementById('beep');
    s.pause();
    s.currentTime=0;
    this.setState({slen:25,blen:5,sec:0,session:25,break:5,status:'session',pause:true});
  };
  bDecrement=()=>{
    this.setState((state)=>{
      return state.blen>1 && {blen:state.blen-1};
    });
    this.bchange();
    
  };
  bIncrement=()=>{
    this.setState((state)=>{
      return state.blen<60 && {blen:state.blen+1};
    });
    this.bchange();
  };
  sDecrement=()=>{
    this.setState((state)=>{
      return state.slen>1 && {slen:state.slen-1};
    });
    this.schange();
  };
  sIncrement=()=>{
    this.setState((state)=>{
      return state.slen<60 && {slen:state.slen+1};
    });
    this.schange();
  };
  schange=()=>{
    this.setState((state)=>{
      return{session:state.slen,sec:0};
    });
  };
  bchange=()=>{
    this.setState((state)=>{
      return{break:state.blen, sec:0};
    });
  };
  beep=()=>{
    let b=document.getElementById('beep');
    b.play();
  };
  startStop=()=>{
    if (this.state.pause===true){
      x=setInterval(()=>{
        this.setState((state)=>{
          if (state.status==='session'){
            if (state.session===0 && state.sec===0){
              this.beep();
              return{status:'break',session:state.slen}                  
            }
            if (state.sec===0){
            return{sec:59,session:state.session-1}
            }
            else{
            return{sec:state.sec-1}
            };
          }
          else{
            if (state.break===0 && state.sec===0){
              this.beep();
              return{status:'session', break:state.blen}                  
            }
            if (state.sec===0){
            return{sec:59,break:state.break-1}
            }
            else{
            return{sec:state.sec-1}
            };
          };
        });
      },1000);
      this.setState({pause:false});
      return
    }
    else if(this.state.pause===false){
      clearInterval(x);
      this.setState({pause:true});
      return
    };
  };
  render(){
    let s={
      color:'black'
    };
    (this.state.session===0 || this.state.break===0) && (s.color='red');
    return <div className="App">
    <h1>25+5 Clock</h1>
    <div id='break-label'>
    <p>Break Length</p>
    <div className='incDec'>
    <button id='break-increment' onClick={this.bIncrement}><i className='fa-solid fa-arrow-up fa-xl'></i></button>
    <h2 id='break-length'>{this.state.blen}</h2>
    <button id='break-decrement' onClick={this.bDecrement}><i className='fa-solid fa-arrow-down fa-xl'></i></button>
    </div>
  </div>
  <div id='session-label'>
    <p>Session Length</p>
    <div className='incDec'>
    <button id='session-increment' onClick={this.sIncrement}><i className='fa-solid fa-arrow-up fa-xl'></i></button>
    <h2 id='session-length'>{this.state.slen}</h2>
    <button id='session-decrement' onClick={this.sDecrement}><i className='fa-solid fa-arrow-down fa-xl'></i></button>
    </div>
  </div>
  <div id='timer'>
    <p id='timer-label'>{this.state.status}</p>
    <h2 id='time-left' style={s}>{(this.state.status==='session' ? this.state.session.toLocaleString('es-ES', {minimumIntegerDigits: 2}) : this.state.break.toLocaleString('es-ES', {minimumIntegerDigits: 2}))+':'+ this.state.sec.toLocaleString('es-ES', {minimumIntegerDigits: 2})}</h2>
    <div id='controls'><button id='start_stop' onClick={this.startStop}><i className='fa-play fa-solid'></i> <i className='fa-pause fa-solid'></i></button>
    <button id='reset' onClick={this.reset}><i className='fa-solid fa-rotate'></i></button>
    <audio id='beep' src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'></audio></div>
  </div>
  </div>
  }
}

export default App;
