import React, { Component } from "react";
import MatchCard from "./components/Card";
import Wrapper from "./components/Wrapper";
// import Navbar from "./components/Navbar";
import Title from "./components/Title";
import matches from "./cards.json";
import "./App.css";

// Global variables set for the state
let correctGuesses = 0;
let topScore = 0;
let clickAlert =
  "Click a character to increase your score and find out if you have what it takes to be Number 1! But beware, clicking the same character twice will result in a Game Over!";

class App extends Component {
// Setting the state by using the global variables
  state = {
    matches,
    correctGuesses,
    topScore,
    clickAlert
  };

// Function created for setting new state on clicked images
  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);
// Using a for loop to loop through the card array and find out if the id matches an alredy clicked id
    if (clickedMatch[0].clicked) {
      correctGuesses = 0;
      clickAlert = "Game Over! You already clicked that one!.";
    
      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
// Reset the state to whatever is true from the above click function
      this.setState({ clickAlert });
      this.setState({ correctGuesses });
      this.setState({ matches });

    } else if (correctGuesses < 9) {
// Finding out if the clicked image does not match the previously clicked image
      clickedMatch[0].clicked = true;
// If it doesn't match previous image add 1 to the Current Score
      correctGuesses++;
      clickAlert = "That's a new one! Keep clicking!";

// When an image gets clicked twice in a row, set topScore state to the number of correct guesses
      if (correctGuesses > topScore) {
        topScore = correctGuesses;
        this.setState({ topScore });
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

// Reset the state to whatever is true from the above click function
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });

    } else {
      clickedMatch[0].clicked = true;
// If correct guesses equals the amount of images in the array, reset score to 0 and set state of score to 10 (top score acheivable)
      correctGuesses = 0;
      clickAlert = "PERFECT 10!!!! You have achieved the Top Score! ";
      topScore = 10;

      this.setState({ topScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

// Reset the state to whatever is true from the above click function
      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });
    }
  };

  render() {
    return (
      <Wrapper>
        {/* <Navbar /> */}
        <div className="container">
          <Title>Clickity Clickity That's All Folks</Title>
          <br />
          <h3 className="scoreSummary">{this.state.clickAlert}</h3>
          <h3 className="scoreSummary card-header">
            Current Score : {this.state.correctGuesses}
            <br />
            Top Score : {this.state.topScore}
          </h3>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            {this.state.matches.map(match => (
              <MatchCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default App;
