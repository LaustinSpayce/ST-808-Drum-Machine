# README

The ST-808 is an online Drum Machine for making beats or baking meats when you don't have hardware or software synths to hand.

![ST-808 screenshot](/planning/ST-808inAction.png)

## Installation

Install rails
Configure the database with:
```
bundle install
yarn install
rails db:create
rails db:migrate
```
Should do the trick.
Saving/Loading isn't working at the moment, so this is pretty much a purely react app.

## Justification
I wanted to play with Tone.js and create something fun, inspired by the classic Roland TR-808 and other online projects such as the IO808.

## Technologies
Rails, React, Robots