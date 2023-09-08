import { useState,useEffect } from "react";
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
      <Joke/>
    </QueryClientProvider>
  )
}

function Joke() {

  const [setUp, setSetUp] = useState("hei")
  const [delivery, setDelivery] = useState("hei2")
  const [isLoading2, setIsLoading] = useState(false)
  const [isError2, setIsError] = useState(false)
  const [flip, setFlip] = useState(false)

  function handleClick()  {
    setFlip(!flip)
  }

  if (!flip) {
    const { isLoading, isError, data } = useQuery({
      queryKey: ["jokes1"],
      queryFn: () =>
        fetch("https://v2.jokeapi.dev/joke/Any").then((res) => res.json()),
    })
    useEffect(() => {
      if (data) {
        setSetUp(data.setup);
        setDelivery(data.delivery);
      }
      setIsLoading(isLoading);
      setIsError(isError);
    }, [data, isLoading, isError]);
  } else if (flip) {
    const { isLoading, isError, data } = useQuery({
      queryKey: ["jokes2"],
      queryFn: () =>
        fetch("https://v2.jokeapi.dev/joke/Any").then((res) => res.json()),
    })
    useEffect(() => {
      if (data) {
        setSetUp(data.setup);
        setDelivery(data.delivery);
      }
      setIsLoading(isLoading);
      setIsError(isError);
    }, [data, isLoading, isError]);
  }

  if (isLoading2) return "Loading..."

  if (isError2) return "Something went wrong"

  return (
    <div>
      <p>{setUp}</p>
      <p>{delivery}</p>
      <button onClick={handleClick}>Get new joke</button>
    </div>
  )
}

export default JokeBox