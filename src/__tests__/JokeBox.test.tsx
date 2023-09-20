import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

const server = setupServer(
  // Describe the joke to mock.
  rest.get(
    `https://v2.jokeapi.dev/joke/Programming?amount=10`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          jokes: [
            {
              category: "Programming",
              type: "twopart",
              setup: "why do python programmers wear glasses?",
              delivery: "Because they can't C.",
              id: 294,
            },
            {
              category: "Programming",
              type: "single",
              joke: "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
              id: 55,
            },
            {
              category: "Programming",
              type: "single",
              joke: "I have a joke about Stack Overflow, but you would say it's a duplicate.",
              id: 75,
            },
            {
              category: "Programming",
              type: "twopart",
              setup: "What are bits?",
              delivery:
                "Tiny things left when you drop your computer down the stairs.",
              id: 34,
            },
            {
              category: "Programming",
              type: "twopart",
              setup:
                "Why did the Python data scientist get arrested at customs?",
              delivery: "She was caught trying to import pandas!",
              id: 88,
            },
            {
              category: "Programming",
              type: "twopart",
              setup:
                "Why did the web developer walk out of a resturant in disgust?",
              delivery: "The seating was laid out in tables.",
              id: 263,
            },
            {
              category: "Programming",
              type: "single",
              joke: "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
              id: 58,
            },
            {
              category: "Programming",
              type: "twopart",
              setup: "What is the best prefix for global variables?",
              delivery: "//",
              id: 98,
            },
            {
              category: "Programming",
              type: "twopart",
              setup: "Why do Java programmers hate communism?",
              delivery: "They don't want to live in a classless society.",
              id: 12,
            },
            {
              category: "Programming",
              type: "single",
              joke: "The generation of random numbers is too important to be left to chance",
              id: 76,
            },
          ],
        }),
      );
    },
  ),

  rest.get(`https://v2.jokeapi.dev/joke/Pun?amount=10`, (req, res, ctx) => {
    return res(
      ctx.json({
        jokes: [
          {
            category: "Pun",
            type: "twopart",
            setup: "I just got fired from my job at the keyboard factory.",
            delivery: "They told me I wasn't putting in enough shifts.",
            id: 87,
          },
          {
            category: "Pun",
            type: "twopart",
            setup:
              "Has COVID-19 forced you to wear glasses and a mask at the same time?",
            delivery: "If so, you may be entitled to condensation.",
            id: 167,
          },
          {
            category: "Pun",
            type: "single",
            joke: "I'm reading a book about anti-gravity. It's impossible to put down!",
            id: 32,
          },
          {
            category: "Pun",
            type: "twopart",
            setup: "The past, the present and the future walk into a bar.",
            delivery: "It was tense.",
            id: 41,
          },
          {
            category: "Pun",
            type: "twopart",
            setup: "What does a perverted frog say?",
            delivery: "Rubbit.",
            id: 127,
          },
          {
            category: "Pun",
            type: "twopart",
            setup:
              "What do you call a cop's penis after he's done masturbating?",
            delivery: "Pulled pork.",
            id: 65,
          },
          {
            category: "Pun",
            type: "twopart",
            setup: "You see, mountains aren't just funny.",
            delivery: "They are hill areas.",
            id: 182,
          },
          {
            category: "Pun",
            type: "twopart",
            setup: "What do you call a cheap circumcision?",
            delivery: "A rip off.",
            id: 132,
          },
          {
            category: "Pun",
            type: "twopart",
            setup:
              "A grocery store cashier asked if I would like my milk in a bag.",
            delivery: 'I told her "No, thanks. The carton works fine".',
            id: 69,
          },
          {
            category: "Pun",
            type: "twopart",
            setup:
              'My employer came running to me and said, "I was looking for you all day! Where the hell have you been?"',
            delivery: 'I replied, "Good employees are hard to find."',
            id: 43,
          },
        ],
      }),
    );
  }),
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done
  server.close();
});

