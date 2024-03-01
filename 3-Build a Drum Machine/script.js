import { FiVolume2, FiVolumeX } from "https://cdn.skypack.dev/react-icons@4.1.0/fi";

// Global
function printDisplay(text) {
  document.getElementById("display").innerText = text;
}

class DrumPad extends React.Component {
  
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }
  
  // Play Sound (from Button)
  playSound(e) {
    console.log("playSound[DrumPad]", "e=", e, "this.props=", this.props);
    if(this.props.power===1) {
      const drumpad = this.props.drumpad;
      e.preventDefault();
      const sound = document.getElementById(drumpad.keyTrigger);
      const button = sound.parentElement;
      printDisplay(button.id.replace(/-/g, " "));
      sound.volume = (this.props.volume);
      sound.currentTime = 0;
      sound.play();
    }
  }

  // Render Drum Pad Box
  render() {
    //if(this.props.idx===2 || this.props.idx===5 || this.props.idx===8) {
    // id={"button-" + drumpad.keyTrigger}
    const drumpad = this.props.drumpad;
    let css;
    if(this.props.idx>=5) css = "remark";
    if( (this.props.idx + 1) % 3 === 0) {
      return (
        <>
          <button className="drum-pad remark"
            id={drumpad.id}
            keyTrigger={drumpad.keyTrigger}
            onMouseDown={this.playSound}
            disabled={!this.props.power}
          >
            <audio id={drumpad.keyTrigger} src={drumpad.url} className="clip" />
            {drumpad.keyTrigger}
          </button>
          <br />
        </>
      )
    } else {
      return (
        <>
          <button className={this.props.idx>=5 ? "drum-pad remark" : "drum-pad"}
            id={drumpad.id}
            keyTrigger={drumpad.keyTrigger}
            onMouseDown={this.playSound}
            disabled={!this.props.power}
          >
            <audio id={drumpad.keyTrigger} src={drumpad.url} className="clip" />
            {drumpad.keyTrigger}
          </button>
        </>
      )
    }
  }

}

class App extends React.Component {

