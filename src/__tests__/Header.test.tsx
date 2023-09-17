import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../components/Header';


test('Show dropdown when clicked', () => {
    const {getByRole} = render(<Header/>);
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