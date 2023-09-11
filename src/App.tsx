import Header from './components/Header.tsx';
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/MainPage";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import JokeBox from './components/JokeBox.tsx';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const jokesCached = localStorage.getItem('Programming');
    if (!jokesCached) {
      const categories = ['Programming', 'Pun', 'Spooky', 'Christmas'];
      for (let i = 0; i < 4; i++) {
        // Create a function that takes the category as an argument
        const fetchJokesForCategory = (category: string) => {
          // Create an array of promises to fetch jokes from each category
          const fetchJokesPromises = [];
          // Fetch 10 jokes from the specified category
          for (let k = 0; k < 10; k++) {
            fetchJokesPromises.push(
              queryClient.fetchQuery([`jokes${k}_${category}`], () =>
                fetch(`https://v2.jokeapi.dev/joke/${category}`).then((res) =>
                  res.json(),
                ),
              ),
            );
          }
          // Fetch all jokes from the category concurrently
          Promise.all(fetchJokesPromises)
            .then((jokes) => {
              // Store jokes for category in localStorage
              localStorage.setItem(category, JSON.stringify(jokes));
            })
            .catch((error) => {
              console.error("Error fetching jokes:", error);
            });
        };

        // Call the function with the current category
        const currentCategory = categories[i];
        fetchJokesForCategory(currentCategory);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />} />
        </Routes>
      </div>
      <JokeBox />
    </>
  );
}

export default App;
