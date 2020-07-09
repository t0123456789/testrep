// Using js es6 example code, this file is loaded via es5script.js only if the features it uses are supported...
"use strict";

class Car { 
   constructor(speed) {
       this.speed = speed;
   }
}

var foo = Symbol('foo'); 
var bar = new Car(320);  
var baz = (name) => { alert('Hello ' + name + '!'); }; 