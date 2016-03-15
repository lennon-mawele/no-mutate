

'use strict';

import test from 'tape';
import index from '../lib';


// Flow types
type OBJECT = { [key: string]: any };

const {
  Booleans,
  List,
  Numbers,
  Strings
} = index;


test('Immutable List', (nested: OBJECT) => {

  nested.test('List :: List() || :: List([e0, e1]) -> List', (assert: OBJECT) => {
    const epmtylist = List();
    const list = List([1, 2, 3, 4, 5, 6]);


    const createEmptyList = epmtylist.data;
    const cexpectCreateEmptyList = [];
    assert.deepEqual(createEmptyList, cexpectCreateEmptyList,
      'Creates an new empty List');

    const createListWithData = list.data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data.');

    assert.end();
  });

  nested.test('data :: List().data -> any', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const createListWithData = list.data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data.');

    assert.end();
  });


  nested.test('size :: List().size -> number', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const newListSize = list.size;
    const expectNewListSize = 6;
    assert.deepEqual(newListSize, expectNewListSize,
      'List has the correct size.');

    assert.end();
  });


  nested.test('add :: List([e0]).add(e1) -> List', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const addToEnd = list.add('otis').data;
    const expectAddToEnd = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(addToEnd, expectAddToEnd,
    'Adds an item to the end of a List and returns a new List.');


    const addMultipleItemsToEnd = list.add(['otis', 'ania']).data;
    const expectAddMultipleItemsToEnd = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(addMultipleItemsToEnd, expectAddMultipleItemsToEnd,
    'Addsmultiple items to the end of a List and returns a new List.');

    assert.end();
  });


  nested.test('entries :: List([e0, e1]).entries().next() -> object*', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const entriesList = list.entries().next();
    const expectEntriesList = { done: false, value: [ 0, 1 ] };
    assert.deepEqual(entriesList, expectEntriesList,
      'Returns Array Iterator with key/value pairs.');

    assert.end();
  });


  nested.test('every ::  List([e0, e1, e2]).every(function (e) {}) -> bool', (assert: OBJECT) => {
    const everyList = List([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectEveryList = true;
    assert.deepEqual(everyList, expectEveryList,
      'Every item passed the test. Returns true or false.');

    assert.end();
  });


  nested.test('fill :: List().every(function (e) {}) -> List', (assert: OBJECT) => {
    const fillList = List([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectFillList = true;
    assert.deepEqual(fillList, expectFillList,
      `Fills all the elements of a List with a value from a start index to an end index.
      Returns a new List.`);

    assert.end();
  });


  nested.test('filter :: List(e0, e1, e2).filter(function (e) {}) -> List', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const filterList = list.filter((i: any): bool => i >= 4).data;
    const expectFilterList = [4, 5, 6];
    assert.deepEqual(filterList, expectFilterList,
      'Filters items in a List and returns a new List.');

    assert.end();
  });


  nested.test('find :: List([e0, e1, e2]).find(function (e) {}) -> number', (assert: OBJECT) => {
    const findList = List([1, 120, 2, 12]).find((i: any): bool => i > 5).data;
    const expectFindList = 120;
    assert.deepEqual(findList, expectFindList,
      'Finds items in a List returns a new List. Otherwise undefined is returned.');

    assert.end();
  });


  nested.test('findIndex :: List([e0, e1, e2]).findIndex(function (e) {}) -> number', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const findIndexList = list.findIndex((i: any): bool => i === 5).data;
    const expectFindIndexList = 4;
    assert.deepEqual(findIndexList, expectFindIndexList,
      'Finds the index of a List item and return index or -1 if it is not present.');

    assert.end();
  });


  nested.test('forEach :: List([e0, e1, e2]).forEach(function (e) {}) -> List', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const forEachList = list.forEach((i: any): bool => i * 2);
    const expectForEachList = undefined;
    assert.deepEqual(forEachList, expectForEachList,
      'Executes a provided function once per array element. Returns undefined.');

    assert.end();
  });


  nested.test('includes :: List([e0, e1, e2]).includes(e) -> bool', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const includesList = list.includes(5);
    const expectIncludesList = true;
    assert.deepEqual(includesList, expectIncludesList,
      'Checks the List includes an item and returns true or false.');

    assert.end();
  });


  nested.test('indexOf :: List([e0, e1, e2]).indexOf(e) -> number', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const indexOfList = list.indexOf(5);
    const expectIndexOfList = 4;
    assert.deepEqual(indexOfList, expectIndexOfList,
    'Return first index ot element, or -1 if it is not present.');

    assert.end();
  });


  nested.test('insert :: List([e0, e1, e2]).insert([e4, e5, e6]) -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const insertMultipleItems = list.insert(['A', 'B', 'C'], 3).data;
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert items into a List and returns a new List.');

    assert.end();
  });


  nested.test('concat :: List([e0, e1, e2]).concat([ [e4, e5], [e6, e7]]) -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const concatList = list.concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectConcatList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(concatList, expectConcatList,
      'Megres Lists together and returns a new List.');

    assert.end();
  });


  nested.test('pop :: List([e0, e1, e2]).pop() -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const popItem = list.pop().data;
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of a List and returns a new List.');

    assert.end();
  });


  nested.test('push :: List([e0]).push(e1) | List([e0]).push([e1, e2])  -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const pushItem = list.push('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of a List and returns a new List.');

    const pushMultipleItems = list.push(['otis', 'ania']).data;
    const expectMultiplePushItems = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(pushMultipleItems, expectMultiplePushItems,
      'Push an item to the end of a List and returns a new List.');

    assert.end();
  });


  nested.test('remove :: List([e0, e1, e2]).remove(n) -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const removeItem = list.remove(1).data;
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the List using it\'s index and returns a new List.');

    assert.end();

  });


  nested.test('shift :: List([e0, e1, e2]).shift() -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const shiftItem = list.shift().data;
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of a List and returns a new List.');

    assert.end();
  });


  nested.test('unshift :: List([e0, e1, e2]).unshift([e4, e5, e6]) -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const unshiftMultipleItems = list.unshift(['A', 'B', 'C']).data;
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the list and returns a new list.');

    assert.end();
  });


  nested.test('update :: List([e0, e1, e2]).update("e4", index]) -> LIST', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const upadteItem = list.update('A', 3).data;
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in a list and returns a new list.');

    assert.end();
  });


  nested.test('List boolean :: List([e0], { type: "boolean" }) -> List', (assert: OBJECT) => {
    const bool = List([true], { type: 'boolean' });

    const testThrow = (): OBJECT | string => {
      try {
        return List([1, false], { type: 'boolean' });
      } catch (err) {
        return err.toString();
      }
    };

    const notBoolean = testThrow();
    const expectNotBoolean = 'Error: Type Error: 1 is not of type boolean';
    assert.deepEqual(notBoolean, expectNotBoolean,
      'Boolean List can only contain booleans.)');

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Boolean List');


    assert.end();
  });


  nested.test('List number :: List([e0], { type: "number" }) -> List', (assert: OBJECT) => {
    const num = List([1], { type: 'number' });

    const testThrow = (): OBJECT | string => {
      try {
        return List([1, 'otis'], { type: 'number' });

      } catch (err) {
        return err.toString();
      }
    };

    const notNumber = testThrow();
    const expectNotNumber = 'Error: Type Error: otis is not of type number';
    assert.deepEqual(notNumber, expectNotNumber,
      'Number List can only contain numbers.');


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a new Number List.');


    assert.end();
  });


  nested.test('List stings :: List([e0], { type: "string" }) -> List', (assert: OBJECT) => {
    const str = List(['a'], { type: 'string' });

    const testThrow = (): OBJECT | string => {
      try {
        return List([1, 'otis'], { type: 'string' });

      } catch (err) {
        return err.toString();
      }
    };

    const notString = testThrow();
    const expectNotString = 'Error: Type Error: 1 is not of type string';
    assert.deepEqual(notString, expectNotString,
      'String List can only contain strings.');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List');

    assert.end();
  });


  nested.test('increment :: List([e0], { type: "number" }).increment(n) -> List', (assert: OBJECT) => {
    const num = List([1], { type: 'number' });

    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      'Increment Number List by 1.');

    assert.end();
  });


  nested.test('decrease :: List([e0], { type: "number" }).decrease(n) -> List', (assert: OBJECT) => {
    const num = List([1], { type: 'number' });

    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      'Increment Number List by n.');


    const decreaseNumberBy1 = num.decrease(1).data;
    const expectdecreaseNumberBy1 = [1, 0];
    assert.deepEqual(decreaseNumberBy1, expectdecreaseNumberBy1,
      'Decease Number List by 1.');


    const decreaseNumberBy5 = num.decrease(5).data;
    const expectDecreaseNumberBy5 = [1, -4];
    assert.deepEqual(decreaseNumberBy5, expectDecreaseNumberBy5,
      'Decease Number List by n.');


    assert.end();
  });


  nested.test('Booleans :: Booleans() ->', (assert: OBJECT) => {
    const bool = Booleans([true]);

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Boolean List.');

    assert.end();
  });


  nested.test('Numbers :: Numbers() ->', (assert: OBJECT) => {
    const num = Numbers([1]);

    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a Number List.');

    assert.end();
  });


  nested.test('Strings :: Strings()', (assert: OBJECT) => {
    const str = Strings(['a']);

    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List');

    assert.end();
  });
});
