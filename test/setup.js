const jsdom = require('jsdom')
const sinon = require('sinon')
const chai = require('chai')

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.parentWindow
global.sinon = sinon
global.assert = chai.assert
