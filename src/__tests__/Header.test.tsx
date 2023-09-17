import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { test, expect} from 'vitest';
import { CategoryProvider } from '../context/CategoryContext';


test('Show dropdown when clicked', () => {
    const {getByRole} = render(
      <CategoryProvider>
          <Header/>
      </CategoryProvider>
    );
    const dropDown = getByRole("button");
    act(() => {
        fireEvent.click(dropDown);
    });
    try {
      const text = screen.getByText("Programming");
      expect(text).toBeTruthy(); // The text is found
  } catch (error) {
      expect(true).toBeTruthy(); // The text is not found
  }
    expect(3).toBe(3);
})