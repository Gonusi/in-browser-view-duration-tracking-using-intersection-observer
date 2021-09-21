# In browser view duration tracking of fake social feed items using the intersection observer API

A React experiment, where we:
- create a pseudo randomized list of images from Unsplash;
- track view duration of each image using intersection observer;
- display the top 20 images in a real time updated list - it changes as you
  scroll;
- test this stuff using Cypress (as an end-to-end test), and Cypress component
  testing mode (as a unit test).

Please do try the app at my blog link below, or at this codesandbox url:
[https://codesandbox.io/s/in-browser-feed-item-view-duration-tracking-using-intersection-observer-zxgi7]

It's kind of fun. Also, this was interesting to test. I could not approach this
using TDD easily, because regular tools don't support real layout, so you can't
test intersection observer. 

Cypress to the resque - it allows you to run tests in a real browser, actually
visually seeing the results. What a nice framework. 

This is one of my weekly experiments, I encourage you to read more about it at here:
[https://kasparasanusauskas.com/posts/fake-social-feed-item-view-duration-tracking-using-intersection-observer]

Please note I allow 7 hours a week for these experiments. Don't expect
perfection. 