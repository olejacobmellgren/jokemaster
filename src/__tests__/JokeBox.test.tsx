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

const server = setupServer(// Describe the joke to mock.
    rest.get('joke/Programming?amount=2', (req, res, ctx) => {
        return res(
            ctx.json({
                "jokes": [
                    {
                        "category": "Programming",
                        "type": "twopart",
                        "setup": "How do you generate a random string?",
                        "delivery": "Put a Windows user in front of Vim and tell them to exit.",
                    },
                    {
                        "category": "Programming",
                        "type": "single",
                        "joke": "Knock knock.\nWho's there?\nRecursion.\nRecursion who?\nKnock knock.",
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


test('Test render jokes', () => {
    const {getByRole} = render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const dropDown = getByRole("button", {name: "Category"});
    fireEvent.click(dropDown);
    const programming = screen.getByText("Programming");
    expect(programming).toBeTruthy(); // The text is found
    fireEvent.click(programming);
    const joke = screen.getByText("How do you generate a random string?");
})