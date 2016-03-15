

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

  nested.test('Creates new List :: List() || :: List([e1, e2]) -> List', (assert: OBJECT) => {
    const epmtylist = List();
    const list = List([1, 2, 3, 4, 5, 6]);


    const createEmptyList = epmtylist.data;
    const cexpectCreateEmptyList = [];
    assert.deepEqual(createEmptyList, cexpectCreateEmptyList,
      'Creates an new empty List');

    const createListWithData = list.data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data');

    assert.end();
  });

  nested.test('List data:: List().data -> any', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const createListWithData = list.data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data');

    assert.end();
  });


  nested.test('Size of List :: List().size -> number', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const newListSize = list.size;
    const expectNewListSize = 6;
    assert.deepEqual(newListSize, expectNewListSize,
      'List has the correct size');

    assert.end();
  });


  nested.test('Add item :: List([e1]).add(e1) : List', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const addToEnd = list.add('otis').data;
    const expectAddToEnd = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(addToEnd, expectAddToEnd,
    'Adds an item to the end of a List and returns a new List');


    const addMultipleItemsToEnd = list.add(['otis', 'ania']).data;
    const expectAddMultipleItemsToEnd = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(addMultipleItemsToEnd, expectAddMultipleItemsToEnd,
    'Addsmultiple items to the end of a List and returns a new List');

    assert.end();
  });

  nested.test('List methods:', (assert: OBJECT) => {
    const list = List([1, 2, 3, 4, 5, 6]);

    const entriesList = list.entries().next().value;
    const expectEntriesList = [0, 1];
    assert.deepEqual(entriesList, expectEntriesList,
      `Returns Array Iterator key/value pairs
      ::  List().entries([]).next().value`);


    const everyList = List([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectEveryList = true;
    assert.deepEqual(everyList, expectEveryList,
      `Every item passed the test. Returns true
      ::  List().every(function (t) {})`);


    const fillList = List([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectFillList = true;
    assert.deepEqual(fillList, expectFillList,
      `Fills all the elements of a List with a value from a start index to an end index.
      Returns a new List.
      ::  List().every(function (t) {})`);


    const filterList = list.filter((i: any): bool => i >= 4).data;
    const expectFilterList = [4, 5, 6];
    assert.deepEqual(filterList, expectFilterList,
      `Filters items List and returns a new list
      ::  List().filter(function (t) {})`);


    const findList = List([1, 120, 2, 12]).find((i: any): bool => i > 5).data;
    const expectFindList = 120;
    assert.deepEqual(findList, expectFindList,
      `Finds items in a List returns a new List. Otherwise undefined is returned.
      ::  List().find(function (t) {})`);


    const findIndexList = list.findIndex((i: any): bool => i === 5).data;
    const expectFindIndexList = 4;
    assert.deepEqual(findIndexList, expectFindIndexList,
      `Finds the index of a List item and return index
      ::  List().findIndex(function (t) {})`);


    const forEachList = list.forEach((i: any): bool => i * 2);
    const expectForEachList = undefined;
    assert.deepEqual(forEachList, expectForEachList,
      `Executes a provided function once per array element. Returns undefined
      ::  List().forEach(function (t) {})`);


    const includesList = list.includes(5);
    const expectIncludesList = true;
    assert.deepEqual(includesList, expectIncludesList,
      `Checks the List includes an item and returns true or false
      ::  List().includes()`);


    const indexOfList = list.indexOf(5);
    const expectIndexOfList = 4;
    assert.deepEqual(indexOfList, expectIndexOfList,
      `Return first index ot element, or -1 if it is not present.
      ::  List().includes()`);


    const insertMultipleItems = list.insert(['A', 'B', 'C'], 3).data;
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      `Insert items into a List and returns a new List
      :: List([1, 2, 3, 4, 5, 6]).insert(["A", "B", "C"]`);


    const concatList = list.concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectConcatList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(concatList, expectConcatList,
      `Megres Lists together and returns a new List
      :: List().concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ])`);


    const popItem = list.pop().data;
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      `Pop an item from the end of a List and returns a new List
      :: List([1, 3, 4, 5, 6]).pop()`);


    const pushItem = list.push('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(pushItem, expectPushItem,
      `Push an item to the end of a List and returns a new List
      :: List().push('otis')`);


    const removeItem = list.remove(1).data;
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      `Remove an item from the List and returns a new List
      :: :: List([1, 3, 4, 5, 6]).remove('1')`);


    const shiftItem = list.shift().data;
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      `Shift an item from the begining of a List and returns a new List
      :: List([1, 2, 3, 4, 5, 6]).shift()`);


    const unshiftMultipleItems = list.unshift(['A', 'B', 'C']).data;
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      `Unshift multiple items at begining of the list and returns a new list
      :: List([1, 2, 3, 4, 5, 6]).unshift(['A', 'B', 'C'])`);


    const upadteItem = list.update('A', 3).data;
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      `Update an item in a list and returns a new list
      :: List([1, 2, 3, 4, 5, 6]).update('A', 3)`);


    assert.end();

  });


  nested.test('Boolean List:', (assert: OBJECT) => {
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
      `Boolean List can only contain booleans
      ::  List([1, false], { type: 'boolean' })`);

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      `Creates a new Boolean List
      ::  List([true], { type: 'boolean' })`);


    assert.end();
  });


  nested.test('Number List:', (assert: OBJECT) => {
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
      `Number List can only contain numbers
      :: List([1, 'otis'], { type: 'number' })`);


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      `Creates a new Number List
      :: List([1], { type: 'number' })`);


    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      `Increment Number List by 1
      :: List([1], { type: 'number' }).increment(1)`);


    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      `Increment Number List by n
      :: List([1], { type: 'number' }).increment(n)`);


    const decreaseNumberBy1 = num.decrease(1).data;
    const expectdecreaseNumberBy1 = [1, 0];
    assert.deepEqual(decreaseNumberBy1, expectdecreaseNumberBy1,
      `Decease Number List by 1
      :: List([1], { type: 'number' }).decrease(1)`);


    const decreaseNumberBy5 = num.decrease(5).data;
    const expectDecreaseNumberBy5 = [1, -4];
    assert.deepEqual(decreaseNumberBy5, expectDecreaseNumberBy5,
      `Decease Number List by n
      :: List([1], { type: 'number' }).decrease(n)`);


    assert.end();
  });


  nested.test('String List:', (assert: OBJECT) => {
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
      'String List can only contain strings :: List([1], { type: "string" })');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List :: List([], { type: "string" })');

    assert.end();
  });


  nested.test('List Aliases:', (assert: OBJECT) => {
    const bool = Booleans([true]);
    const num = Numbers([1]);
    const str = Strings(['a']);


    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Boolean List :: Booleans()');
    assert.end();


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a Number List :: Numbers()');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List :: Strings()');
  });
});
