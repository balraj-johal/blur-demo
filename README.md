# BLUR Demo

This demo explores a mouse over effect that unblurs HTML elements that are near to it.

See it live [here](blur-demo.vercel.app).

## Quick Breakdown

- Get the mouse position in px using the mousemove window event, and store it in a React ref
  - NOTE: using ref vs state here to ensure the DOM doesn't rerender on each position update
- setup a request animation frame
- on each frame, loop through every HTML text element, and calculate it's bounding rect
- get the distance from the mouse position and the element position, and clamp the value
- set each elements css `filter` property proportionately to the distance, so smaller distances have smaller blur applied