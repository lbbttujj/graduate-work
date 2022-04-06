const guitarA2 = require("../data/guitar1_notes/A2g1.mp3");
const guitarD3 = require("../data/guitar1_notes/D3g1.mp3");
const guitarG3 = require("../data/guitar1_notes/G3g1.mp3");
const basssE1 = require('../data/bass1_notes/E1b1.mp3') 
const basssA1 = require('../data/bass1_notes/A1b1.mp3') 
const basssD2 = require('../data/bass1_notes/D2b1.mp3') 
const basssG2 = require('../data/bass1_notes/G2b1.mp3') 
const PianoA4 = require('../data/piano1_notes/A4p1.mp3') 
const PianoC4 = require('../data/piano1_notes/C4p1.mp3') 
const PianoDs4 = require('../data/piano1_notes/Ds4p1.mp3') 
const PianoFs4 = require('../data/piano1_notes/Fs4p1.mp3') 
export const Guitar ={
    'A2':guitarA2,
    'D3':guitarD3,
    'G3':guitarG3,
  }
export const Bass ={
    'E1':basssE1,
    'A1':basssA1,
    'D2':basssD2,
    'G2':basssG2
  }
export const Piano ={
    'A4':PianoA4,
    'D4':PianoC4,
    'D#4':PianoDs4,
    'F#4':PianoFs4
  }