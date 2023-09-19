import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import Mainpage from "./pages/MainPage";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  let allJokesList: Joke[] = []

  const {
    isLoading: isLoadingProgramming,
    isError: isErrorProgramming,
  } = useQuery({
    queryKey: ["apiData", "Programming"],
    queryFn: async () => {
      const res = await fetch(`https://v2.jokeapi.dev/joke/Programming?amount=10`);
      const data = await res.json();
      const jokesList = data.jokes; // length == 10

      // Store jokes for category in localStorage
      const jokesCached = localStorage.getItem("Programming")
      if (!jokesCached) {
        localStorage.setItem("Programming", JSON.stringify(jokesList));
  
        allJokesList = allJokesList.concat(jokesList)
        allJokesList = allJokesList.filter(joke => joke !== undefined);
        allJokesList.sort(() => Math.random() - 0.5);
  
        localStorage.setItem("randomJokes", JSON.stringify(allJokesList))
      }

      return allJokesList
    }
  });
  
  const {
    isLoading: isLoadingPun,
    isError: isErrorPun
  } = useQuery({
    queryKey: ["apiData", "Pun"],
    queryFn: async () => {
      const res = await fetch(`https://v2.jokeapi.dev/joke/Pun?amount=10`);
      const data = await res.json();
      const jokesList = data.jokes; // length == 10
  
      // Store jokes for category in localStorage
      const jokesCached = localStorage.getItem("Pun")
      if (!jokesCached) {
        localStorage.setItem("Pun", JSON.stringify(jokesList));
  
        allJokesList = allJokesList.concat(jokesList)
        allJokesList = allJokesList.filter(joke => joke !== undefined);
        allJokesList.sort(() => Math.random() - 0.5);
  
        localStorage.setItem("randomJokes", JSON.stringify(allJokesList))
      }

      return allJokesList
    }
  });
  
  const {
    isLoading: isLoadingSpooky,
    isError: isErrorSpooky
  } = useQuery({
    queryKey: ["apiData", "Spooky"],
    queryFn: async () => {
      const res = await fetch(`https://v2.jokeapi.dev/joke/Spooky?amount=10`);
      const data = await res.json();
      const jokesList = data.jokes; // length == 10

      // Store jokes for category in localStorage
      const jokesCached = localStorage.getItem("Spooky")
      if (!jokesCached) {
        localStorage.setItem("Spooky", JSON.stringify(jokesList));
  
        allJokesList = allJokesList.concat(jokesList)
        allJokesList = allJokesList.filter(joke => joke !== undefined);
        allJokesList.sort(() => Math.random() - 0.5);
  
        localStorage.setItem("randomJokes", JSON.stringify(allJokesList))
      }

      return allJokesList
    }
  });
  
  const {
    isLoading: isLoadingChristmas,
    isError: isErrorChristmas
  } = useQuery({
    queryKey: ["apiData", "Christmas"],
    queryFn: async () => {
      const res = await fetch(`https://v2.jokeapi.dev/joke/Christmas?amount=10`);
      const data = await res.json();
      const jokesList = data.jokes; // length == 10

      // Store jokes for category in localStorage
      const jokesCached = localStorage.getItem("Christmas")
      if (!jokesCached) {
        localStorage.setItem("Christmas", JSON.stringify(jokesList));
  
        allJokesList = allJokesList.concat(jokesList)
        allJokesList = allJokesList.filter(joke => joke !== undefined);
        allJokesList.sort(() => Math.random() - 0.5);
  
        localStorage.setItem("randomJokes", JSON.stringify(allJokesList))
      }

      return allJokesList
    }
  });

  if (isLoadingProgramming || isLoadingPun || isLoadingSpooky || isLoadingChristmas) {
    return <p>Loading...</p>
  } else if (isErrorProgramming || isErrorPun || isErrorSpooky || isErrorChristmas) {
    return <p>Error fetching</p>
  }

  return null
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <CategoryProvider>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/" element={<Mainpage />} />
            </Routes>
          </div>
          <JokeComponent />
          <JokeBox />
        </CategoryProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
