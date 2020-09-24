global.customElements = {whenDefined: () => ({then(){}})};

const {asCJS} = require('../cjs');

console.log(asCJS(`

import 'side-effect';

import {asd} from 'lol';
import def from 'def';
import {test as name, lol as lal} from "lulz";

const a = 1;
const b = 1;
const c = 1;

export {a, b, c};

export function test() {

}

export let arrow = () => {};

export const key = 'key';
export default 123;

`));


asCJS(`

const a = 1;
const b = 1;
const c = 1;

export {a, b, c};

export function test() {

}

export let arrow = () => {};

export const key = 'key';
export default 123;

`, true).then(console.log)

