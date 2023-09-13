import { useState, useEffect } from "react";
import "../assets/JokeBox.css";
import { useCategory } from "./CategoryContext";
import favorite from "../assets/images/favorite.png";
import noFavorite from "../assets/images/no-favorite.png";

interface Joke {
  // Define the structure of your JSON object here
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  // Add other properties if present in your JSON objects
}

function JokeBox() {
  const { selectedCategory } = useCategory();

  const [counter, setCounter] = useState(0); // Counter for jokes from different categories. Goes up to 9
  const [counterForRandomJokes, setCounterForRandomJokes] = useState(0); // Own counter for random jokes. Goes up to 39
  const [setUp, setSetUp] = useState("");
  const [delivery, setDelivery] = useState("");
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [randomJokes, setRandomJokes] = useState<Joke[]>([]);
  const [favorites, setFavorites] = useState<Joke[]>([]);

  // extracts data from localStorage and saves it to the state "jokes"
  useEffect(() => {
    // makes a list of all the jokes - sorted by category
    let list: Joke[] = [];
    const categories = ["Programming", "Pun", "Spooky", "Christmas"];
    for (let i = 0; i < 4; i++) {
      let jokesFromCategory: Joke[] = [];
      const jokesCached = localStorage.getItem(`${categories[i]}`);
      if (jokesCached) {
        jokesFromCategory = JSON.parse(jokesCached) as Joke[];
      }
      list = [...list, ...jokesFromCategory];
    }
    setJokes(list);

    // makes a list of all the jokes - sorted randomly
    let randomJokesList: Joke[] = [];
    const jokesCached = localStorage.getItem("randomJokes");
    if (jokesCached) {
      randomJokesList = JSON.parse(jokesCached) as Joke[];
    }
    setRandomJokes(randomJokesList);
  }, []);

  // runs when the category is changed. Resets counter to 0 and displays first joke for that category
  useEffect(() => {
    if (selectedCategory == "Category") {
      // checks if current Category is "Category". If so, reset counter to 0 and display joke from randomJokes-state
      setCounterForRandomJokes(0);
      setDeliveryState(randomJokes);
    } else {
      // else, reset counter to 0 and display joke from jokes-state
      setCounter(0);
      setDeliveryState(jokes);
    }
  }, [selectedCategory]);

  // runs when the counter is updated. Ensures that the joke to be displayed is rendered instantly to website
  useEffect(() => {
    if (selectedCategory == "Category") {
      // checks if current Category is "Category". If so, display joke from randomJokes-state
      setDeliveryState(randomJokes);
    } else {
      // else, display joke from jokes-state
      setDeliveryState(jokes);
    }
  }, [counter, counterForRandomJokes]);

  function setDeliveryState(jokeList: Joke[]) {
    // input is the Joke[]-list to fetch joke from. Dependent on current category selected.
    if (jokeList.length != 0) {
      const index = setJokeIndexState();
      setSetUp(jokeList[index].setup);
      if (jokeList[index].type == "single") {
        setDelivery(jokeList[index].joke);
      } else {
        setDelivery(jokeList[index].delivery);
      }
    }
  }

  // checks if right limit is reached - if not, increase counter by 1
  function handleRightClick() {
    if (selectedCategory == "Category") {
      if (counterForRandomJokes === 39) {
        return;
      }
      setCounterForRandomJokes((prevCounter) => prevCounter + 1);
    } else {
      if (counter === 9) {
        return;
      }
      setCounter((prevCounter) => prevCounter + 1);
    }
  }

  // checks if left limit is reached - if not, decrease counter by 1
  function handleLeftClick() {
    if (selectedCategory == "Category") {
      if (counterForRandomJokes === 0) {
        return;
      }
      setCounterForRandomJokes((prevCounter) => prevCounter - 1);
    } else {
      if (counter === 0) {
        return;
      }
      setCounter((prevCounter) => prevCounter - 1);
    }
  }

  // returns the start index(dependent on category)  + current counter-value.
  function setJokeIndexState() {
    let index = 0;
    if (selectedCategory == "Programming") {
      index = 0 + counter;
    } else if (selectedCategory == "Pun") {
      index = 10 + counter;
    } else if (selectedCategory == "Spooky") {
      index = 20 + counter;
    } else if (selectedCategory == "Christmas") {
      index = 30 + counter;
    } else {
      index = 0 + counterForRandomJokes; // use counter for random jokes instead
    }
    return index;
  }

  function handleFavorite() {
    
  }

  return (
    <>
      <div>
        <div className="jokebox">
          <button onClick={handleLeftClick}> Previous </button>
          <div>
            {setUp !== "" ? <p>{setUp}</p> : null}
            <p>{delivery}</p>
          </div>
          <button onClick={handleRightClick}> Next </button>
        </div>

        <img onClick={handleFavorite} className="icon" src={noFavorite}></img>
      </div>
    </>
  );
}

export default JokeBox;
