# Word Definition Viewer

This project is a simple web application that fetches word definitions from the [Free Dictionary API](https://dictionaryapi.dev/) based on user input. It displays the word's meaning, part of speech, example usage, and optionally, an audio pronunciation.

## Features

- **Search for Words**: Users can input a word, and the application will fetch the definition and other details.
- **Word Details**: Displays the word title, part of speech, definition, example usage, and audio pronunciation if available.
- **Dynamic Word Grid**: Each word's details are displayed in a dynamically generated grid of "cards."
- **API Integration**: Fetches data from the Free Dictionary API.

## Technologies Used

- **HTML/CSS**: For the structure and styling of the page.
- **JavaScript**: Used for interacting with the DOM, making API requests, and rendering word details dynamically.
- **API**: Fetches word data from the [Free Dictionary API](https://dictionaryapi.dev/).

## Usage

1. **Search for a Word**: Enter a word into the input field, and the application will display the word's details, including:
    - Part of Speech (e.g., noun, verb)
    - Definition of the word
    - Example usage
    - Audio pronunciation (if available)
    
2. **Display of Results**: Each result will appear in a card format with relevant details. If the word has an audio pronunciation, it will be playable directly from the card.

3. **Data Source**: All word data is fetched from the Free Dictionary API.

## Code Overview

### Key DOM Elements:

- `mainBody`: The main wrapper of the body where the word grid is inserted.
- `inputField`: The input field where the user enters the word to search.
- `wordGrid`: The container for displaying the word details in a grid format.
- `wordDetails`: An array that holds the fetched word data, including word, definitions, and audio details.

### Key Functions:

- **apiRequest(url)**: Makes a request to the Free Dictionary API and returns the response as JSON.
- **getDefinitions(wordMeanings)**: Extracts and returns an array of word definitions from the API response.
- **fetchData(url)**: Fetches the word details using the API and populates the `wordDetails` array.
- **Event Listener**: Listens for input field changes and triggers the word-fetching process.

### Event Handling:
- When the user enters a word in the input field, the `fetchData` function is called to fetch the word's data from the Free Dictionary API. The details are then rendered in the form of cards displaying the word title, part of speech, definition, example, and audio if available.

### Error Handling:
- If the data retrieval fails or the API returns an error, the system logs an error message to the console.
