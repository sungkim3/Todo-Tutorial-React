## Tutorial Implementation: Experience and Impressions
Implementation of React using the [Facebook Tutorial](https://reactjs.org/tutorial/tutorial.html#lifting-state-up) and repository as guides.

Implemented the additional suggested challenges. These include displaying coordinates of latest move, highlighting selected move on game board, sorting move list in descending or ascending order, rewriting board minimizing hardcoded html, highlighting the winning squares, and indicating a draw.

This was a fun and effective program to learn React off of. I felt like it was really important to do the challenge suggestions because they hammer down how states change and how you have to account for that effectively and efficiently. Learning how to connect events to component states was a very rewarding process through this demo. Wrapping my mind around the concept of undo/history and immutable objects was also equally intriguing.

# Challenges:
The most challenging aspect to the tutorial was understanding changing state when little pieces of the game were being interacted with. This was most exemplified by the highlighting challenges. 

What got me through was ensuring that the Game component was in charge of all the Square component's properties. After establishing this rule, I worked on passing down that state as properties to the Square component. Eventually it was about making sure all areas that change the state of the game were 
1) concerned with only what they should be...e.g. highlighting should only worry about the className state and 
2) that those changed states were placed within the correct index of the history array (due to the sorting feature)

# Areas to improve:
Sorting implementation I feel could be optimized better. Rather than sorting the game's state of history (causing me to worry about indices in areas I did not anticipate), it may have been easier to work with a copy of the game's history within the Game's render function and map that into the list elements instead with modified values depending on the sorting direction.

I feel I could also refactor Board better by turning it into a stateless Component and moving the render rows logic into Game instead. Then simply pass props into Board and return {props.rows}.

Probably didn't need stepNumber property in two places for the Game's state.

Clean up render() in Game.

# Next Steps:
https://reactjs.org/docs/optimizing-performance.html#examples
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
adding style framework like bootstrap or material ui


-------------------------------------
## React Boiler Plate Available Below

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
