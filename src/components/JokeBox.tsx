import { useState, useEffect, ChangeEvent } from "react";
import "../assets/JokeBox.css";
import { useCategory } from "../context/CategoryContext";
import favorite from "../assets/images/favorite.png";
import noFavorite from "../assets/images/no-favorite.png";

interface Joke {
  // Define the structure of your JSON object here
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  id: number;
  // Add other properties if present in your JSON objects
}

function JokeBox() {
  const { selectedCategory } = useCategory();

  const [counter, setCounter] = useState(0); // Counter for jokes from different categories. Goes up to 9
  const [favoriteCounter, setFavoriteCounter] = useState(0); // Counter for Favorites. Goes up to amount of favorites
  const [counterForRandomJokes, setCounterForRandomJokes] = useState(0); // Own counter for random jokes. Goes up to 39
  const [setUp, setSetUp] = useState("");
  const [delivery, setDelivery] = useState("");
  const [randomJokes, setRandomJokes] = useState<Joke[]>([]);
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [jokesFromCategory, setJokesFromCategory] = useState<Joke[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // extracts data from localStorage and saves it to the state "jokes"
  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      // Recursive function to fetch data from localStorage

      // makes a list of all the jokes - sorted randomly
      let randomJokesList: Joke[] = [];
      const jokesCached = localStorage.getItem("randomJokes");
      if (jokesCached) {
        randomJokesList = JSON.parse(jokesCached) as Joke[];

        setRandomJokes(randomJokesList);
        setCounterForRandomJokes(0);

        checkIfFavorite();
        setJokeState(randomJokesList);
      } else {
        // If data is not available yet, wait for a short interval and try again
        setTimeout(fetchDataFromLocalStorage, 100); // wait for 100ms before trying again
      }
    };
    fetchDataFromLocalStorage(); // Call the function initially

    let favorites: Joke[] = [];
    const favoritesJokesCached = localStorage.getItem("Favorites");
    if (favoritesJokesCached) {
      favorites = JSON.parse(favoritesJokesCached) as Joke[];
    }
    setFavorites(favorites);
  }, []);

  // runs when the category is changed. Resets counter to 0 and displays first joke for that category
  useEffect(() => {
    if (selectedCategory !== "DummyCategory") {
      // an important check, without this we cant save the filter
      localStorage.setItem("lastCategory", selectedCategory);
      if (selectedCategory == "Category") {
        // checks if current Category is "Category". If so, reset counter to 0 and display joke from randomJokes-state
        setCounterForRandomJokes(0);

        checkIfFavorite();
        setJokeState(randomJokes);
      } else {
        // else, reset counter to 0 and display joke from jokes-state
        setCounter(0);
        setFavoriteCounter(0);

        //Add all jokes in category to jokelist
        let jokesFromCategory: Joke[] = [];
        const jokesCached = localStorage.getItem(`${selectedCategory}`);
        if (jokesCached) {
          jokesFromCategory = JSON.parse(jokesCached) as Joke[];
        }
        setJokesFromCategory(jokesFromCategory);
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    checkIfFavorite();
    setJokeState(jokesFromCategory);
  }, [jokesFromCategory]);

  // runs when the counter is updated. Ensures that the joke to be displayed is rendered instantly to website
  useEffect(() => {
    if (selectedCategory == "Category") {
      // checks if current Category is "Category". If so, display joke from randomJokes-state
      setJokeState(randomJokes);
    } else if (selectedCategory == "Favorites") {
      // checks if current Category is "Favorites". If so, display joke from favorites-state
      setJokeState(favorites);
    } else {
      // else, display joke from jokes-state
      setJokeState(jokesFromCategory);
    }
    checkIfFavorite();
  }, [counter, counterForRandomJokes, favoriteCounter]);

  function setJokeState(jokeList: Joke[]) {
    // input is the Joke[]-list to fetch joke from. Dependent on current category selected.
    if (jokeList.length !== 0) {
      const index = jokeIndex();
      if (jokeList[index].type == "single") {
        setSetUp("");
        setDelivery(jokeList[index].joke);
      } else {
        setSetUp(jokeList[index].setup);
        setDelivery(jokeList[index].delivery);
      }
    }
  }

  // checks if right limit is reached - if not, increase counter by 1
  function handleRightClick() {
    if (selectedCategory === "Category") {
      if (counterForRandomJokes === 39) {
        return;
      }
      setCounterForRandomJokes((prevCounter) => prevCounter + 1);
    } else if (selectedCategory === "Favorites") {
      if (
        favoriteCounter === favorites.length - 1 ||
        favorites.length - 1 === -1
      ) {
        return;
      }
      setFavoriteCounter((prevCounter) => prevCounter + 1);
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
    } else if (selectedCategory === "Favorites") {
      if (favoriteCounter === 0) {
        return;
      }
      setFavoriteCounter((prevCounter) => prevCounter - 1);
    } else {
      if (counter === 0) {
        return;
      }
      setCounter((prevCounter) => prevCounter - 1);
    }
  }

  // returns the start index(dependent on category)  + current counter-value.
  function jokeIndex() {
    let index = counter;
    if (selectedCategory == "Category") {
      index = 0 + counterForRandomJokes; // use counter for random jokes instead
    } else if (selectedCategory === "Favorites") {
      index = 0 + favoriteCounter;
    }
    return index;
  }

  function getJoke() {
    const index = jokeIndex();
    let joke: Joke;

    if (selectedCategory == "Category") {
      joke = randomJokes[index];
    } else if (selectedCategory == "Favorites") {
      joke = favorites[index];
    } else {
      joke = jokesFromCategory[index];
    }
    return joke;
  }

  function checkIfFavorite() {
    const joke = getJoke();
    const isInFavorites = favorites.some((favorite) => favorite.id === joke.id);
    setIsFavorite(isInFavorites);
  }

  function handleFavorite() {
    if (!isFavorite) {
      const joke = getJoke();
      favorites.push(joke);
      setFavorites(favorites);
      localStorage.setItem("Favorites", JSON.stringify(favorites)); // save to localStorage
    } else {
      const joke = getJoke();
      let indexToRemove;
      if (joke.type === "single") {
        indexToRemove = favorites.findIndex(
          (favorite) =>
            favorite.type === joke.type && favorite.joke === joke.joke,
        );
      } else {
        indexToRemove = favorites.findIndex(
          (favorite) =>
            favorite.type === joke.type &&
            favorite.setup === joke.setup &&
            favorite.delivery === joke.delivery,
        );
      }
      favorites.splice(indexToRemove, 1);
      setFavorites(favorites);
      if (selectedCategory === "Favorites") {
        if (favoriteCounter !== favorites.length) {
          setJokesFromCategory(favorites);
          setJokeState(favorites);
        } else {
          if (favoriteCounter == 0 && favorites.length == 0) {
            setJokesFromCategory(favorites);
            setJokeState(favorites);
          } else {
            setJokesFromCategory(favorites);
            handleLeftClick();
          }
        }
      }
      localStorage.setItem("Favorites", JSON.stringify(favorites)); // save to localStorage
    }
    checkIfFavorite();
  }

  function handleSelectJoke(event: ChangeEvent<HTMLSelectElement>) {
    const selectJoke = document.getElementById(
      "selectJoke",
    ) as HTMLSelectElement;
    const [id, index] = JSON.parse(event.target.value); // Deserialize the string into an array
    setCounter(index);
    if (selectedCategory === "Favorites") {
      setFavoriteCounter(index);
    }
    const selectedJoke = jokesFromCategory.find(
      (joke) => JSON.stringify(joke.id) === id,
    );
    selectJoke.value = "default";

    if (selectedJoke) {
      setJokeState(jokesFromCategory);
    }
  }

  return (
    <>
      <div>
        {selectedCategory === "Category" ? (
          <p>
            {counterForRandomJokes + 1} / {randomJokes.length}
          </p>
        ) : selectedCategory === "Favorites" ? (
          <div>
            {favoriteCounter + 1 === 1 && favorites.length === 0 ? (
              <p></p>
            ) : (
              <p>
                {favoriteCounter + 1} / {favorites.length}
              </p>
            )}
          </div>
        ) : (
          <p>
            {counter + 1} / {jokesFromCategory.length}
          </p>
        )}
        <div className="jokebox">
          <button onClick={handleLeftClick}>previusos</button>
          <div>
            {selectedCategory === "Favorites" && favorites.length === 0 ? (
              <p>You have no favorites</p>
            ) : setUp !== "" ? (
              <p>{setUp}</p>
            ) : null}

            {selectedCategory === "Favorites" && favorites.length === 0 ? (
              <p></p>
            ) : (
              <p>{delivery}</p>
            )}
          </div>
          <button onClick={handleRightClick}> Next </button>
        </div>
        <div>
          {selectedCategory === "Favorites" &&
          favorites.length === 0 ? null : isFavorite ? (
            <img onClick={handleFavorite} className="icon" src={favorite}></img>
          ) : (
            <img
              onClick={handleFavorite}
              className="icon"
              src={noFavorite}
            ></img>
          )}
        </div>
        <div>
          {selectedCategory === "Category" ? null : (
            <select
              id="selectJoke"
              value="default"
              onChange={(event) => {
                setCounter(parseInt(event.target.value));
                handleSelectJoke(event);
              }}
            >
              <option value="default" disabled>
                Select specific joke
              </option>
              {jokesFromCategory.map((joke, index) => (
                <option key={index} value={JSON.stringify([joke.id, index])}>
                  {joke.type == "single"
                    ? joke.joke.slice(0, 30)
                    : joke.setup.slice(0, 30)}
                  ...
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
}

export default JokeBox;
