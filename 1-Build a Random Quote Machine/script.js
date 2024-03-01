import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import $ from "https://cdn.skypack.dev/jquery@3.6.4";
const QUOTES = [
  {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Elon Musk"
  },
  {
    text:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    author: "David Goggins"
  },
  {
    text:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Bill Gates"
  },
  {
    text:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Mark Zuckerberg"
  }
];

class QuoteBoxContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuoteIndex: Math.floor(Math.random() * QUOTES.length)
    };

    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  handleNewQuote() {
    this.setState((state) => ({
      currentQuoteIndex:
        state.currentQuoteIndex === QUOTES.length - 1
          ? 0
          : state.currentQuoteIndex + 1
    }));
  }

  render() {
    const quote = QUOTES[this.state.currentQuoteIndex];
    return (
      <div
        id="quote-box"
        className="bg-white p-4 rounded text-primary"
        style={{ maxWidth: "25%" }}
      >
        <h3 id="text" className="text-center">
          {quote.text}
        </h3>
        <h6 className="text-end">
          - <span id="author">{quote.author}</span>
        </h6>
        <br />
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <a
              id="tweet-quote"
              className="btn btn-primary rounded text-white"
              href="https://twitter.com/intent/tweet"
              target="_top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
            </a>
            <a className="btn btn-primary rounded text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
                fill="white"
              >
                <path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z" />
              </svg>
            </a>
          </div>
          <button
            onClick={this.handleNewQuote}
            id="new-quote"
            className="btn btn-primary"
          >
            New quote
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<QuoteBoxContent />, document.getElementById("wrapper-box"));
