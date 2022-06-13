# Technical test instructions
Your task is to advance this todo app and we will evaluate you on the quality of:
- Your code (Is it working, well structured and readable?)
- Your visual design
- Your user interaction choices (UX)
You do not have to follow the order of the tasks.

Expected result:
- A light ZIP file at the root of which we can run:
- `yarn install && yarn start` to start the app.
- `git log` to see your commit history.

Commit often, but never commit compilation errors on the main branch.
You may use additional external libraries, but justify these choices in the readme.
You should not spend time updating outdated dependencies.
You can always reach out to the Journee team at tech@journee.live if you have any questions :)

1. The current item creation behavior is buggy. When the user starts editing a new item, make sure the focus is on the element they want to edit, without any other perceptible change to the current UI/UX behavior.
2. Make the app look clean and consistent across OSes.
   - Without using any library containing significant CSS. <br/>
     For example OK: `@material-ui/icons` or `styled-components` <br/>
     For example not OK: `react-bootstrap`
   - Without using drop shadows.
3. Any added item that has an empty text should be automatically cleared, unless it is in focus.

Happy coding! 
