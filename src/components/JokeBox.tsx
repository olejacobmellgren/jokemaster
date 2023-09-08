import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

// Create a client
const queryClient = new QueryClient()

function JokeBox() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Joke />
    </QueryClientProvider>
  )
}

function Joke() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://v2.jokeapi.dev/joke/Any").then((res) => res.json()),
  })

  if (isLoading) return "Loading..."

  if (isError) return "An error has occurred: " + { error }

  return (
    <div>
      <p>{data.setup}</p>
      <p>{data.delivery}</p>
    </div>
  )
}

export default JokeBox