test("Test render jokes", async () => {
  const { getByText, getByRole, asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const dropDown = getByRole("button", { name: "Category" });
  await userEvent.click(dropDown);
  const programming = getByText("Programming");
  await userEvent.click(programming);
  expect(programming).toBeTruthy(); // The text is found

  expect(asFragment()).toMatchSnapshot();

  const joke_setup = getByText("why do python programmers wear glasses?");
  const joke_delivery = getByText("Because they can't C.");
  expect(joke_setup.textContent).toBe(
    "why do python programmers wear glasses?",
  );
  expect(joke_delivery.textContent).toBe("Because they can't C.");
});

test("Test right and left click", async () => {
  const { getByText, getByRole, asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  let joke_number = getByText("1 / 10");
  expect(joke_number.textContent).toBe("1 / 10");
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(getByRole("button", { name: "Next" }));
  expect(asFragment()).toMatchSnapshot();
  const joke = getByText(
    "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
  );
  expect(joke.textContent).toBe(
    "Your momma is so fat, you need to switch to NTFS to store a picture of her.",
  );

  joke_number = getByText("2 / 10");
  expect(joke_number.textContent).not.toBe("1 / 10");
  expect(joke_number.textContent).toBe("2 / 10");

  await userEvent.click(getByRole("button", { name: "Previous" }));
  expect(asFragment()).toMatchSnapshot();
  joke_number = getByText("1 / 10");
  expect(joke_number.textContent).not.toBe("2 / 10");
  expect(joke_number.textContent).toBe("1 / 10");

  const joke_setup = getByText("why do python programmers wear glasses?");
  const joke_delivery = getByText("Because they can't C.");
  expect(joke_setup.textContent).toBe(
    "why do python programmers wear glasses?",
  );
  expect(joke_delivery.textContent).toBe("Because they can't C.");
});

test("Joke renders when changing category", async () => {
  const { getByText, getByRole, asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const dropDown = getByRole("button", { name: "Programming" });
  await userEvent.click(dropDown);
  const pun = getByText("Pun");
  await userEvent.click(pun);
  expect(pun).toBeTruthy(); // The text is found
  expect(asFragment()).toMatchSnapshot();

  let joke_number = getByText("1 / 10");
  expect(joke_number.textContent).toBe("1 / 10");

  await userEvent.click(getByRole("button", { name: "Next" }));
  expect(asFragment()).toMatchSnapshot();
  let joke_setup = getByText(
    "Has COVID-19 forced you to wear glasses and a mask at the same time?",
  );
  let joke_delivery = getByText("If so, you may be entitled to condensation.");
  expect(joke_setup.textContent).toBe(
    "Has COVID-19 forced you to wear glasses and a mask at the same time?",
  );
  expect(joke_delivery.textContent).toBe(
    "If so, you may be entitled to condensation.",
  );

  joke_number = getByText("2 / 10");
  expect(joke_number.textContent).not.toBe("1 / 10");
  expect(joke_number.textContent).toBe("2 / 10");

  await userEvent.click(getByRole("button", { name: "Previous" }));
  expect(asFragment()).toMatchSnapshot();
  joke_number = getByText("1 / 10");
  expect(joke_number.textContent).not.toBe("2 / 10");
  expect(joke_number.textContent).toBe("1 / 10");
  joke_setup = getByText(
    "I just got fired from my job at the keyboard factory.",
  );
  joke_delivery = getByText("They told me I wasn't putting in enough shifts.");
  expect(joke_setup.textContent).toBe(
    "I just got fired from my job at the keyboard factory.",
  );
  expect(joke_delivery.textContent).toBe(
    "They told me I wasn't putting in enough shifts.",
  );
});

test("Test if favorite works", async () => {
  const { getByText, getByRole, asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const image = getByRole("img");
  await userEvent.click(image); // favorite the joke. Image refers to the heart
  expect(asFragment()).toMatchSnapshot();

  const dropDown = getByRole("button", { name: "Pun" });
  await userEvent.click(dropDown);
  const favorites = getByText("Favorites");
  await userEvent.click(favorites);
  expect(favorites).toBeTruthy(); // The text is found
  expect(asFragment()).toMatchSnapshot();

  const favorite_joke_number = getByText("1 / 1");
  expect(favorite_joke_number.textContent).toBe("1 / 1");

  const joke_setup = getByText(
    "I just got fired from my job at the keyboard factory.",
  );
  const joke_delivery = getByText(
    "They told me I wasn't putting in enough shifts.",
  );
  expect(joke_setup.textContent).toBe(
    "I just got fired from my job at the keyboard factory.",
  );
  expect(joke_delivery.textContent).toBe(
    "They told me I wasn't putting in enough shifts.",
  );
});

test("Test if you can unfavorite joke inside Favorites-category", async () => {
  const { getByText, getByRole, asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const image = getByRole("img");
  await userEvent.click(image); // unfavorite the joke. Image refers to the heart
  expect(asFragment()).toMatchSnapshot();

  const errorMessage = getByText("You have no favorites");
  expect(errorMessage.textContent).toBe("You have no favorites");
});
