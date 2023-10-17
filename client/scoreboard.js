class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  // TODO #8: Save the word score to the server
  async saveWordScore(name, word, score) {
    //let w = []; 
    //w.push({ name, word, score });
    this.words.push({ name, word, score });
    //console.log("words ", this.words);
    try{
      const response = await fetch('/wordScore', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name, word: word, score: score }),
      });
    }catch(err){
      console.log(err);
    }
    
  }

  render(element) {
    let html = '<h1>Word Scores</h1>';
    html += '<table>';
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = '<h1>Game Score</h1>';
    html += '<table>';
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }

  // TODO #9: Save the game score to the server
  async saveGameScore(name, score) {
    let gameTurns = [];
    gameTurns.push({name, score});
    try{
      const response = await fetch('/gameScore', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          score:score
        })
      });
      if(!response.ok){
        throw new Error(`Error! Status: ${response.status}`);
      }
    }
    catch(error){
      console.log(error);
    }
  }
}

class TopWordAndGameScoreBoard {
  // TODO #10: Render the top word and game scores
  
  async render(element) {
    const wordResponse = await fetch('/highestWordScores');
    const wordData = await wordResponse.json();
    const wordScores = wordData.scores;
    let html = '<h1>Top 10 Word Scores</h1>';
    html += '<table class="top-score-boards">';
    wordScores.forEach((score) => {
      html += `
        <tr>
          <td>${score.name}</td>
          <td>${score.word}</td>
          <td>${score.score}</td>
        </tr>
      `;
    });
    html += '</table>';

    const gameResponse = await fetch('/highestGameScores');
    //const gameScores = await gameResponse.json();
    const gameData = await gameResponse.json();
    const gameScores = gameData.scores;
    html += '<h1>Top 10 Game Scores</h1>';
    html += '<table class="top-score-boards">';
    gameScores.forEach((score) => {
      html += `
        <tr>
          <td>${score.name}</td>
          <td>${score.score}</td>
        </tr>
      `;
    });
    html += '</table>';
    element.innerHTML = html;
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
