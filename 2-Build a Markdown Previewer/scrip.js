/* Libraries for REACT */
import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standartText: '#Headline1\n##Headline2\n[Link](https://www.google.com)\n\nInline code: \n\n \`<div id=\'test\'>test</div>\`,\n\n\`\`\`\n//Code block:\n\nnewText(event){\nthis.setState({standartText: event.target.value});\n}\n\`\`\`\n\nList:\n\n * item1\n * item2\n * item3\n\nQuote:\n\n\"Quote here\"\n\n Image:\n\n![](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg)\n\n**Bold**'
    };
    this.newText = this.newText.bind(this);
 }
  newText(event){
    this.setState({standartText: event.target.value});
  }
  render() {
        return(
         <div>
           <div id='display'>
              <textarea id='editor' value={this.state.standartText} onChange={this.newText}>{this.state.standartText}</textarea>
              <div id='preview' dangerouslySetInnerHTML={{__html: marked(marked(this.state.standartText, {sanitizer: true}))}} />
            </div>
        </div>
        );
  }
}
ReactDOM.render(<Markdown/>, document.getElementById('markdown'));
