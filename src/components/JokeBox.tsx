import { useState, useEffect } from 'react';
import '../assets/JokeBox.css'
import { useCategory } from './CategoryContext';

interface Joke {
    // Define the structure of your JSON object here
    type: string;
    setup: string;
    delivery: string;
    joke: string;
    // Add other properties if present in your JSON objects
}

function JokeBox() {

    
    const { selectedCategory } = useCategory();
    
    const [counter, setCounter] = useState(0)
    const [setUp, setSetUp] = useState('')
    const [delivery, setDelivery] = useState('')
    const [jokes, setJokes] = useState<Joke[]>([])

    // extracts data from localStorage and saves it to the state "jokes"
    useEffect(() => {
      
        let list: Joke[] = [];
        const categories = ['Programming', 'Pun', 'Spooky', 'Christmas'];
        for (let i = 0; i < 4; i++) {
            let jokesFromCategory: Joke[] = [];
            const jokesCached = localStorage.getItem(`${categories[i]}`);
            if (jokesCached) {
                jokesFromCategory = JSON.parse(jokesCached) as Joke[];
            }
            list = [...list, ...jokesFromCategory];
        }
        setJokes(list);
    }, [])
    
    // runs when the category is changed. Resets counter to 0 and displays first joke for that category
    useEffect(() => {
        setCounter(0)
        setDeliveryState()
    }, [selectedCategory])

    // runs when the counter is updated. Ensures that the joke to be displayed is rendered instantly to website
    useEffect(() => {
        setDeliveryState()
    }, [counter])

    function setDeliveryState() {
        if (jokes.length != 0) {
            const index = setJokeIndexState();
            setSetUp(jokes[index].setup)
            if (jokes[index].type == 'single') {
                setDelivery(jokes[index].joke)
            } else {
                setDelivery(jokes[index].delivery)
            }
        }
    }

    // increases counter by 1, which will display the next joke
    function handleRightClick() {
        if (counter === 9) {
            return
        }
        setCounter(prevCounter => prevCounter + 1)
    }
    
    // decreases counter by 1, which will display the previous joke
    function handleLeftClick() {
        if (counter === 0) {
            return
        }
        setCounter(prevCounter => prevCounter - 1)
    }

    
    // returns the start index(dependent on category)  + current counter-value. 
    function setJokeIndexState() {
        let index = 0;
        if (selectedCategory == 'Programming') {
            index = 0 + counter;
        } else if (selectedCategory == 'Pun') {
            index = 10 + counter;
        } else if (selectedCategory == 'Spooky') {
            index = 20 + counter;
        } else if (selectedCategory == 'Christmas') {
            index = 30 + counter;
        } else {
            index = Math.floor(Math.random() * (40));
        }
        return index
    }


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