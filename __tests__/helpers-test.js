import test from 'tape';
import deepFreeze from 'deep-freeze';

import index from '../lib';

const {
  add,
  assign,
  insert,
  merge,
  pop,
  push,
  remove,
  shift,
  unshift,
  update
} = index;

// TODO add unique

type OBJECT = { [key: string]: any };


test('Immutable Methods', (nested: OBJECT) => {

  nested.test('Adds Items:', (assert: OBJECT) => {
    const list = [1];

    deepFreeze(list);

    const noArgs = add(list)();
    const expectNoArgs = [1];
    assert.deepEqual(noArgs, expectNoArgs,
      'If no arguments simply returns a new list');


    const addToEnd = add(list)(2);
    const expectAddToEnd = [1, 2];
    assert.deepEqual(addToEnd, expectAddToEnd,
      'Adds an item to the end of a list and returns a new list');


    const addMultipleToEnd = add(list)([2, 3]);
    const expectAddMultipleToEnd = [1, 2, 3];
    assert.deepEqual(addMultipleToEnd, expectAddMultipleToEnd,
      'Adds multiple items to the end of a list and returns a new list');


    const pushItem = push(list)(2);
    const expectPushItem = [1, 2];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of a list and returns a new list');


    const pushMultiple = push(list)([2, 3]);
    const expectPushMultiple = [1, 2, 3];
    assert.deepEqual(pushMultiple, expectPushMultiple,
      'Push multiple items to the end of a list and returns a new list');


    assert.end();
  });


  nested.test('Inserts items:', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const noArgs = insert(list)();
    const expectNoArgs = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(noArgs, expectNoArgs,
      'If no arguments simply returns a new list');


    const insertItem = insert(list)('A', 3);
    const expectInsertItem = [1, 2, 3, 'A', 4, 5, 6];
    assert.deepEqual(insertItem, expectInsertItem,
      'Insert items  into a list and returns a new list');


    const insertMultipleItems = insert(list)(['A', 'B', 'C'], 3);
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert item into a list and returns a new list');


    const unshiftItem = unshift(list)('A');
    const expectUnshiftItem = ['A', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftItem, expectUnshiftItem,
      'Unshift item at begining of the list and returns a new list');


    const unshiftMultipleItems = unshift(list)(['A', 'B', 'C']);
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the list and returns a new list');


    assert.end();
  });


  nested.test('Merge lists:', (assert: OBJECT) => {
    const list1 = [1, 2, 3, 4, 5, 6];
    const list2 = ['A', 'B', 'C'];

    deepFreeze(list1);
    deepFreeze(list2);

    const mergeList = merge([list1, list2]);
    const expectMergeList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C'];
    assert.deepEqual(mergeList, expectMergeList,
      'Megre lists and returns a new list');


    assert.end();
  });


  nested.test('Removes items:', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const noArgs = remove(list)();
    const expectNoArgs = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(noArgs, expectNoArgs,
      'If no arguments simply returns a new list');


    const removeItem = remove(list)(1);
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the list and returns a new list');


    const removeLast = remove(list)('last');
    const expectRemoveLast = [1, 2, 3, 4, 5];
    assert.deepEqual(removeLast, expectRemoveLast,
      'Remove an item from the end of a list and returns a new list');


    const removeFirst = remove(list)('first');
    const expectRemoveFirst = [2, 3, 4, 5, 6];
    assert.deepEqual(removeFirst, expectRemoveFirst,
      'Remove an item from the begining of a list and returns a new list');


    const popItem = pop(list);
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of a list and returns a new list');


    const shiftItem = shift(list);
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of a list and returns a new list');


    assert.end();
  });


  nested.test('Update an item:', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const noArgs = update(list)();
    const expectNoArgs = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(noArgs, expectNoArgs,
      'If no arguments simply returns a new list');


    const upadteItem = update(list)('A', 3);
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in a list and returns a new list');


    assert.end();
  });


  nested.test('Add/replace key values:', (assert: OBJECT) => {
    const object = {x1: 1, x2: 2};

    deepFreeze(object);

    const noArgs = assign(object)();
    const expectNoArgs = {x1: 1, x2: 2};
    assert.deepEqual(noArgs, expectNoArgs,
      'If no arguments simply returns a new object');


    const upadteItem = assign(object)({x1: 3, x2: 4});
    const expectUpadteItem = {x1: 3, x2: 4};
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Merge objects and returns a new object');


    assert.end();
  });
});
