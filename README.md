# green-mic-translator

User Interface:

Design a user interface with a green microphone button.
Allow users to set the OPENAI_BASE_URL and OPENAI_API_KEY.
Display a drop-down menu with commonly used languages.
Display the translated text as subtitles on the screen.
Voice Recognition:

Implement a function to capture and transcribe spoken messages.
Define a threshold (e.g., 2 seconds of no sound) to determine the end of the voice clip.
Trigger the voice recognition process when the user clicks on the microphone button.
Display the transcribed text on the screen.
Translation:

Use the OpenAI API function to translate the transcribed text into the selected language.
Pass the transcribed text to the API along with the OPENAI_BASE_URL and OPENAI_API_KEY.
Receive the translated text from the API.
Display:

Update the subtitles on the screen with the translated text.
Continuously display the translated text until a new voice clip is initiated.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/green-mic-translator.git
cd green-mic-translator
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
