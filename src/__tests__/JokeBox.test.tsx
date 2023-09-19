import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { act, fireEvent, render, screen } from '@testing-library/react';
import JokeBox from '../components/JokeBox';
import { CategoryProvider } from '../context/CategoryContext';
import { test, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const server = setupServer(// Describe the joke to mock.
    rest.get(`https://v2.jokeapi.dev/joke/Programming?amount=10`, (req, res, ctx) => {
        return res(
            ctx.json({
                "jokes": [
                    {
                        "category": "Programming",
                        "type": "twopart",
                        "setup": "why do python programmers wear glasses?",
                        "delivery": "Because they can't C.",
                        "id": 294,
                    },
                    {
                        "category": "Programming",
                        "type": "single",
                        "joke": "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
                        "id": 55,
                    }
                ]
            }),
        )
    }),
)

beforeAll(() => {// Establish requests interception layer before all tests.
    server.listen()
})

afterAll(() => {// Clean up after all tests are done
    server.close()
})


// test('Test render jokes', async () => {
//     const {getByText} = render(
//         <CategoryProvider>
//             <JokeBox/>
//         </CategoryProvider>
//     );
//     // const dropDown = getByRole("button", {name: "Category"});
//     // userEvent.click(dropDown);
//     // const programming = screen.getByText("Programming");
//     // expect(programming).toBeTruthy(); // The text is found
//     userEvent.click(getByText("Next"));
//     const joke = screen.getByText("How do you generate a random string?");
// })
test('Test render jokes', async () => {
    const {getByRole} = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    );
    const dropDown = getByRole("button", {name: "Category"});
    userEvent.click(dropDown);
    await screen.findAllByText("Programming");
    const programming = screen.getByText("Programming");
    userEvent.click(programming);
    expect(programming).toBeTruthy(); // The text is found
    userEvent.click(screen.getByText("Next"));
    await screen.findAllByText("why do python programmers wear glasses?");
    const joke = screen.getByText("why do python programmers wear glasses?");
    expect(joke).toBeTruthy(); // The text is found
})