

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


test('Immutable list functions', (nested: OBJECT) => {

  nested.test('Creates new List:', (assert: OBJECT) => {
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


    const newListSize = list.size;
    const expectNewListSize = 6;
    assert.deepEqual(newListSize, expectNewListSize,
      'Creates an new empty List with initial data');


    assert.end();
  });


  nested.test('List methods:', (assert: OBJECT) => {


    const list = List([1, 2, 3, 4, 5, 6]);

    const addToEnd = list.add('otis').data;
    const expectAddToEnd = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(addToEnd, expectAddToEnd,
    'Adds an item to the end of a List and returns a new List');

    const insertMultipleItems = list.insert(['A', 'B', 'C'], 3).data;
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert items into a List and returns a new List');


    const mergeList = list.merge([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectMergeList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(mergeList, expectMergeList,
      'Megre Lists and returns a new List');


    const popItem = list.pop().data;
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of a List and returns a new List');


    const pushItem = list.push('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of a List and returns a new List');


    const removeItem = list.remove(1).data;
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the List and returns a new List');


    const shiftItem = list.shift().data;
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of a List and returns a new List');


    const unshiftMultipleItems = list.unshift(['A', 'B', 'C']).data;
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the list and returns a new list');


    const upadteItem = list.update('A', 3).data;
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in a list and returns a new list');

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
      'Boolean List can only contain booleans');

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Boolean List');


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
      'Number List can only contain numbers');


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a new Number List');


    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      'Increments Number List by 1');


    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      'Increments Number List by 5');


    const decreaseNumberBy1 = num.decrease(1).data;
    const expectdecreaseNumberBy1 = [1, 0];
    assert.deepEqual(decreaseNumberBy1, expectdecreaseNumberBy1,
      'Increments Number List by 1');


    const decreaseNumberBy5 = num.decrease(5).data;
    const expectDecreaseNumberBy5 = [1, -4];
    assert.deepEqual(decreaseNumberBy5, expectDecreaseNumberBy5,
      'Increments Number List by 5');


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
      'String List can only contain strings');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List');

    assert.end();
  });


  nested.test('List Aliases:', (assert: OBJECT) => {
    const bool = Booleans([true]);
    const num = Numbers([1]);
    const str = Strings(['a']);


    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Boolean List');
    assert.end();


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a Number List');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new String List');
  });
});
