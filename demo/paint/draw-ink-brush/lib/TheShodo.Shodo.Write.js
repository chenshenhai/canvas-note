/// <reference path="TheShodo.Shodo.Core.js" />
/// <reference path="TheShodo.Shodo.Resources.js" /> 

TheShodo.Shodo.Write = {};


const handCanvas = document.querySelector('#hand-canvas');

TheShodo.Shodo.StrokeEngine = new TheShodo.Shodo.StrokeEngine(handCanvas.width, handCanvas.height, handCanvas, handCanvas);
TheShodo.Shodo.StrokeManager = new TheShodo.Shodo.StrokeManager(handCanvas, TheShodo.Shodo.StrokeEngine);
TheShodo.Shodo.StrokeManager.start();

