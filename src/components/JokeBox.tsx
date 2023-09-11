import { useState, useEffect } from 'react';
import '../assets/JokeBox.css'
import { useParams } from 'react-router';

interface Joke {
    // Define the structure of your JSON object here
    type: string;
    setup: string;
    delivery: string;
    joke: string;
    // Add other properties if present in your JSON objects
  }

function JokeBox() {

    const { categoryID } = useParams();
    const categro = typeof categoryID === "string" ? categoryID : "";
    const [counter, setCounter] = useState(0);
    const [setUp, setSetUp] = useState('')
    const [category, setCategory] = useState('')
    const [delivery, setDelivery] = useState('')
    const [jokes, setJokes] = useState<Joke[]>([])
    const [jokeIndex, setJokeIndex] = useState(0)


    function handleRightClick() {
        if (counter === 9) {
            return
        }
        setCounter((counter) => counter + 1);
        setJokeIndexState()
        setSetUp(jokes[jokeIndex].setup)
        if (jokes[jokeIndex].type == 'single') {
            setDelivery(jokes[jokeIndex].joke)
        } else {
            setDelivery(jokes[jokeIndex].delivery)
        }
    }

    function handleLeftClick() {
        if (counter === 0) {
            return
        }
        setCounter((counter) => counter - 1)
        setJokeIndexState()
        setSetUp(jokes[jokeIndex].setup)
        if (jokes[jokeIndex].type == 'single') {
            setDelivery(jokes[jokeIndex].joke)
        } else {
            setDelivery(jokes[jokeIndex].delivery)
        }
    }

    function setJokeIndexState() {
        if (category == 'Programming') {
            setJokeIndex(0 + counter)
        } else if (category == 'Pun') {
            setJokeIndex(10 + counter)

        } else if (category == 'Spooky') {
            setJokeIndex(20 + counter)
            
        } else if (category == 'Christmas') {
            setJokeIndex(30 + counter)
        } else {
            setJokeIndex(Math.floor(Math.random() * (40)));
        }
    }

    useEffect(() => {
        setCounter(0)
        console.log(category)
    }, [category])

    useEffect(() => {
        const categoryStored = localStorage.getItem('Category')
        
        if (categoryStored) {
            setCategory(categoryStored); 
        }
        console.log("Counter er resettet")
        console.log(category)
        console.log(counter)
        console.log(jokeIndex)
        console.log(jokes[jokeIndex])
    }, [counter, categro])
    
    useEffect(() => {
        // hent ut data fra localstorage. Lagre det i states
        let list: Joke[] = [];
        const categories = ['Programming', 'Pun', 'Spooky', 'Christmas'];
        for (let i = 0; i < 4; i++) {
            let jokesFromCategory: Joke[] = [];
            const jokesCached = localStorage.getItem(`${categories[i]}`);
            if (jokesCached) {
                jokesFromCategory = JSON.parse(jokesCached) as Joke[];
            }
            list = [...list, ...jokesFromCategory];
            console.log(jokesFromCategory)
        }
        setJokes(list);
        // Create a function that takes the category as an argument
        
    }, [])

    return (
        <>
            {setUp !== '' ?
                <p>{setUp}</p>
                : null
            }
            <p>{delivery}</p>
            <button onClick={handleLeftClick}> Previous </button>
            <button onClick={handleRightClick}> Next </button>
        </>
    )
}

export default JokeBox