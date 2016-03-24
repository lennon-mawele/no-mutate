'use strict';

import test from 'tape';
import index from '../lib';


// Flow types
type OBJECT = { [key: string]: any };

const { Stack } = index;

test.skip('Immutable Stack', (nested: OBJECT) => {

  nested.test('Stack :: Stack() || :: Stack([e0, e1]) -> Stack', (assert: OBJECT) => {

    const createEmptyStack = Stack().data;
    const cexpectCreateEmptyStack = [];
    assert.deepEqual(createEmptyStack, cexpectCreateEmptyStack,
      'Creates an new empty Stack');

    const createStackWithData = Stack([1, 2, 3, 4, 5, 6]).data;
    const expectCreateStackWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createStackWithData, expectCreateStackWithData,
      'Creates an new empty Stack with initial data.');

    assert.end();
  });


  nested.test('Stack boolean :: Stack([e0], { type: "boolean" }) -> Stack', (assert: OBJECT) => {
    const bool = Stack([true], { type: 'boolean' });

    const testThrow = (): OBJECT | string => {
      try {
        return Stack([1, false], { type: 'boolean' });
      } catch (err) {
        return err.toString();
      }
    };

    const notBoolean = testThrow();
    const expectNotBoolean = 'Error: Type Error: 1 is not of type boolean';
    assert.deepEqual(notBoolean, expectNotBoolean,
      'Booleans Stack can only contain booleans');

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Booleans Stack');


    assert.end();
  });


  nested.test('Stack number :: Stack([e0], { type: "number" }) -> Stack', (assert: OBJECT) => {
    const num = Stack([1], { type: 'number' });

    const testThrow = (): OBJECT | string => {
      try {
        return Stack([1, 'otis'], { type: 'number' });

      } catch (err) {
        return err.toString();
      }
    };

    const notNumber = testThrow();
    const expectNotNumber = 'Error: Type Error: otis is not of type number';
    assert.deepEqual(notNumber, expectNotNumber,
      'Numbers Stack can only contain numbers.');


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a new Numbers Stack.');


    assert.end();
  });


  nested.test('Stack string :: Stack([e0], { type: "string" }) -> Stack', (assert: OBJECT) => {
    const str = Stack(['a'], { type: 'string' });

    const testThrow = (): OBJECT | string => {
      try {
        return Stack([1, 'otis'], { type: 'string' });

      } catch (err) {
        return err.toString();
      }
    };

    const notString = testThrow();
    const expectNotString = 'Error: Type Error: 1 is not of type string';
    assert.deepEqual(notString, expectNotString,
      'Strings Stack can only contain strings.');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new Strings Stack');

    assert.end();
  });


  nested.test('Stack object :: Stack([e0], { type: "object" }) -> Stack', (assert: OBJECT) => {
    const data = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
    ];

    const obj = Stack(data, { type: 'object' });

    const testThrow = (): OBJECT | string => {
      try {
        return Stack([1], { type: 'object' });

      } catch (err) {
        return err.toString();
      }
    };

    const notObject = testThrow();
    const expectNotObject = 'Error: Type Error: 1 is not of type object';
    assert.deepEqual(notObject, expectNotObject,
      'Objects Stack can only contain objects.');


    const isObject = obj.data;
    const expectIsObject = data;
    assert.deepEqual(isObject, expectIsObject,
      'Creates a new Objects Stack');

    assert.end();
  });

  nested.test('Stack collcetion :: Stack([e0], { type: "collcetion": schema: object }) -> Stack', (assert: OBJECT) => {
    const schema = {
      name    : { type: 'string', required: true },
      quantity: { type: 'number', required: true },
      country : 'string'
    };

    const data = [
      { name: 'apples', quantity: 2, country: 'england' },
      { name: 'bananas', quantity: 5, country: 'jamaica' },
      { name: 'cherries', quantity: 1, country: 'spain' }
    ];

    const collection = Stack(data, { type: 'collection', schema }).data;
    const expectCollection = data;
    assert.deepEqual(collection, expectCollection,
      'Create a Stack collections and returns a Stack');


    const dataWithExtraField = [
      { name: 'apples', quantity: 2 },
      { name: 'bananas', quantity: 5, country: 'jamaica', taste: 'yuk' }
    ];

    const testThrow1 = (): OBJECT | string => {
      try {
        return Stack(dataWithExtraField, { type: 'collection', schema }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const invalidKey = testThrow1();
    const expectInvalidKey = 'Error: Schema Key Error: A key is not a valid schema key.';
    assert.deepEqual(invalidKey, expectInvalidKey,
      'Does not pass keys not in schema');


    const dataWithINcorrectType = [
      { name: 'apples', quantity: '2' },
      { name: 'bananas', quantity: 5, country: 'jamaica' }
    ];

    const testThrow2 = (): OBJECT | string => {
      try {
        return Stack(dataWithINcorrectType, { type: 'collection', schema }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const invalidType = testThrow2();
    const expectInvalidType = 'Error: Schema Value Error: quantity value is not number type.';
    assert.deepEqual(invalidType, expectInvalidType,
      'Does not pass value if type is not the same as schema key/value');


    const dataMissingRequiredField = [
      { quantity: 3 },
      { name: 'bananas', quantity: 3, country: 'jamaica' }
    ];

    const testThrow3 = (): OBJECT | string => {
      try {
        return Stack(dataMissingRequiredField, { type: 'collection', schema }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const missingRequireField = testThrow3();
    const expectMissingRequireField = 'Error: Schema Required Field Error: Required field name is missing.';
    assert.deepEqual(missingRequireField, expectMissingRequireField,
      'Does not pass if require field is missing not in schema');


    assert.end();
  });


  // nested.test('Stack middleWare || :: Stack([e0, e1], { middleWare: [fn, fn] }) -> Stack', (assert: OBJECT) => {
  //
  //   const middleWare = [
  //     (x: any) => x.toUpperCase(),
  //     (x: any) => `${x}_VIGINIE`
  //   ];
  //
  //   const Stack = Stack(['otis', 'ania', 'jocelyne'], { middleWare });
  //
  //   const actualStack = Stack.data;
  //   const expectedStack = ['OTIS_VIGINIE', 'ANIA_VIGINIE', 'JOCELYNE_VIGINIE'];
  //   assert.deepEqual(actualStack, expectedStack,
  //     'Transforms elements with middleWare');
  //
  //   assert.end();
  // });


  nested.test('increment :: Stack([e0], { type: "number" }).increment(n) -> Stack', (assert: OBJECT) => {
    const num = Stack([1], { type: 'number' });

    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      'Increment Number Stack by 1.');

    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      'Increment Number Stack by n.');

    assert.end();
  });


  nested.test('decrease :: Stack([e0], { type: "number" }).decrease(n) -> Stack', (assert: OBJECT) => {
    const num = Stack([1], { type: 'number' });

    const decreaseNumberBy1 = num.decrease(1).data;
    const expectdecreaseNumberBy1 = [1, 0];
    assert.deepEqual(decreaseNumberBy1, expectdecreaseNumberBy1,
      'Decease Number Stack by 1.');


    const decreaseNumberBy5 = num.decrease(5).data;
    const expectDecreaseNumberBy5 = [1, -4];
    assert.deepEqual(decreaseNumberBy5, expectDecreaseNumberBy5,
      'Decease Number Stack by n.');


    assert.end();
  });


  nested.test('concat :: Stack([e0, e1, e2]).concat([ [e4, e5], [e6, e7]]) -> Stack', (assert: OBJECT) => {

    const concatStack = Stack([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectConcatStack = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(concatStack, expectConcatStack,
      'Megres Stacks together and returns a new Stack.');

    assert.end();
  });


  nested.test('data :: Stack().data -> any', (assert: OBJECT) => {

    const createStackWithData = Stack([1, 2, 3, 4, 5, 6]).data;
    const expectCreateStackWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createStackWithData, expectCreateStackWithData,
      'Creates an new empty Stack with initial data.');

    assert.end();
  });


  nested.test('entries :: Stack([e0, e1]).entries().next() -> iterator', (assert: OBJECT) => {

    const entriesStack = Stack([1, 2, 3, 4, 5, 6]).entries().next();
    const expectEntriesStack = { done: false, value: [ 0, 1 ] };
    assert.deepEqual(entriesStack, expectEntriesStack,
      'Returns Array Iterator with key/value pairs.');

    assert.end();
  });


  nested.test('every ::  Stack([e0, e1, e2]).every(function (e) {}) -> bool', (assert: OBJECT) => {

    const everyStack = Stack([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectEveryStack = true;
    assert.deepEqual(everyStack, expectEveryStack,
      'Every item passed the test. Returns true or false.');

    assert.end();
  });


  nested.test('fill :: Stack().every(function (e) {}) -> Stack', (assert: OBJECT) => {

    const fillStack = Stack([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectFillStack = true;
    assert.deepEqual(fillStack, expectFillStack,
      `Fills all the elements of the Stack with a value from a start index to an end index.
      Returns a new Stack.`);

    assert.end();
  });


  nested.test('filter :: Stack(e0, e1, e2).filter(function (e) {}) -> Stack', (assert: OBJECT) => {

    const filterStack = Stack([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4).data;
    const expectFilterStack = [4, 5, 6];
    assert.deepEqual(filterStack, expectFilterStack,
      'Filters items in the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('find :: Stack([e0, e1, e2]).find(function (e) {}) -> number', (assert: OBJECT) => {

    const findStack = Stack([1, 120, 2, 12]).find((i: any): bool => i > 5).data;
    const expectFindStack = 120;
    assert.deepEqual(findStack, expectFindStack,
      'Finds items in the Stack returns a new Stack. Otherwise undefined is returned.');

    assert.end();
  });


  nested.test('findIndex :: Stack([e0, e1, e2]).findIndex(function (e) {}) -> number', (assert: OBJECT) => {

    const findIndexStack = Stack([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5).data;
    const expectFindIndexStack = 4;
    assert.deepEqual(findIndexStack, expectFindIndexStack,
      'Finds the index of the Stack item and return index or -1 if it is not present.');

    assert.end();
  });


  nested.test('first :: Stack([e0, e1, e2]).first -> any', (assert: OBJECT) => {

    const firstStack = Stack([1, 2, 3, 4, 5, 6]).first();
    const expectFirstStack = 1;
    assert.deepEqual(firstStack, expectFirstStack,
      'Returns first item in the Stack.');

    assert.end();
  });


  nested.test('forEach :: Stack([e0, e1, e2]).forEach(function (e) {}) -> undefined', (assert: OBJECT) => {

    const forEachStack = Stack([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
    const expectForEachStack = undefined;
    assert.deepEqual(forEachStack, expectForEachStack,
      'Executes a provided function once per Stack element. Returns undefined.');

    assert.end();
  });


  nested.test('head :: Stack([e0, e1, e2]).head -> Stack', (assert: OBJECT) => {

    const headStack = Stack([1, 2, 3, 4, 5, 6]).head().data;
    const expectHeadStack = [2, 3, 4, 5, 6];
    assert.deepEqual(headStack, expectHeadStack,
      'Returns a new array with all but the last element.');

    assert.end();
  });


  nested.test('includes :: Stack([e0, e1, e2]).includes(e) -> bool', (assert: OBJECT) => {

    const includesStack = Stack([1, 2, 3, 4, 5, 6]).includes(5);
    const expectIncludesStack = true;
    assert.deepEqual(includesStack, expectIncludesStack,
      'Checks the Stack includes an item and returns true or false.');

    assert.end();
  });


  nested.test('indexOf :: Stack([e0, e1, e2]).indexOf(e) -> number', (assert: OBJECT) => {

    const indexOfStack = Stack([1, 2, 3, 4, 5, 6]).indexOf(5);
    const expectIndexOfStack = 4;
    assert.deepEqual(indexOfStack, expectIndexOfStack,
    'Return first index of an element in the Stack, or -1 if it is not present.');

    assert.end();
  });


  nested.test('insert :: Stack([e0, e1, e2]).insert(index, [e4, e5, e6]) -> Stack', (assert: OBJECT) => {

    const insertMultipleItems = Stack([1, 2, 3, 4, 5, 6]).insert(3, ['A', 'B', 'C']).data;
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert items into the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('isEmpty :: Stack([e0, e1, e2]).isEmpty(]) -> bool', (assert: OBJECT) => {

    const isEmptyItems = Stack().isEmpty();
    const expectIsEmptyItems = true;
    assert.deepEqual(isEmptyItems, expectIsEmptyItems,
      'Stack is empty. Returns true or false');

    const isNotEmptyItems = Stack([1]).isEmpty();
    const expectIsNotEmptyItems = false;
    assert.deepEqual(isNotEmptyItems, expectIsNotEmptyItems,
      'Stack is empty. Returns true or false');

    assert.end();
  });


  nested.test('join :: Stack([e0, e1, e2]).join("") -> string', (assert: OBJECT) => {

    const joinStack = Stack([1, 2, 3, 4, 5, 6]).join(', ');
    const expectJoinStack = '1, 2, 3, 4, 5, 6';
    assert.deepEqual(joinStack, expectJoinStack,
      'Joins all elements of the Stack into a string.');

    assert.end();
  });


  nested.test('keys :: Stack([e0, e1, e2]).keys() -> iterator', (assert: OBJECT) => {

    const keysStack = Stack([1, 2, 3, 4, 5, 6]).keys().next();
    const expectKeysStack = { value: 0, done: false };
    assert.deepEqual(keysStack, expectKeysStack,
      'Array Iterator that contains the keys for each index in the Stack.');

    assert.end();
  });


  nested.test('last :: Stack([e0, e1, e2]).last -> any', (assert: OBJECT) => {

    const lastStack = Stack([1, 2, 3, 4, 5, 6]).last();
    const expectFirstStack = 6;
    assert.deepEqual(lastStack, expectFirstStack,
      'Returns last item in the Stack.');

    assert.end();
  });


  nested.test('lastIndexOf :: Stack([e0, e1, e2]).lastIndexOf(e) -> number', (assert: OBJECT) => {

    const indexOfStack = Stack([1, 2, 3, 4, 1]).lastIndexOf(1);
    const expectIndexOfStack = 4;
    assert.deepEqual(indexOfStack, expectIndexOfStack,
    'Return last index of element in the Stack, or -1 if it is not present.');

    assert.end();
  });


  nested.test('map :: Stack([e0, e1, e2]).map(function (e) {}) -> Stack', (assert: OBJECT) => {

    const mapStack = Stack([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1).data;
    const expectMapStack = [2, 3, 4, 5, 6, 7];
    assert.deepEqual(mapStack, expectMapStack,
    'Returns a new Stack with the results from a provided function called on eash element.');

    assert.end();
  });


  nested.test('pop :: Stack([e0, e1, e2]).pop() -> Stack', (assert: OBJECT) => {

    const popItem = Stack([1, 2, 3, 4, 5, 6]).pop().data;
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('push :: Stack([e0]).push(e1) | Stack([e0]).push([e1, e2])  -> Stack', (assert: OBJECT) => {

    const pushItem = Stack([1, 2, 3, 4, 5, 6]).push('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of the Stack and returns a new Stack.');

    const pushMultipleItems = Stack([1, 2, 3, 4, 5, 6]).push(['otis', 'ania']).data;
    const expectMultiplePushItems = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(pushMultipleItems, expectMultiplePushItems,
      'Push an item to the end of the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('reduce :: Stack([e0, e1, e2]).reduce(function (prev, curr, index, array) {}) -> Stack', (assert: OBJECT) => {

    const reduceStack = Stack([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c).data;
    const expectReduceStack = 21;
    assert.deepEqual(reduceStack, expectReduceStack,
    'Applies a function against an accumulator and each value of the Stack (left-to-right). Returns a new Stack.');

    assert.end();
  });


  nested.test('reverse :: Stack([e0, e1, e2]).reverse() -> Stack', (assert: OBJECT) => {

    const reverseItem = Stack([1, 2, 3, 4, 5, 6]).reverse().data;
    const expectReverseItem = [6, 5, 4, 3, 2, 1];
    assert.deepEqual(reverseItem, expectReverseItem,
      'Pop an item from the end of the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('reduceRight :: Stack([e0, e1, e2]).reduceRight(function (prev, curr, index, array) {}) -> Stack', (assert: OBJECT) => {

    const reduceRightStack = Stack([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c).data;
    const expectReduceRightStack = 21;
    assert.deepEqual(reduceRightStack, expectReduceRightStack,
    'Applies a function against an accumulator and each value of the Stack (right-to left). Returns a new Stack.');

    assert.end();
  });


  nested.test('remove :: Stack([e0, e1, e2]).remove(n) -> Stack', (assert: OBJECT) => {

    const removeItem = Stack([1, 2, 3, 4, 5, 6]).remove(1).data;
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the Stack using it\'s index and returns a new Stack.');

    assert.end();

  });


  nested.test('Stack collcetion :: Stack([e0], { type: "collcetion": schema: object }) -> Stack', (assert: OBJECT) => {
    const schemaObj = {
      name    : { type: 'string', required: true },
      quantity: { type: 'number', required: true },
      country : 'string'
    };

    const data = [
      { name: 'apples', quantity: 2, country: 'england' },
      { name: 'bananas', quantity: 5, country: 'jamaica' },
      { name: 'cherries', quantity: 1, country: 'spain' }
    ];

    const schema = Stack(data, { type: 'collection', schema: schemaObj }).schema;
    const expectSchema = schema;
    assert.deepEqual(schema, expectSchema,
      'Returns Collections schema');

    assert.end();
  });


  nested.test('shift :: Stack([e0, e1, e2]).shift() -> Stack', (assert: OBJECT) => {

    const shiftItem = Stack([1, 2, 3, 4, 5, 6]).shift().data;
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('size :: Stack().size -> number', (assert: OBJECT) => {

    const newStackSize = Stack([1, 2, 3, 4, 5, 6]).size;
    const expectNewStackSize = 6;
    assert.deepEqual(newStackSize, expectNewStackSize,
      'Stack has the correct size.');

    assert.end();
  });


  nested.test('slice :: Stack([e0, e1, e2]).slice(start, end) -> Stack', (assert: OBJECT) => {

    const sliceRightStack = Stack([1, 2, 3, 4, 5, 6]).slice(1, 3).data;
    const expectSliceRightStack = [2, 3];
    assert.deepEqual(sliceRightStack, expectSliceRightStack,
    'Returns a shallow copy of a portion of the Stack into a new Stack.');

    assert.end();
  });


  nested.test('some ::  Stack([e0, e1, e2]).some(function (e) {}) -> bool', (assert: OBJECT) => {

    const someStack = Stack([11, 5, 13, 3]).some((i: any): bool => i >= 10);
    const expectSomeStack = true;
    assert.deepEqual(someStack, expectSomeStack,
      'Tests whether some element are in the Stack. Returns true or false.');

    assert.end();
  });


  nested.test('sort ::  Stack([e0, e1, e2]).sort() | Stack([e0, e1, e2]).sort(function (e) {}) -> Stack', (assert: OBJECT) => {

    const sortStack = Stack(['d', 'f', 'a', 'x']).sort().data;
    const expectSortStack = [ 'a', 'd', 'f', 'x' ];
    assert.deepEqual(sortStack, expectSortStack,
      'Sorts the items elements in a Stack in the correct order and returns a new Stack.');

    assert.end();
  });


  nested.test('tail :: Stack([e0, e1, e2]).tail -> Stack', (assert: OBJECT) => {

    const tailStack = Stack([1, 2, 3, 4, 5, 6]).tail().data;
    const expectTailStack = [1, 2, 3, 4, 5];
    assert.deepEqual(tailStack, expectTailStack,
      'Returns a new array with all but the first element.');

    assert.end();
  });


  nested.test('toString :: Stack([e0, e1, e2]).toString() -> string', (assert: OBJECT) => {

    const shiftItem = Stack([1, 2, 3, 4, 5, 6]).toString();
    const expectShiftItem = '1,2,3,4,5,6';
    assert.deepEqual(shiftItem, expectShiftItem,
      'Returns a string representing the Stack.');

    assert.end();
  });


  nested.test('unshift :: Stack([e0, e1, e2]).unshift([e4, e5, e6]) -> Stack', (assert: OBJECT) => {

    const unshiftMultipleItems = Stack([1, 2, 3, 4, 5, 6]).unshift(['A', 'B', 'C']).data;
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the Stack and returns a new Stack.');

    assert.end();
  });


  nested.test('update :: Stack([e0, e1, e2]).update("e4", index]) -> Stack', (assert: OBJECT) => {

    const upadteItem = Stack([1, 2, 3, 4, 5, 6]).update(3, 'A').data;
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in the Stack and returns a new Stack.');

    assert.end();
  });

});
