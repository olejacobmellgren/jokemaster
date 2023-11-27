import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { vi, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";

test("Show dropdown when clicked", async () => {
  const { getByText, asFragment } = render(<Header onSelect={vi.fn()} />);

  const dropDown = getByText("Category");
  await userEvent.click(dropDown);
  expect(asFragment()).toMatchSnapshot();

  const programming = getByText("Programming");
  expect(programming).toBeTruthy(); // The text is found

  const pun = screen.getByText("Pun");
  expect(pun).toBeTruthy(); // The text is found

  const favorites = getByText("Favorites");
  expect(favorites).toBeTruthy(); // The text is found
});

test("Title is found", () => {
  const { getByText } = render(<Header onSelect={vi.fn()} />);

  const title = getByText("JOKEMASTER-");
  const title2 = getByText("3000");
  expect(title).toBeTruthy(); // The text is found
  expect(title2).toBeTruthy(); // The text is found
});
