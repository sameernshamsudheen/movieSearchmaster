import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';



afterEach(cleanup);

describe('Test cases for movies App', () => {

  it('should render the App and match the snapshot', () => {
    const component = renderer.create(
      <App />
    );
    let app = component.toJSON();
    const { getByText } = render(<App />);
    expect(screen.getByText("Movie Search")).toBeInTheDocument();
    expect(app).toMatchSnapshot();
  })


  it('should render input field', () => {
    const { component } = render(<App />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "action" } });
    expect(input.value).toBe("action");
  });

  it("shows no match found message when no genre is found", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "not-existing-genre" } });
    expect(screen.getByText("No Match Found")).toBeInTheDocument();
  });

  it("shows the correct movie with the selected genre", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "action" } });
    const movieList = screen.getByTestId("movie-list");
    expect(movieList).toHaveTextContent("1Inception8.8⭐");  });

  it("shows the top 3 movies with the selected genre", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "drama" } });
    const movieList = screen.getByTestId("movie-list");
    expect(movieList).toHaveTextContent("1Remember the Titans7.6⭐2Godfather9.2⭐3Citizen Kane8.5⭐");
  });

  it("shows the selected genre name", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "action" } });
    expect(screen.getByText("Genre : Action")).toBeInTheDocument();
  });

})


