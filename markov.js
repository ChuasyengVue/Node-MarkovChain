/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let marChains = new Map();

    for(let c = 0; c < this.words.length; c += 1){
      let word = this.words[c];
      let nextWord = this.words[c + 1] || null;

      if(marChains.has(word)) {
        marChains.get(word).push(nextWord);
      }
      else{
        (marChains.set(word, [nextWord]));
      }
    }
    
    this.marChains = marChains;
    }



  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let word = Array.from(this.marChains.keys());
    let firstIndex = Math.floor(Math.random() * word.length);
    let currentWord = word[firstIndex];
    let msg = [];

    for(let i = 0; i < numWords; i++){
      msg.push(currentWord);
      let nextWord = this.marChains.get(currentWord);
      let nextIndex = Math.floor(Math.random() * nextWord.length);
      currentWord = nextWord[nextIndex];
      if(currentWord === null) {
        break;
      }
    }
    return msg.join(' ');
  }
}

module.exports = MarkovMachine;
