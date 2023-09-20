import Header from "./components/Header.tsx";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import JokeBox from "./components/JokeBox.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import DarkModeProvider from "./context/DarkModeContext.tsx";

interface Joke {
  // Define the structure of your JSON object here
  type: string;
  setup: string;
  delivery: string;
  joke: string;
  id: number;
  category: string;
  // Add other properties if present in your JSON objects
}

const queryClient = new QueryClient();

function JokeComponent() {
  const categories = ["Programming", "Pun", "Spooky", "Christmas"];
  const jokesCached_2 = localStorage.getItem("Programming");

  if (!jokesCached_2) {
    useQuery({
      queryKey: ["apiData", "Categories"],
      queryFn: async () => {
        const randomJokesString = localStorage.getItem("randomJokes");
        let allJokesList: Joke[] = randomJokesString
          ? JSON.parse(randomJokesString)
          : [];

        await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://v2.jokeapi.dev/joke/${category}?amount=10`,
            );
            const data = await res.json();
            const jokesList = data.jokes; // length == 10

            const jokesCached = localStorage.getItem(category);

            if (!jokesCached) {
              localStorage.setItem(category, JSON.stringify(jokesList));
              allJokesList = allJokesList.concat(jokesList);
            }
          }),
        );
        allJokesList.sort(() => Math.random() - 0.5);

        localStorage.setItem("randomJokes", JSON.stringify(allJokesList));

        return allJokesList;
      },
    });
  }

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <CategoryProvider>
          <Header />
          <JokeComponent />
          <JokeBox />
        </CategoryProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
