import Header from "./components/Header.tsx";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import JokeBox from "./components/JokeBox.tsx";
import DarkModeProvider from "./context/DarkModeContext.tsx";
import { useState } from "react";

// Interface for joke
interface Joke {
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  id: number;
  category: string;
}

const queryClient = new QueryClient();

function JokeComponent() {
  const categories = ["Programming", "Pun", "Spooky", "Christmas"];
  const jokesCached_2 = sessionStorage.getItem("Programming");

  if (!jokesCached_2) {
    // only fetch jokes from API if sessionStorage is empty
    useQuery({
      queryKey: ["apiData", "Categories"],
      queryFn: async () => {
        const randomJokesString = sessionStorage.getItem("randomJokes");
        let allJokesList: Joke[] = randomJokesString
          ? JSON.parse(randomJokesString)
          : [];

        await Promise.all(
          categories.map(async (category) => {
            // fetch jokes from each category
            const res = await fetch(
              `https://v2.jokeapi.dev/joke/${category}?amount=10`,
            );
            const data = await res.json();
            const jokesList = data.jokes; // length == 10

            const jokesCached = sessionStorage.getItem(category);

            if (!jokesCached) {
              sessionStorage.setItem(category, JSON.stringify(jokesList)); // store jokes form specific category in sessionStorage
              allJokesList = allJokesList.concat(jokesList);
            }
          }),
        );
        allJokesList.sort(() => Math.random() - 0.5); // randomize the list

        sessionStorage.setItem("randomJokes", JSON.stringify(allJokesList));

        return allJokesList;
      },
    });
  }

  return null;
}

function App() {
  const [currentFilter, setCurrentFilter] = useState(
    sessionStorage.getItem("Category") || "Category",
  );

  // Update current filter applied
  const handleCategoryChange = (value: string) => {
    setCurrentFilter(value);
  };

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Header onSelect={(value) => handleCategoryChange(value)} />
        <JokeComponent />
        <JokeBox currentFilter={currentFilter} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
