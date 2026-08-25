# JS Quiz Engine

A quiz application built with **pure vanilla JavaScript** — no frameworks, no libraries. Built as a learning project to master the fundamentals of vanilla JavaScript and the modern frontend workflow.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start dev server with hot reload   |
| `npm run build`     | Production build to `dist/`        |
| `npm run preview`   | Preview the production build       |

## Project Structure

```
JS-Quiz-Engine/
├── index.html        # Entry point / quiz UI markup
├── css/
│   └── style.css     # Styling
└── js/
    ├── questions.js  # Question data
    └── app.js        # Quiz logic
```

## Vanilla JavaScript Concepts

The concepts practiced while building this project:

- **DOM Manipulation** — Selecting elements (`querySelector`, `getElementById`) and dynamically creating, updating, and removing elements to render the quiz UI.
- **Events** — Responding to user actions with `addEventListener`, handling clicks on answers/buttons, and using event delegation for dynamically created elements.
- **ES6 Modules** — Splitting code across files with `import`/`export`: question data lives in `questions.js`, logic in `app.js`.
- **Arrays & Array Methods** — Storing the question list and working with it using `map`, `filter`, `find`, and index-based access.
- **Objects** — Structuring each question as an object (question text, options array, correct answer) and reading its properties.
- **Template Literals** — Building HTML strings with `` `${}` `` interpolation to render questions and options dynamically.
- **State Management** — Tracking the current question index, selected answer, and score with plain variables (no external state library).
- **Conditionals & Loops** — Checking whether a selected answer is correct and iterating through questions as the quiz progresses.
- **Functions & Scope** — Organizing logic into small reusable functions (render, check answer, next question).
- **localStorage** *(optional stretch)* — Persisting high scores between browser sessions.

## Notes

- Vite is used only as a dev server/build tool — all application code is plain JavaScript with native ES modules.
