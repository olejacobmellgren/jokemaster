import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/MainPage";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import JokeBox from "./components/JokeBox.tsx";
import { CategoryProvider } from "./components/CategoryContext.tsx";

function App() {
  const queryClient = new QueryClient();

  // Create an async function to fetch and store jokes
  async function fetchAndStoreJokes() {
    const jokesCached = localStorage.getItem("Programming");
    if (!jokesCached) {
      const categories = ["Programming", "Pun", "Spooky", "Christmas"];
      let allJokesList = [];
      for (const category of categories) {
        try {
          // Fetch 10 jokes from the specified category
          const apiJokes = await queryClient.fetchQuery(
            [`jokes_${category}`],
            () =>
              fetch(`https://v2.jokeapi.dev/joke/${category}?amount=10`).then(
                (res) => res.json(),
              ),
          );
          let jokesList = [];
          for (let i = 0; i < 10; i++) {
            jokesList.push(apiJokes.jokes[i]);
            allJokesList.push(apiJokes.jokes[i]);
          }
          // Store jokes for category in localStorage
          localStorage.setItem(category, JSON.stringify(jokesList));
        } catch (error) {
          console.error("Error fetching jokes:", error);
        }
      }
      allJokesList.sort(() => Math.random() - 0.5); // randomizes the list. This list includes 40 jokes
      localStorage.setItem("randomJokes", JSON.stringify(allJokesList));
    }
  }

  // Use the fetchAndStoreJokes function in the useEffect
  useEffect(() => {
    fetchAndStoreJokes();
  }, []);

  return (
    <CategoryProvider>
      <>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Mainpage />} />
          </Routes>
        </div>
        <JokeBox />
      </>
    </CategoryProvider>
  );
}

export default App;
