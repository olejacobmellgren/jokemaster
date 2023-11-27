import { useState, useEffect } from "react";
import "../assets/JokeBox.css";
import favorite from "../assets/images/favorite.png";
import noFavorite from "../assets/images/no-favorite.png";

interface Joke {
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  id: number;
}

function JokeBox({ currentFilter }: { currentFilter: string }) {
  const [counter, setCounter] = useState(0); // used as index for current joke
  const [setUp, setSetUp] = useState("");
  const [delivery, setDelivery] = useState("");
  const [jokesFromCategory, setJokesFromCategory] = useState<Joke[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const categories = [
    "Category",
    "Programming",
    "Pun",
    "Spooky",
    "Christmas",
    "Favorites",
  ];
  const [storedCounter, setStoredCounter] = useState(
    JSON.parse(sessionStorage.getItem("storedCounter") || "[0,0,0,0,0,0]"),
  );

  useEffect(() => {
    // recursive function to fetch data from localStorage and sessionStorage
    const fetchDataFromLocalStorage = () => {
      const jokesCached = sessionStorage.getItem("randomJokes");
      if (jokesCached && JSON.parse(jokesCached).length === 40) {
        // Store user-favorites inside "favorites"
        let favorites: Joke[] = [];
        const favoritesCached = localStorage.getItem("Favorites");
        if (favoritesCached) {
          favorites = JSON.parse(favoritesCached) as Joke[];
        }
        setFavorites(favorites);
        updateJokelist();
      } else {
        // if data is not available yet, wait for a short interval and try again
        setTimeout(fetchDataFromLocalStorage, 100); // wait for 100ms before trying again
      }
    };
    fetchDataFromLocalStorage(); // Call the function initially
  }, []);

  useEffect(() => {
    if (jokesFromCategory.length !== 0) {
      if (jokesFromCategory[counter].type === "single") {
        setSetUp("");
        setDelivery(jokesFromCategory[counter].joke);
      } else {
        setSetUp(jokesFromCategory[counter].setup);
        setDelivery(jokesFromCategory[counter].delivery);
      }
      checkIfFavorite(jokesFromCategory[counter]);
    }
  }, [counter, jokesFromCategory]);

  useEffect(() => {
    updateJokelist();
    const index = categories.indexOf(currentFilter);
    setCounter(storedCounter[index]);
  }, [currentFilter]);

  useEffect(() => {
    sessionStorage.setItem("storedCounter", JSON.stringify(storedCounter));
  }, [storedCounter]);

  // Update the list setJokesFromCategory depending on what filter is stored in sessionStorage. Initial jokes
  const updateJokelist = () => {
    let newJokes: Joke[] = [];
    let newJokesCached;
    if (currentFilter == "Category") {
      newJokesCached = sessionStorage.getItem("randomJokes");
    } else {
      if (currentFilter != "Favorites") {
        newJokesCached = sessionStorage.getItem(currentFilter);
      } else {
        newJokesCached = localStorage.getItem(currentFilter);
      }
    }
    if (newJokesCached) {
      newJokes = JSON.parse(newJokesCached) as Joke[];
    }
    setJokesFromCategory(newJokes);
  };

  const handleRightClick = () => {
    const index = categories.indexOf(currentFilter);
    const updatedCounter = [...storedCounter];
    if (counter + 1 < jokesFromCategory.length) {
      setCounter((prevCounter) => prevCounter + 1);
      updatedCounter[index] = storedCounter[index] + 1;
    } else {
      setCounter(0);
      updatedCounter[index] = 0;
    }
    setStoredCounter(updatedCounter);
  };

  const handleLeftClick = () => {
    const index = categories.indexOf(currentFilter);
    const updatedCounter = [...storedCounter];
    if (counter + 1 !== 1) {
      setCounter((prevCounter) => prevCounter - 1);
      updatedCounter[index] = storedCounter[index] - 1;
    } else {
      setCounter(jokesFromCategory.length - 1);
      updatedCounter[index] = jokesFromCategory.length - 1;
    }
    setStoredCounter(updatedCounter);
  };

  const checkIfFavorite = (currentJoke: Joke) => {
    const isInFavorites = favorites.some(
      (favorite) => favorite.id === currentJoke.id,
    );
    setIsFavorite(isInFavorites);
  };

  const handleFavorite = () => {
    const joke = jokesFromCategory[counter];
    let updatedFavorites;
    if (!isFavorite) {
      updatedFavorites = [...favorites, joke];
      setFavorites(updatedFavorites);
      setIsFavorite(true);
    } else {
      if (currentFilter === "Favorites") {
        if (counter + 1 === favorites.length) {
          handleLeftClick();
        }
      } else {
        setIsFavorite(false);
      }
      updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== joke.id,
      );
      setFavorites(updatedFavorites);
    }
    if (currentFilter === "Favorites") {
      setJokesFromCategory(updatedFavorites);
    }
    localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <div className="jokeboxWrapper">
        {currentFilter === "Category" ? null : (
          <div className="jokeboxTop">
            <select
              id="selectJoke"
              value="default"
              onChange={(event) => {
                const [, index] = JSON.parse(event.target.value);
                setCounter(index);
              }}
            >
              <option value="default" style={{ display: "none" }} disabled>
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
          </div>
        )}
        <div className="jokebox">
          <div>
            <button
              onClick={handleLeftClick}
              className="scrollButton scrollButtonTop"
            >
              <i className="arrow left"></i>
            </button>
          </div>
          <div className="joke">
            {currentFilter === "Favorites" && jokesFromCategory.length === 0 ? (
              <p>You have no favorites</p>
            ) : (
              <>
                {setUp !== "" && <p>{setUp}</p>}
                {delivery && <p>{delivery}</p>}
              </>
            )}
          </div>
          <div>
            <button
              onClick={handleRightClick}
              className="scrollButton scrollButtonTop"
            >
              <span className="arrow right"></span>
            </button>
          </div>
        </div>
        <div className="jokeboxBottom">
          <div>
            <button
              onClick={handleLeftClick}
              className="scrollButton scrollButtonBottom"
              data-testid="left"
            >
              <i className="arrow left"></i>
            </button>
          </div>
          <div>
            {currentFilter === "Favorites" &&
            favorites.length === 0 ? null : isFavorite ? (
              <img
                onClick={handleFavorite}
                className="icon"
                src={favorite}
                data-testid="favorited"
              ></img>
            ) : (
              <img
                onClick={handleFavorite}
                className="icon"
                src={noFavorite}
                data-testid="nofavorite"
              ></img>
            )}
          </div>
          <div>
            <button
              onClick={handleRightClick}
              className="scrollButton scrollButtonBottom"
              data-testid="right"
            >
              <span className="arrow right"></span>
            </button>
          </div>
        </div>
        {jokesFromCategory.length !== 0 && (
          <div className="counter">
            <p>
              {counter + 1} / {jokesFromCategory.length}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default JokeBox;
