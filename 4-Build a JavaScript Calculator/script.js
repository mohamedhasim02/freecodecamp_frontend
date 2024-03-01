// Global vars
const MAX_DIGITS = 21,
      IS_OPERATOR = /[*/+‑]/,
      IS_DECIMAL = /([^.0-9]0|^0)$/,
      ENDS_WITH_OPERATOR = /[*/+-]$/,
      ROUND_VALUE = 1_000_000_000_000;

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      previous: "0",
      history: "0",
      commit: false
    };
    
    this.handleClear = this.handleClear.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleCommand = this.handleCommand.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    
  }
  
  componentDidMount() {
  }
  
  handleClear() {
    console.log("handleClear");
    this.setState({
      current: "0",
      previous: "0",
      history: "0",
      commit: false
    });
  }
  
  handleNumber(e) {
    const value = e.target.value;
    const { current, history, commit } = this.state;
    console.log("handleNumber", current, history, value);
    this.setState({ commit: false });
    
    if (value.length > MAX_DIGITS) {
      // Nothing OR Warning
    } else if (commit) {
      this.setState({
          current: value,
          history: (value !== "0" ? value : "")
        });
    } else {
      this.setState({
        current:
            current === "0" || IS_OPERATOR.test(current)
              ? value
              : current + value,
        history:
            current === "0" && value === "0"
              ? history === "" ? value : history
              : IS_DECIMAL.test(history)
                ? history.slice(0, -1) + value
                : history + value
      });
    }
    
  }
  
  handleCommand(e) {
    if (true) {

      const value = e.target.value;
      const { history, previous, commit } = this.state;

      this.setState({ current: value, commit: false });
      
      if (commit) {

        // Consolidate formula
        this.setState({ history: previous + value });
        console.log("handleCommand-1", previous, history, history + value);
      
      } else if (/[*/+][-]$/.test(history) && value !== "-") {
        
        // (Operator + Subtract) + Operator -> Clean the subtract and previous operator
        this.setState({
          previous: previous.slice(0, -1),
          history: previous.slice(0, -1) + value
        });
        console.log("handleCommand-2", previous, history, history + value);
        
      } else if (/[*/+]$/.test(history)) {

        // Operator + Subtract -> No changes
        // Operator + Operator -> Remove last operator before add new one
        if(value === "-") {
          this.setState({
            previous: history,
            history: history + value
          });
          console.log("handleCommand-3a", previous, history, history + value);
        } else {
          this.setState({
            history: previous + value
          });
          console.log("handleCommand-3b", previous, history, history + value);
        }
        
      } else if (/[-]$/.test(history)) {
        
        // Last operator is subtract -> New operator replaces it
        this.setState({
          history: previous + value
        });
        console.log("handleCommand-4", previous, history, history + value);
        
      } else {
        
        // Numbers + Operator
        this.setState({
          previous: history,
          history: history + value
        });
        console.log("handleCommand-5", previous, history, history + value);

      }

    }
    
  }
  
  handleDecimal() {
    console.log("handleDecimal");
    
    if (this.state.commit === true) {
      this.setState({
        current: "0.",
        history: "0.",
        commit: false
      });
    } else if (
      !this.state.current.includes(".") &&
      this.state.current.length < MAX_DIGITS
    ) {
      this.setState({ commit: false });
      if (this.state.current.length > MAX_DIGITS) {
        // Warning
      } else if (
        /[*/+-]$/.test(this.state.history) ||
        (this.state.current === "0" && this.state.history === "")
      ) {
        this.setState({
          current: "0.",
          history: this.state.history + "0."
        });
      } else {
        this.setState({
          current: this.state.history.match(/(-?\d+\.?\d*)$/)[0] + ".",
          history: this.state.history + "."
        });
      }
    }
    
  }
  
  handleEvaluate() {
    const { current, previous, history, commit } = this.state;
    console.log("handleEvaluate", "current=" + current, "previous=" + previous, "history=" + history, "commit=" + commit, this.state.current.length);
    if (true || !this.state.current.length > MAX_DIGITS) {
      let expression = this.state.history;
      while (ENDS_WITH_OPERATOR.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/‑/g, "-");
      let result = Math.round(ROUND_VALUE * eval(expression)) / ROUND_VALUE;
      this.setState({
        current: result.toString(),
        history:
          expression.replace(/-/g, "‑") + "=" + result,
        previous: result,
        commit: true
      });
    }
    
  }
  
  render() {
    return (
      <>
        <Display
          current={this.state.current}
          previous={this.state.previous}
          history={this.state.history}
        />
        <Buttons
          handleClear={this.handleClear}
          handleCommand={this.handleCommand}
          handleNumber={this.handleNumber}
          handleDecimal={this.handleDecimal}
          handleEvaluate={this.handleEvaluate}
        />
      </>
    );
  }
}

class Buttons extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="calculator-buttons">
        <button
        id="clear"
        className="btn btn-danger"
        onClick={this.props.handleClear}
        >
        AC
        </button>
        <button
        id="divide"
        className="btn btn-secondary"
        onClick={this.props.handleCommand}
        value="/"
        >
        /
        </button>
        <button
        id="multiply"
        className="btn btn-secondary"
        onClick={this.props.handleCommand}
        value="*"
        >
        *
        </button>

        <br />

        <button
        id="seven"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="7"
        >
        7
        </button>
        <button
        id="eight"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="8"
        >
        8
        </button>
        <button
        id="nine"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="9"
        >
        9
        </button>
        <button
        id="subtract"
        className="btn btn-secondary"
        onClick={this.props.handleCommand}
        value="-"
        >
        -
        </button>

        <br />

        <button
        id="four"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="4"
        >
        4
        </button>
        <button
        id="five"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="5"
        >
        5
        </button>
        <button
        id="six"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="6"
        >
        6
        </button>
        <button
        id="add"
        className="btn btn-secondary"
        onClick={this.props.handleCommand}
        value="+"
        >
        +
        </button>

        <br />

        <button
        id="one"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="1"
        >
        1
        </button>
        <button
        id="two"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="2"
        >
        2
        </button>
        <button
        id="three"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="3"
        >
        3
        </button>
        <button
        id="equals"
        className="btn btn-success"
        onClick={this.props.handleEvaluate}
        >
        =
        </button>

        <br />

        <button
        id="zero"
        className="btn btn-primary"
        onClick={this.props.handleNumber}
        value="0"
        >
        0
        </button>
        <button
        id="decimal"
        className="btn btn-secondary"
        onClick={this.props.handleDecimal}
        >
        .
        </button>
     
      </div>
    );
  }
}

class Display extends React.Component {
  
  render() {
    return (
      <div className="calculator-display">
        <div id="history" className="">{this.props.history}</div>
        <div id="display" className="">{this.props.current}</div>
      </div>
    );
  }
  
}

// Render
const root = ReactDOM.createRoot(document.getElementById('calculator'));
root.render(<Calculator />);