  constructor(props) {
    super(props);
    // App Setup / Drum Banks
    this.state = {
      power: 1,
      currentBank: 0,
      volume: 0,
      keyset: ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'],
      drumBank: [
        {"name": "Heater Kit", "samples":
          [{
            keyCode: 81,
            keyTrigger: 'Q',
            id: 'Heater-1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
          }, {
            keyCode: 87,
            keyTrigger: 'W',
            id: 'Heater-2',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
          }, {
            keyCode: 69,
            keyTrigger: 'E',
            id: 'Heater-3',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
          }, {
            keyCode: 65,
            keyTrigger: 'A',
            id: 'Heater-4',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
          }, {
            keyCode: 83,
            keyTrigger: 'S',
            id: 'Clap',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
          }, {
            keyCode: 68,
            keyTrigger: 'D',
            id: 'Open-HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
          }, {
            keyCode: 90,
            keyTrigger: 'Z',
            id: "Kick-n'-Hat",
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
          }, {
            keyCode: 88,
            keyTrigger: 'X',
            id: 'Kick',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
          }, {
            keyCode: 67,
            keyTrigger: 'C',
            id: 'Closed-HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
          },
        ]
        },
        {"name": "Smooth Piano Kit", "samples":
          [{
            keyCode: 81,
            keyTrigger: 'Q',
            id: 'Chord-1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
          }, {
            keyCode: 87,
            keyTrigger: 'W',
            id: 'Chord-2',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
          }, {
            keyCode: 69,
            keyTrigger: 'E',
            id: 'Chord-3',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
          }, {
            keyCode: 65,
            keyTrigger: 'A',
            id: 'Shaker',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
          }, {
            keyCode: 83,
            keyTrigger: 'S',
            id: 'Open-HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
          }, {
            keyCode: 68,
            keyTrigger: 'D',
            id: 'Closed-HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
          }, {
            keyCode: 90,
            keyTrigger: 'Z',
            id: 'Punchy-Kick',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
          }, {
            keyCode: 88,
            keyTrigger: 'X',
            id: 'Side-Stick',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
          }, {
            keyCode: 67,
            keyTrigger: 'C',
            id: 'Snare',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
          }]
        }
      ]
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changePower = this.changePower.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  // Boot
  componentDidMount() {
    console.info("componentDidMount()");
    document.addEventListener('keydown', this.handleKeyDown);
  }
  
  // Close
  componentWillUnmount() {
    console.info("componentWillUnmount()");
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  
  // Change Power
  changePower() {
    if(this.state.power===0) {
      this.setState({power: 1});
      printDisplay("Power On");
    } else {
      this.setState({power: 0});
      printDisplay("Power Off");
    }
    
  }
  
  // Change Bank
  changeBank(idbank) {
    console.log("changeBank", idbank);
    this.setState({currentBank: idbank});
    printDisplay(this.state.drumBank[idbank].name);
  }

  // Play Sound (keystrokes)
  playSound(e) {
    console.log("playSound[App]", "e=", e, "props=", this.props, "this=", this);
    if(this.state.power===1) {
      const drumpad = this.props.drumpad;
      const sound = document.getElementById(e);
      const button = sound.parentElement;
      printDisplay(button.id.replace(/-/g, " "));
      sound.currentTime = 0;
      sound.volume = (this.state.volume);
      sound.play();
      button.classList.add("drum-pad-active");
      const timeout = setTimeout(function() {
        button.classList.remove("drum-pad-active");
      }, 150);
    }
  }
  
  // Change Volume
  changeVolume(vol) {
    printDisplay("Volume " + parseInt(vol * 100));
    this.setState({ volume: vol });
  }
  
  // Key Down manager
  handleKeyDown(e, props) {
    const key = String.fromCharCode(e.keyCode).toUpperCase();
    console.log("handleKeyDown", e, e.keyCode, key);
    if (this.state.keyset.includes(key, 0)) {
      this.playSound(key, this.props);
    }
  }

  // Render App
  render() {
    
    const bank = this.state.drumBank[this.state.currentBank];
    const pads = bank.samples.map((drumpad, i) => {
      return (
        <>
          <DrumPad drumpad={drumpad} volume={this.state.volume} power={this.state.power} idx={i} />
        </>
      )
    });
    return (
      <>
      
        <div className="row ">
          
          <div className="col drum-machine-box">
            {pads}
          </div>
          
          <div className="col">
            
            <div className="row drum-machine-section">
              
              <div className="col-8">
                
                <div className="d-grid">
               
                  <input type="radio" className="btn-check" name="options" id="drum-bank-0" autocomplete="off"
                  onChange={() => this.changeBank(0) }
                  checked={this.state.currentBank===0}
                  disabled={this.state.power===0}
                  />
                  <label className="btn btn-outline-primary" for="drum-bank-0">{this.state.drumBank[0].name}</label>

                  <input type="radio" className="btn-check" name="options" id="drum-bank-1" autocomplete="off"
                  onChange={() => this.changeBank(1) }
                  checked={this.state.currentBank===1}
                  disabled={this.state.power===0}
                  />
                  <label className="btn btn-outline-secondary" for="drum-bank-1">{this.state.drumBank[1].name}</label>

                </div>

              </div>

              <div className="col-4">

                  <div className="form-check form-switch float-end">
                    <input id="power" className="form-check-input input-danger" type="checkbox" role="switch"
                    onChange={this.changePower}
                    checked={this.state.power}
                    ></input>
                  </div>

              </div>

            </div>
            
            <div className="row drum-machine-section">
              <div className="col">
                  <div id="display">
                    {this.state.drumBank[this.state.currentBank].name}
                  </div>
              </div>
            </div>

            <div className="row drum-machine-section">
              <div className="col">

                <div className="volume">
                  
                  <div className="input-group">
                    <button className="btn btn-secondary" type="button" onClick={() => this.changeVolume(0)}><FiVolumeX className="icon" /></button>
                    <input type="range" className="form-control slider" min="0.0" max="1.0" step="0.01" id="volume" value={this.state.volume}
onChange={() => this.changeVolume(event.target.value)}
/>
                    <button className="btn btn-primary" type="button" onClick={() => this.changeVolume(1)}><FiVolume2 className="icon" /></button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </>
    );
  }
  
}


// Render
const root = ReactDOM.createRoot(document.getElementById('drum-machine'));
root.render(<App />);
