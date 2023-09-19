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

  const { isLoading, isError} = useQuery({
    queryKey: ["apiData", "Categories"],
    queryFn: async () => {
      const res_prog = await fetch(`https://v2.jokeapi.dev/joke/Programming?amount=10`);
      const data_prog = await res_prog.json();
      const jokesList_prog = data_prog.jokes; // length == 10

      const res_pun = await fetch(`https://v2.jokeapi.dev/joke/Pun?amount=10`);
      const data_pun = await res_pun.json();
      const jokesList_pun = data_pun.jokes; // length == 10

      const res_spooky = await fetch(`https://v2.jokeapi.dev/joke/Spooky?amount=10`);
      const data_spooky = await res_spooky.json();
      const jokesList_spooky = data_spooky.jokes; // length == 10

      const res_christ = await fetch(`https://v2.jokeapi.dev/joke/Christmas?amount=10`);
      const data_christ = await res_christ.json();
      const jokesList_christ = data_christ.jokes; // length == 10

      const jokesCached_prog = localStorage.getItem("Programming")
      const jokesCached_pun = localStorage.getItem("Pun")
      const jokesCached_spooky = localStorage.getItem("Spooky")
      const jokesCached_christ = localStorage.getItem("Christmas")

      // Store jokes for each category in localStorage
      if (!jokesCached_prog && !jokesCached_pun && !jokesCached_spooky && !jokesCached_christ) {
        localStorage.setItem("Programming", JSON.stringify(jokesList_prog));
        localStorage.setItem("Pun", JSON.stringify(jokesList_pun));
        localStorage.setItem("Spooky", JSON.stringify(jokesList_spooky));
        localStorage.setItem("Christmas", JSON.stringify(jokesList_christ));

        let allJokesList: Joke[] = [].concat(
          jokesList_prog,
          jokesList_pun,
          jokesList_spooky,
          jokesList_christ
        );
        allJokesList = allJokesList.filter(joke => joke !== undefined);
        allJokesList.sort(() => Math.random() - 0.5);
  
        localStorage.setItem("randomJokes", JSON.stringify(allJokesList))
      }

      return jokesList_prog
    }
  });

  if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
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
