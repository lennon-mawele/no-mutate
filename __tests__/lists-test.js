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

    const createEmptyList = List().data;
    const cexpectCreateEmptyList = [];
    assert.deepEqual(createEmptyList, cexpectCreateEmptyList,
      'Creates an new empty List');

    const createListWithData = List([1, 2, 3, 4, 5, 6]).data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data.');

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
      'Booleans List can only contain booleans.)');

    const isBoolean = bool.data;
    const expectIsBoolean = [true];
    assert.deepEqual(isBoolean, expectIsBoolean,
      'Creates a new Booleans List');


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
      'Numbers List can only contain numbers.');


    const isNumber = num.data;
    const expectIsNumber = [1];
    assert.deepEqual(isNumber, expectIsNumber,
      'Creates a new Numbers List.');


    assert.end();
  });


  nested.test('List string :: List([e0], { type: "string" }) -> List', (assert: OBJECT) => {
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
      'Strings List can only contain strings.');


    const isString = str.data;
    const expectIsString = ['a'];
    assert.deepEqual(isString, expectIsString,
      'Creates a new Strings List');

    assert.end();
  });


  nested.test('List object :: List([e0], { type: "object" }) -> List', (assert: OBJECT) => {
    const data = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
    ];

    const obj = List(data, { type: 'object' });

    const testThrow = (): OBJECT | string => {
      try {
        return List([1], { type: 'object' });

      } catch (err) {
        return err.toString();
      }
    };

    const notObject = testThrow();
    const expectNotObject = 'Error: Type Error: 1 is not of type object';
    assert.deepEqual(notObject, expectNotObject,
      'Objects List can only contain objects.');


    const isObject = obj.data;
    const expectIsObject = data;
    assert.deepEqual(isObject, expectIsObject,
      'Creates a new Objects List');

    assert.end();
  });

  nested.test('List collcetion :: List([e0], { type: "collcetion": schema: object }) -> List', (assert: OBJECT) => {
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

    const collection = List(data, { type: 'collection', schema }).data;
    const expectCollection = data;
    assert.deepEqual(collection, expectCollection,
      'Create a List collections and returns a List');


    const dataWithExtraField = [
      { name: 'apples', quantity: 2 },
      { name: 'bananas', quantity: 5, country: 'jamaica', taste: 'yuk' }
    ];

    const testThrow1 = (): OBJECT | string => {
      try {
        return List(dataWithExtraField, { type: 'collection', schema }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const invalidKey = testThrow1();
    const expectInvalidKey = 'Error: Invalid Schema Error: taste key is not a schema key.';
    assert.deepEqual(invalidKey, expectInvalidKey,
      'Does not pass keys not in schema');


    const dataWithINcorrectType = [
      { name: 'apples', quantity: '2' },
      { name: 'bananas', quantity: 5, country: 'jamaica' }
    ];

    const testThrow2 = (): OBJECT | string => {
      try {
        return List(dataWithINcorrectType, { type: 'collection', schema }).data;
      } catch (err) {
        return err.toString();
      }
    };

    const invalidType = testThrow2();
    const expectInvalidType = 'Error: Invalid Schema Error: quantity value is not number type.';
    assert.deepEqual(invalidType, expectInvalidType,
      'Does not pass value if type is not the same as schema key/value');


    const dataMissingRequiredField = [
      { quantity: 3 },
      { name: 'bananas', quantity: 3, country: 'jamaica' }
    ];

    const testThrow3 = (): OBJECT | string => {
      try {
        return List(dataMissingRequiredField, { type: 'collection', schema }).data;
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


  nested.test('increment :: List([e0], { type: "number" }).increment(n) -> List', (assert: OBJECT) => {
    const num = List([1], { type: 'number' });

    const incrementsNumberBy1 = num.increment(1).data;
    const expectIncrementsNumberBy1 = [1, 2];
    assert.deepEqual(incrementsNumberBy1, expectIncrementsNumberBy1,
      'Increment Number List by 1.');

    const incrementNumberBy5 = num.increment(5).data;
    const expectIncrementNumberBy5 = [1, 6];
    assert.deepEqual(incrementNumberBy5, expectIncrementNumberBy5,
      'Increment Number List by n.');

    assert.end();
  });


  nested.test('decrease :: List([e0], { type: "number" }).decrease(n) -> List', (assert: OBJECT) => {
    const num = List([1], { type: 'number' });

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


  nested.test('concat :: List([e0, e1, e2]).concat([ [e4, e5], [e6, e7]]) -> LIST', (assert: OBJECT) => {

    const concatList = List([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]).data;
    const expectConcatList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10];
    assert.deepEqual(concatList, expectConcatList,
      'Megres Lists together and returns a new List.');

    assert.end();
  });


  nested.test('data :: List().data -> any', (assert: OBJECT) => {

    const createListWithData = List([1, 2, 3, 4, 5, 6]).data;
    const expectCreateListWithData = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(createListWithData, expectCreateListWithData,
      'Creates an new empty List with initial data.');

    assert.end();
  });


  nested.test('entries :: List([e0, e1]).entries().next() -> iterator', (assert: OBJECT) => {

    const entriesList = List([1, 2, 3, 4, 5, 6]).entries().next();
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
      `Fills all the elements of the List with a value from a start index to an end index.
      Returns a new List.`);

    assert.end();
  });


  nested.test('filter :: List(e0, e1, e2).filter(function (e) {}) -> List', (assert: OBJECT) => {

    const filterList = List([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4).data;
    const expectFilterList = [4, 5, 6];
    assert.deepEqual(filterList, expectFilterList,
      'Filters items in the List and returns a new List.');

    assert.end();
  });


  nested.test('find :: List([e0, e1, e2]).find(function (e) {}) -> number', (assert: OBJECT) => {

    const findList = List([1, 120, 2, 12]).find((i: any): bool => i > 5).data;
    const expectFindList = 120;
    assert.deepEqual(findList, expectFindList,
      'Finds items in the List returns a new List. Otherwise undefined is returned.');

    assert.end();
  });


  nested.test('findIndex :: List([e0, e1, e2]).findIndex(function (e) {}) -> number', (assert: OBJECT) => {

    const findIndexList = List([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5).data;
    const expectFindIndexList = 4;
    assert.deepEqual(findIndexList, expectFindIndexList,
      'Finds the index of the List item and return index or -1 if it is not present.');

    assert.end();
  });


  nested.test('first :: List([e0, e1, e2]).first -> any', (assert: OBJECT) => {

    const firstList = List([1, 2, 3, 4, 5, 6]).first();
    const expectFirstList = 1;
    assert.deepEqual(firstList, expectFirstList,
      'Returns first item in the List.');

    assert.end();
  });


  nested.test('forEach :: List([e0, e1, e2]).forEach(function (e) {}) -> undefined', (assert: OBJECT) => {

    const forEachList = List([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
    const expectForEachList = undefined;
    assert.deepEqual(forEachList, expectForEachList,
      'Executes a provided function once per List element. Returns undefined.');

    assert.end();
  });


  nested.test('head :: List([e0, e1, e2]).head -> List', (assert: OBJECT) => {

    const headList = List([1, 2, 3, 4, 5, 6]).head().data;
    const expectHeadList = [2, 3, 4, 5, 6];
    assert.deepEqual(headList, expectHeadList,
      'Returns a new array with all but the last element.');

    assert.end();
  });


  nested.test('includes :: List([e0, e1, e2]).includes(e) -> bool', (assert: OBJECT) => {

    const includesList = List([1, 2, 3, 4, 5, 6]).includes(5);
    const expectIncludesList = true;
    assert.deepEqual(includesList, expectIncludesList,
      'Checks the List includes an item and returns true or false.');

    assert.end();
  });


  nested.test('indexOf :: List([e0, e1, e2]).indexOf(e) -> number', (assert: OBJECT) => {

    const indexOfList = List([1, 2, 3, 4, 5, 6]).indexOf(5);
    const expectIndexOfList = 4;
    assert.deepEqual(indexOfList, expectIndexOfList,
    'Return first index of an element in the List, or -1 if it is not present.');

    assert.end();
  });


  nested.test('insert :: List([e0, e1, e2]).insert(index, [e4, e5, e6]) -> LIST', (assert: OBJECT) => {

    const insertMultipleItems = List([1, 2, 3, 4, 5, 6]).insert(3, ['A', 'B', 'C']).data;
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert items into the List and returns a new List.');

    assert.end();
  });


  nested.test('isEmpty :: List([e0, e1, e2]).isEmpty(]) -> bool', (assert: OBJECT) => {

    const isEmptyItems = List().isEmpty();
    const expectIsEmptyItems = true;
    assert.deepEqual(isEmptyItems, expectIsEmptyItems,
      'List is empty. Returns true or false');

    const isNotEmptyItems = List([1]).isEmpty();
    const expectIsNotEmptyItems = false;
    assert.deepEqual(isNotEmptyItems, expectIsNotEmptyItems,
      'List is empty. Returns true or false');

    assert.end();
  });


  nested.test('join :: List([e0, e1, e2]).join("") -> string', (assert: OBJECT) => {

    const joinList = List([1, 2, 3, 4, 5, 6]).join(', ');
    const expectJoinList = '1, 2, 3, 4, 5, 6';
    assert.deepEqual(joinList, expectJoinList,
      'Joins all elements of the List into a string.');

    assert.end();
  });


  nested.test('keys :: List([e0, e1, e2]).keys() -> iterator', (assert: OBJECT) => {

    const keysList = List([1, 2, 3, 4, 5, 6]).keys().next();
    const expectKeysList = { value: 0, done: false };
    assert.deepEqual(keysList, expectKeysList,
      'Array Iterator that contains the keys for each index in the List.');

    assert.end();
  });


  nested.test('last :: List([e0, e1, e2]).last -> any', (assert: OBJECT) => {

    const lastList = List([1, 2, 3, 4, 5, 6]).last();
    const expectFirstList = 6;
    assert.deepEqual(lastList, expectFirstList,
      'Returns last item in the List.');

    assert.end();
  });


  nested.test('lastIndexOf :: List([e0, e1, e2]).lastIndexOf(e) -> number', (assert: OBJECT) => {

    const indexOfList = List([1, 2, 3, 4, 1]).lastIndexOf(1);
    const expectIndexOfList = 4;
    assert.deepEqual(indexOfList, expectIndexOfList,
    'Return last index of element in the List, or -1 if it is not present.');

    assert.end();
  });


  nested.test('map :: List([e0, e1, e2]).map(function (e) {}) -> LIST', (assert: OBJECT) => {

    const mapList = List([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1).data;
    const expectMapList = [2, 3, 4, 5, 6, 7];
    assert.deepEqual(mapList, expectMapList,
    'Returns a new List with the results from a provided function called on eash element.');

    assert.end();
  });


  // nested.test('maxLength :: List([e0], { size: number }) -> List', (assert: OBJECT) => {
  //   const list = List([], { size: 3 });
  //
  //   // const testThrow = (): OBJECT | string => {
  //   //   try {
  //   //     return list.push([1, 2, 3, 4]), { type: 'boolean' });
  //   //   } catch (err) {
  //   //     return err.toString();
  //   //   }
  //   // };
  //   //
  //   // const notBoolean = testThrow();
  //   // const expectNotBoolean = 'Error: Type Error: 1 is not of type boolean';
  //   // assert.deepEqual(notBoolean, expectNotBoolean,
  //   //   'Boolean List can only contain booleans.)');
  //
  //   const maxList = list.push([1, 2, 3, 4]).maxSize();
  //   const expectMax = 3;
  //   assert.deepEqual(maxList, expectMax,
  //     'Number List can only contain numbers.');
  //
  //   assert.end();
  // });


  nested.test('pop :: List([e0, e1, e2]).pop() -> LIST', (assert: OBJECT) => {

    const popItem = List([1, 2, 3, 4, 5, 6]).pop().data;
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of the List and returns a new List.');

    assert.end();
  });


  nested.test('push :: List([e0]).push(e1) | List([e0]).push([e1, e2])  -> LIST', (assert: OBJECT) => {

    const pushItem = List([1, 2, 3, 4, 5, 6]).push('otis').data;
    const expectPushItem = [1, 2, 3, 4, 5, 6, 'otis'];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of the List and returns a new List.');

    const pushMultipleItems = List([1, 2, 3, 4, 5, 6]).push(['otis', 'ania']).data;
    const expectMultiplePushItems = [1, 2, 3, 4, 5, 6, 'otis', 'ania'];
    assert.deepEqual(pushMultipleItems, expectMultiplePushItems,
      'Push an item to the end of the List and returns a new List.');

    assert.end();
  });


  nested.test('reduce :: List([e0, e1, e2]).reduce(function (prev, curr, index, array) {}) -> LIST', (assert: OBJECT) => {

    const reduceList = List([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c).data;
    const expectReduceList = 21;
    assert.deepEqual(reduceList, expectReduceList,
    'Applies a function against an accumulator and each value of the List (left-to-right). Returns a new List.');

    assert.end();
  });


  nested.test('reverse :: List([e0, e1, e2]).reverse() -> LIST', (assert: OBJECT) => {

    const reverseItem = List([1, 2, 3, 4, 5, 6]).reverse().data;
    const expectReverseItem = [6, 5, 4, 3, 2, 1];
    assert.deepEqual(reverseItem, expectReverseItem,
      'Pop an item from the end of the List and returns a new List.');

    assert.end();
  });


  nested.test('reduceRight :: List([e0, e1, e2]).reduceRight(function (prev, curr, index, array) {}) -> LIST', (assert: OBJECT) => {

    const reduceRightList = List([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c).data;
    const expectReduceRightList = 21;
    assert.deepEqual(reduceRightList, expectReduceRightList,
    'Applies a function against an accumulator and each value of the List (right-to left). Returns a new List.');

    assert.end();
  });


  nested.test('remove :: List([e0, e1, e2]).remove(n) -> LIST', (assert: OBJECT) => {

    const removeItem = List([1, 2, 3, 4, 5, 6]).remove(1).data;
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the List using it\'s index and returns a new List.');

    assert.end();

  });


  nested.test('List collcetion :: List([e0], { type: "collcetion": schema: object }) -> List', (assert: OBJECT) => {
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

    const schema = List(data, { type: 'collection', schema: schemaObj }).schema;
    const expectSchema = schema;
    assert.deepEqual(schema, expectSchema,
      'Returns Collections schema');

    assert.end();
  });


  nested.test('shift :: List([e0, e1, e2]).shift() -> LIST', (assert: OBJECT) => {

    const shiftItem = List([1, 2, 3, 4, 5, 6]).shift().data;
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of the List and returns a new List.');

    assert.end();
  });


  nested.test('size :: List().size -> number', (assert: OBJECT) => {

    const newListSize = List([1, 2, 3, 4, 5, 6]).size;
    const expectNewListSize = 6;
    assert.deepEqual(newListSize, expectNewListSize,
      'List has the correct size.');

    assert.end();
  });


  nested.test('slice :: List([e0, e1, e2]).slice(start, end) -> LIST', (assert: OBJECT) => {

    const sliceRightList = List([1, 2, 3, 4, 5, 6]).slice(1, 3).data;
    const expectSliceRightList = [2, 3];
    assert.deepEqual(sliceRightList, expectSliceRightList,
    'Returns a shallow copy of a portion of the List into a new List.');

    assert.end();
  });


  nested.test('some ::  List([e0, e1, e2]).some(function (e) {}) -> bool', (assert: OBJECT) => {

    const someList = List([11, 5, 13, 3]).some((i: any): bool => i >= 10);
    const expectSomeList = true;
    assert.deepEqual(someList, expectSomeList,
      'Tests whether some element are in the List. Returns true or false.');

    assert.end();
  });


  nested.test('sort ::  List([e0, e1, e2]).sort() | List([e0, e1, e2]).sort(function (e) {}) -> List', (assert: OBJECT) => {

    const sortList = List(['d', 'f', 'a', 'x']).sort().data;
    const expectSortList = [ 'a', 'd', 'f', 'x' ];
    assert.deepEqual(sortList, expectSortList,
      'Sorts the items elements in a List in the correct order and returns a new List.');

    assert.end();
  });


  nested.test('tail :: List([e0, e1, e2]).tail -> List', (assert: OBJECT) => {

    const tailList = List([1, 2, 3, 4, 5, 6]).tail().data;
    const expectTailList = [1, 2, 3, 4, 5];
    assert.deepEqual(tailList, expectTailList,
      'Returns a new array with all but the first element.');

    assert.end();
  });


  nested.test('toString :: List([e0, e1, e2]).toString() -> string', (assert: OBJECT) => {

    const shiftItem = List([1, 2, 3, 4, 5, 6]).toString();
    const expectShiftItem = '1,2,3,4,5,6';
    assert.deepEqual(shiftItem, expectShiftItem,
      'Returns a string representing the List.');

    assert.end();
  });


  nested.test('unshift :: List([e0, e1, e2]).unshift([e4, e5, e6]) -> LIST', (assert: OBJECT) => {

    const unshiftMultipleItems = List([1, 2, 3, 4, 5, 6]).unshift(['A', 'B', 'C']).data;
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the list and returns a new list.');

    assert.end();
  });


  nested.test('update :: List([e0, e1, e2]).update("e4", index]) -> LIST', (assert: OBJECT) => {

    const upadteItem = List([1, 2, 3, 4, 5, 6]).update(3, 'A').data;
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in the List and returns a new list.');

    assert.end();
  });

});
