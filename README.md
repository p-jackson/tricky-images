# Uploading Images in Redux

This repo contains examples of how to upload images in redux. With each example
the level of complexity goes up. The purpose is to compare different ways of
handling asynchronicity in a Redux app.

The two ways of handling asynchronicity being compared are:

* [**redux-thunk**](https://github.com/gaearon/redux-thunk) which is lightweight
  (the library is < 10 lines) and uses simple functions as the unit of
  abstraction.
* [**redux-saga**](http://yelouafi.github.io/redux-saga/) which uses new
  language features and has more to learn up front, but seems to handle complex
  examples more gracefuly.

### Example 1

Drag an image to start uploading. The being uploaded will immediately show and
a spinner will tell you when the upload is complete.

### Example 2

Fixes a bug in *Example 1* that happens when you replace the image with
another one while it's stil being uploaded.

### Example 3

Uploading the image and displaying a preview are actually both async
operations. Run both in parallel so that large pictures that take a while to
preview aren't holding up the upload.  

## Ideas

* Add unit tests to see how they compare wrt testability
* Replace spinner with progress bar for extra complexity
