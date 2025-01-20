import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";

import { catApiSlice } from "../features/catApiSlice"; // Update import path if necessary
import Cats from "../component/Cats";

describe("Cats Component", () => {
  const renderWithProvider = (component: JSX.Element) => {
    const store = configureStore({
      reducer: { [catApiSlice.reducerPath]: catApiSlice.reducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(catApiSlice.middleware),
    });

    return render(<Provider store={store}>{component}</Provider>);
  };

  it("fetches and displays breeds on button click", async () => {
    const mockBreeds = [
      { id: 1, breed: "Persian" },
      { id: 2, breed: "Siamese" },
      { id: 3, breed: "Siamese" },
      { id: 4, breed: "Siamese" },
      { id: 5, breed: "Siamese" },
    ];

    vi.spyOn(catApiSlice.endpoints.getBreeds, "select").mockReturnValueOnce(
      () => ({
        data: { data: mockBreeds },
        error: null,
        isLoading: false,
      })
    );

    const { container } = renderWithProvider(<Cats />);

    const button = screen.getByTestId("fetch-button");
    userEvent.click(button);

    await waitFor(() => {
      const items = screen.getAllByTestId("listitem");
      expect(items).toHaveLength(mockBreeds.length);
      expect(items[0]).toHaveTextContent(mockBreeds[0].breed);
      expect(items[1]).toHaveTextContent(mockBreeds[1].breed);
    });
  });

  it("shows an error message when fetching fails", async () => {
    vi.spyOn(catApiSlice.endpoints.getBreeds, "select").mockReturnValueOnce(
      () => ({
        data: null,
        error: { message: "Error fetching breeds." },
        isLoading: false,
      })
    );
    const { container } = renderWithProvider(<Cats />);
    console.log(container.innerHTML)
    // const button = screen.getByTestId("fetch-button");
    // userEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Error fetching breeds/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("displays a message when no breeds are available", async () => {
    vi.spyOn(catApiSlice.endpoints.getBreeds, "select").mockReturnValueOnce(
      () => ({
        data: { data: [] },
        error: null,
        isLoading: false,
      })
    );

    renderWithProvider(<Cats />);

    const button = screen.getByTestId("fetch-button");
    userEvent.click(button);

    await waitFor(() => {
      const noBreedsMessage = screen.getByText(/No breeds available/i);
      expect(noBreedsMessage).toBeInTheDocument();
    });
  });
});
