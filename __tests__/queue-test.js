'use strict';

import test from 'tape';
import index from '../lib';


// Flow types
type OBJECT = { [key: string]: any };

const { Queue } = index;


test('Immutable Queue', (nested: OBJECT) => {

  nested.test('Queue :: Queue() || :: Queue([e0, e1]) -> Queue', (assert: OBJECT) => {

    const createEmptyQueue = Queue().data;
    const cexpectCreateEmptyQueue = [];
    assert.deepEqual(createEmptyQueue, cexpectCreateEmptyQueue,
      'Creates an new empty Queue');

    const createQueueWithData = Queue([1, 2, 3, 4, 5, 6]).data;
    const expectCreateQueueWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createQueueWithData, expectCreateQueueWithData,
      'Creates an new empty Queue with initial data.');

    assert.end();
  });


  nested.test('Queue boolean :: Queue([e0], { type: "boolean" }) -> Queue', (assert: OBJECT) => {
    const bool = Queue([true], { type: 'boolean' });

    const testThrow = (): OBJECT | string => {
      try {
        return Queue([1, false], { type: 'boolean' }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const notBoolean = testThrow();
    const expectNotBoolean = 'Error: Type Error: 1 is not of type boolean';
    assert.deepEqual(notBoolean, expectNotBoolean,
      'Booleans Queue can only contain booleans');

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Booleans Queue');


    assert.end();
  });


  nested.test('Queue number :: Queue([e0], { type: "number" }) -> Queue', (assert: OBJECT) => {
    const num = Queue([1], { type: 'number' });

    const testThrow = (): OBJECT | string => {
      try {
        return Queue([1, 'otis'], { type: 'number' });

      } catch (err) {
        return err.toString();
      }
    };

    const notNumber = testThrow();
    const expectNotNumber = 'Error: Type Error: otis is not of type number';
    assert.deepEqual(notNumber, expectNotNumber,
      'Numbers Queue can only contain numbers.');


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a new Numbers Queue.');


    assert.end();
  });


  nested.test('Queue string :: Queue([e0], { type: "string" }) -> Queue', (assert: OBJECT) => {
    const str = Queue(['a'], { type: 'string' });

    const testThrow = (): OBJECT | string => {
      try {
        return Queue([1, 'otis'], { type: 'string' });

      } catch (err) {
        return err.toString();
      }
    };

    const notString = testThrow();
    const expectNotString = 'Error: Type Error: 1 is not of type string';
    assert.deepEqual(notString, expectNotString,
      'Strings Queue can only contain strings.');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new Strings Queue');

    assert.end();
  });


  nested.test('Queue object :: Queue([e0], { type: "object" }) -> Queue', (assert: OBJECT) => {
    const data = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
    ];

    const obj = Queue(data, { type: 'object' });

    const testThrow = (): OBJECT | string => {
      try {
        return Queue([1], { type: 'object' });

      } catch (err) {
        return err.toString();
      }
    };

    const notObject = testThrow();
    const expectNotObject = 'Error: Type Error: 1 is not of type object';
    assert.deepEqual(notObject, expectNotObject,
      'Objects Queue can only contain objects.');


    const isObject = obj.data;
    const expectIsObject = data;
    assert.deepEqual(isObject, expectIsObject,
      'Creates a new Objects Queue');

    assert.end();
  });

  nested.test('Queue collcetion :: Queue([e0], { type: "collcetion": schema: object }) -> Queue', (assert: OBJECT) => {
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

    const collection = Queue(data, { type: 'collection', schema }).data;
    const expectCollection = data;
    assert.deepEqual(collection, expectCollection,
      'Create a Queue collections and returns a Queue');


    const dataWithExtraField = [
      { name: 'apples', quantity: 2 },
      { name: 'bananas', quantity: 5, country: 'jamaica', taste: 'yuk' }
    ];

    const testThrow1 = (): OBJECT | string => {
      try {
        return Queue(dataWithExtraField, { type: 'collection', schema }).data;
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
        return Queue(dataWithINcorrectType, { type: 'collection', schema }).data;
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
        return Queue(dataMissingRequiredField, { type: 'collection', schema }).data;
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


  nested.test('Queue middleware || :: Queue([e0, e1], { middleware: [fn, fn] }) -> Queue', (assert: OBJECT) => {

    const middleware = [
      (x: any) => x.toUpperCase(),
      (x: any) => `${x}_VIGINIE`
    ];

    const queue = Queue(['otis', 'ania', 'jocelyne'], { middleware });

    const actualQueue = queue.data;
    const expectedQueue = ['OTIS_VIGINIE', 'ANIA_VIGINIE', 'JOCELYNE_VIGINIE'];
    assert.deepEqual(actualQueue, expectedQueue,
      'Transforms elements with middleware');

    assert.end();
  });


  nested.test('increment :: Queue([e0], { type: "number" }).increment(n) -> Queue', (assert: OBJECT) => {
    const num = Queue([1], { type: 'number' });

    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      'Increment Number Queue by 1.');

    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      'Increment Number Queue by n.');

    assert.end();
  });


  nested.test('decrease :: Queue([e0], { type: "number" }).decrease(n) -> Queue', (assert: OBJECT) => {
    const num = Queue([1], { type: 'number' });

    const decreaseNumberBy1 = num.decrease(1).data;
    const expectdecreaseNumberBy1 = [1, 0];
    assert.deepEqual(decreaseNumberBy1, expectdecreaseNumberBy1,
      'Decease Number Queue by 1.');


    const decreaseNumberBy5 = num.decrease(5).data;
    const expectDecreaseNumberBy5 = [1, -4];
    assert.deepEqual(decreaseNumberBy5, expectDecreaseNumberBy5,
      'Decease Number Queue by n.');

    assert.end();
  });


  nested.test('add :: Queue([e0]).add(e1) | Queue([e0]).add([e1, e2])  -> Queue', (assert: OBJECT) => {

    const addItem = Queue([1, 2, 3, 4, 5, 6]).add('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(addItem, expectPushItem,
      'Push an item to the end of the Queue and returns a new Queue.');

    const addMultipleItems = Queue([1, 2, 3, 4, 5, 6]).add(['otis', 'ania']).data;
    const expectMultiplePushItems = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(addMultipleItems, expectMultiplePushItems,
      'Adds elements to the end of the Queue and returns a new Queue.');

    assert.end();
  });


  nested.test('concat :: Queue([e0, e1, e2]).concat([ [e4, e5], [e6, e7]]) -> Queue', (assert: OBJECT) => {

    const concatQueue = Queue([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectConcatQueue = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(concatQueue, expectConcatQueue,
      'Megres Queues together and returns a new Queue.');

    assert.end();
  });


  nested.test('data :: Queue().data -> any', (assert: OBJECT) => {

    const createQueueWithData = Queue([1, 2, 3, 4, 5, 6]).data;
    const expectCreateQueueWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createQueueWithData, expectCreateQueueWithData,
      'Creates an new empty Queue with initial data.');

    assert.end();
  });


  nested.test('entries :: Queue([e0, e1]).entries().next() -> iterator', (assert: OBJECT) => {

    const entriesQueue = Queue([1, 2, 3, 4, 5, 6]).entries().next();
    const expectEntriesQueue = { done: false, value: [ 0, 1 ] };
    assert.deepEqual(entriesQueue, expectEntriesQueue,
      'Returns Array Iterator with key/value pairs.');

    assert.end();
  });


  nested.test('every ::  Queue([e0, e1, e2]).every(function (e) {}) -> bool', (assert: OBJECT) => {

    const everyQueue = Queue([11, 12, 13]).every((i: any): bool => i >= 10);
    const expectEveryQueue = true;
    assert.deepEqual(everyQueue, expectEveryQueue,
      'Every item passed the test. Returns true or false.');

    assert.end();
  });


  nested.test('filter :: Queue(e0, e1, e2).filter(function (e) {}) -> Queue', (assert: OBJECT) => {

    const filterQueue = Queue([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4).data;
    const expectFilterQueue = [4, 5, 6];
    assert.deepEqual(filterQueue, expectFilterQueue,
      'Filters items in the Queue and returns a new Queue.');

    assert.end();
  });


  nested.test('find :: Queue([e0, e1, e2]).find(function (e) {}) -> number', (assert: OBJECT) => {

    const findQueue = Queue([1, 120, 2, 12]).find((i: any): bool => i > 5).data;
    const expectFindQueue = 120;
    assert.deepEqual(findQueue, expectFindQueue,
      'Finds items in the Queue returns a new Queue. Otherwise undefined is returned.');

    assert.end();
  });


  nested.test('findIndex :: Queue([e0, e1, e2]).findIndex(function (e) {}) -> number', (assert: OBJECT) => {

    const findIndexQueue = Queue([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5).data;
    const expectFindIndexQueue = 4;
    assert.deepEqual(findIndexQueue, expectFindIndexQueue,
      'Finds the index of the Queue item and return index or -1 if it is not present.');

    assert.end();
  });


  nested.test('first :: Queue([e0, e1, e2]).first -> any', (assert: OBJECT) => {

    const firstQueue = Queue([1, 2, 3, 4, 5, 6]).first();
    const expectFirstQueue = 1;
    assert.deepEqual(firstQueue, expectFirstQueue,
      'Returns first item in the Queue.');

    assert.end();
  });


  nested.test('forEach :: Queue([e0, e1, e2]).forEach(function (e) {}) -> undefined', (assert: OBJECT) => {

    const forEachQueue = Queue([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
    const expectForEachQueue = undefined;
    assert.deepEqual(forEachQueue, expectForEachQueue,
      'Executes a provided function once per Queue element. Returns undefined.');

    assert.end();
  });


  nested.test('head :: Queue([e0, e1, e2]).head -> Queue', (assert: OBJECT) => {

    const headQueue = Queue([1, 2, 3, 4, 5, 6]).head().data;
    const expectHeadQueue = [2, 3, 4, 5, 6];
    assert.deepEqual(headQueue, expectHeadQueue,
      'Returns a new array with all but the last element.');

    assert.end();
  });


  nested.test('includes :: Queue([e0, e1, e2]).includes(e) -> bool', (assert: OBJECT) => {

    const includesQueue = Queue([1, 2, 3, 4, 5, 6]).includes(5);
    const expectIncludesQueue = true;
    assert.deepEqual(includesQueue, expectIncludesQueue,
      'Checks the Queue includes an item and returns true or false.');

    assert.end();
  });


  nested.test('indexOf :: Queue([e0, e1, e2]).indexOf(e) -> number', (assert: OBJECT) => {

    const indexOfQueue = Queue([1, 2, 3, 4, 5, 6]).indexOf(5);
    const expectIndexOfQueue = 4;
    assert.deepEqual(indexOfQueue, expectIndexOfQueue,
    'Return first index of an element in the Queue, or -1 if it is not present.');

    assert.end();
  });


  nested.test('isEmpty :: Queue([e0, e1, e2]).isEmpty(]) -> bool', (assert: OBJECT) => {

    const isEmptyItems = Queue().isEmpty();
    const expectIsEmptyItems = true;
    assert.deepEqual(isEmptyItems, expectIsEmptyItems,
      'Queue is empty. Returns true or false');

    const isNotEmptyItems = Queue([1]).isEmpty();
    const expectIsNotEmptyItems = false;
    assert.deepEqual(isNotEmptyItems, expectIsNotEmptyItems,
      'Queue is empty. Returns true or false');

    assert.end();
  });


  nested.test('join :: Queue([e0, e1, e2]).join("") -> string', (assert: OBJECT) => {

    const joinQueue = Queue([1, 2, 3, 4, 5, 6]).join(', ');
    const expectJoinQueue = '1, 2, 3, 4, 5, 6';
    assert.deepEqual(joinQueue, expectJoinQueue,
      'Joins all elements of the Queue into a string.');

    assert.end();
  });


  nested.test('keys :: Queue([e0, e1, e2]).keys() -> iterator', (assert: OBJECT) => {

    const keysQueue = Queue([1, 2, 3, 4, 5, 6]).keys().next();
    const expectKeysQueue = { value: 0, done: false };
    assert.deepEqual(keysQueue, expectKeysQueue,
      'Array Iterator that contains the keys for each index in the Queue.');

    assert.end();
  });


  nested.test('last :: Queue([e0, e1, e2]).last -> any', (assert: OBJECT) => {

    const lastQueue = Queue([1, 2, 3, 4, 5, 6]).last();
    const expectFirstQueue = 6;
    assert.deepEqual(lastQueue, expectFirstQueue,
      'Returns last item in the Queue.');

    assert.end();
  });

  nested.test('lastIndexOf :: Queue([e0, e1, e2]).lastIndexOf(e) -> number', (assert: OBJECT) => {

    const indexOfQueue = Queue([1, 2, 3, 4, 1]).lastIndexOf(1);
    const expectIndexOfQueue = 4;
    assert.deepEqual(indexOfQueue, expectIndexOfQueue,
    'Return last index of element in the Queue, or -1 if it is not present.');

    assert.end();
  });


  nested.test('map :: Queue([e0, e1, e2]).map(function (e) {}) -> Queue', (assert: OBJECT) => {

    const mapQueue = Queue([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1).data;
    const expectMapQueue = [2, 3, 4, 5, 6, 7];
    assert.deepEqual(mapQueue, expectMapQueue,
    'Returns a new Queue with the results from a provided function called on eash element.');

    assert.end();
  });


  nested.test('reduce :: Queue([e0, e1, e2]).reduce(function (prev, curr, index, array) {}) -> Queue', (assert: OBJECT) => {

    const reduceQueue = Queue([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c).data;
    const expectReduceQueue = 21;
    assert.deepEqual(reduceQueue, expectReduceQueue,
    'Applies a function against an accumulator and each value of the Queue (left-to-right). Returns a new Queue.');

    assert.end();
  });


  nested.test('remove :: Queue([e0, e1, e2]).remove([e4, e5, e6]) -> Queue', (assert: OBJECT) => {

    const removeMultipleItems = Queue([1, 2, 3, 4, 5, 6]).remove().data;
    const expectUnshiftMultipletems = [2, 3, 4, 5, 6];
    assert.deepEqual(removeMultipleItems, expectUnshiftMultipletems,
      'Removes elements from the beginning of the Queue and returns a new Queue.');

    assert.end();
  });


  nested.test('reverse :: Queue([e0, e1, e2]).reverse() -> Queue', (assert: OBJECT) => {

    const reverseItem = Queue([1, 2, 3, 4, 5, 6]).reverse().data;
    const expectReverseItem = [6, 5, 4, 3, 2, 1];
    assert.deepEqual(reverseItem, expectReverseItem,
      'Pop an item from the end of the Queue and returns a new Queue.');

    assert.end();
  });


  nested.test('reduceRight :: Queue([e0, e1, e2]).reduceRight(function (prev, curr, index, array) {}) -> Queue', (assert: OBJECT) => {

    const reduceRightQueue = Queue([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c).data;
    const expectReduceRightQueue = 21;
    assert.deepEqual(reduceRightQueue, expectReduceRightQueue,
    'Applies a function against an accumulator and each value of the Queue (right-to left). Returns a new Queue.');

    assert.end();
  });


  nested.test('size :: Queue().size -> number', (assert: OBJECT) => {

    const newQueueSize = Queue([1, 2, 3, 4, 5, 6]).size;
    const expectNewQueueSize = 6;
    assert.deepEqual(newQueueSize, expectNewQueueSize,
      'Queue has the correct size.');

    assert.end();
  });


  nested.test('some ::  Queue([e0, e1, e2]).some(function (e) {}) -> bool', (assert: OBJECT) => {

    const someQueue = Queue([11, 5, 13, 3]).some((i: any): bool => i >= 10);
    const expectSomeQueue = true;
    assert.deepEqual(someQueue, expectSomeQueue,
      'Tests whether some element are in the Queue. Returns true or false.');

    assert.end();
  });


  nested.test('sort ::  Queue([e0, e1, e2]).sort() | Queue([e0, e1, e2]).sort(function (e) {}) -> Queue', (assert: OBJECT) => {

    const sortQueue = Queue(['d', 'f', 'a', 'x']).sort().data;
    const expectSortQueue = [ 'a', 'd', 'f', 'x' ];
    assert.deepEqual(sortQueue, expectSortQueue,
      'Sorts the items elements in a Queue in the correct order and returns a new Queue.');

    assert.end();
  });


  nested.test('toString :: Queue([e0, e1, e2]).toString() -> string', (assert: OBJECT) => {

    const shiftItem = Queue([1, 2, 3, 4, 5, 6]).toString();
    const expectShiftItem = '1,2,3,4,5,6';
    assert.deepEqual(shiftItem, expectShiftItem,
      'Returns a string representing the Queue.');

    assert.end();
  });

});
