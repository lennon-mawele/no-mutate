import test from 'tape';
import deepFreeze from 'deep-freeze';

import index from '../lib';

const {
  assign,
  concat,
  insert,
  pop,
  push,
  remove,
  shift,
  sort,
  reverse,
  unshift,
  update
} = index;

// TODO add unique

type OBJECT = { [key: string]: any };

test.skip('Immutable Methods', (nested: OBJECT) => {

  nested.test('Add/replace key values :: assign({k1: v1, k2: v2)({k1: u1)', (assert: OBJECT) => {
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


  nested.test('Concate lists :: concat([ [el0], [el1, el2] ]) -> array', (assert: OBJECT) => {
    const list1 = [1, 2, 3, 4, 5, 6];
    const list2 = ['A', 'B', 'C'];

    deepFreeze(list1);
    deepFreeze(list2);


    const listThrow = (): OBJECT | string => {
      try {
        return concat();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: concat method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');

    const concatList = concat([list1, list2]);
    const expectConcatList = [1, 2, 3, 4, 5, 6, 'A', 'B', 'C'];
    assert.deepEqual(concatList, expectConcatList,
      'Concat lists and returns a new list');

    assert.end();
  });


  nested.test('Inserts items :: insert([i0])(i1, indx) | insert([i0])([i1, i2], indx) -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const indexThrow = (): OBJECT | string => {
      try {
        return insert();
      } catch (err) {
        return err.toString();
      }
    };

    const noIndex = indexThrow();
    const expectNoIndex = 'Error: insert method is missing index argument.';
    assert.deepEqual(noIndex, expectNoIndex,
      'If no index throw error');


    const notNumberThrow = (): OBJECT | string => {
      try {
        return insert('3');
      } catch (err) {
        return err.toString();
      }
    };

    const notNumber = notNumberThrow();
    const expectNotNumber = 'Error: insert methods index argument is not a number type.';
    assert.deepEqual(notNumber, expectNotNumber,
      'If no index throw error');


    const insertItem = insert(3)('A', list);
    const expectInsertItem = [1, 2, 3, 'A', 4, 5, 6];
    assert.deepEqual(insertItem, expectInsertItem,
      'Insert items  into a list and returns a new list');


    const insertMultipleItems = insert(3)(['A', 'B', 'C'], list);
    const expectInsertMultipleItems = [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
    assert.deepEqual(insertMultipleItems, expectInsertMultipleItems,
      'Insert item into a list and returns a new list');

    assert.end();
  });


  nested.test('Pop items :: pop([e0, e1]) -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);


    const listThrow = (): OBJECT | string => {
      try {
        return pop();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: pop method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');


    const popItem = pop(list);
    const expectPopItem = [1, 2, 3, 4, 5];
    assert.deepEqual(popItem, expectPopItem,
      'Pop an item from the end of a list and returns a new list');

    assert.end();
  });


  nested.test('Push Items :: push([el0])(el) | push([el0])([el1, el1]) -> array', (assert: OBJECT) => {
    const list = [1];

    deepFreeze(list);

    const itemsThrow = (): OBJECT | string => {
      try {
        return push();
      } catch (err) {
        return err.toString();
      }
    };

    const noItems = itemsThrow();
    const expectNoItems = 'Error: push method is missing items argument.';
    assert.deepEqual(noItems, expectNoItems,
      'If no items throw error');


    const listThrow = (): OBJECT | string => {
      try {
        return push(2)();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: push method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');

    const pushItem = push(2)(list);
    const expectPushItem = [1, 2];
    assert.deepEqual(pushItem, expectPushItem,
      'Push an item to the end of a list and returns a new list');


    const pushMultiple = push([2, 3])(list);
    const expectPushMultiple = [1, 2, 3];
    assert.deepEqual(pushMultiple, expectPushMultiple,
    'Push multiple items to the end of a list and returns a new list');

    assert.end();
  });


  nested.test('Removes items :: remove([e0, e1])(e1) | remove([e0, e1])("first") | remove([e0, e1])("last") -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const indexThrow = (): OBJECT | string => {
      try {
        return remove();
      } catch (err) {
        return err.toString();
      }
    };

    const noIndex = indexThrow();
    const expectNoIndex = 'Error: remove method is missing index argument.';
    assert.deepEqual(noIndex, expectNoIndex,
      'If no index throw error');


    const notNumberThrow = (): OBJECT | string => {
      try {
        return remove('3');
      } catch (err) {
        return err.toString();
      }
    };

    const notNumber = notNumberThrow();
    const expectNotNumber = 'Error: remove methods index argument is not a number type.';
    assert.deepEqual(notNumber, expectNotNumber,
      'If no index throw error');


    const listThrow = (): OBJECT | string => {
      try {
        return remove(2)();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: remove method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');


    const removeItem = remove(1)(list);
    const expectRemoveItem = [1, 3, 4, 5, 6];
    assert.deepEqual(removeItem, expectRemoveItem,
      'Remove an item from the list and returns a new list');


    assert.end();
  });


  nested.test('Reverse an item :: reverse([e1, e2]) -> array', (assert: OBJECT) => {
    const numberslist = [7, 20, 1, 91];
    const stringsList = ['cherries', 'apples', 'bananas', 'pears'];

    deepFreeze(numberslist);
    deepFreeze(stringsList);


    const listThrow = (): OBJECT | string => {
      try {
        return reverse();
      } catch (err) {
        return err.toString();
      }
    };

    const noItems = listThrow();
    const expectNoItems = 'Error: reverse method is missing list argument.';
    assert.deepEqual(noItems, expectNoItems,
      'If no items throw error');


    const reverseNumberItem = reverse(numberslist);
    const expectReverseNumberItem = [91, 1, 20, 7];
    assert.deepEqual(reverseNumberItem, expectReverseNumberItem,
      'Reverse the the order of a list and returns a new list');


    const reverseStringItem = reverse(stringsList);
    const expectReverseStringItem = ['pears', 'bananas', 'apples', 'cherries'];
    assert.deepEqual(reverseStringItem, expectReverseStringItem,
      'Reverse the the order of a list and returns a new list');

    assert.end();
  });


  nested.test('Shift items :: shift([e0, e1]) -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const listThrow = (): OBJECT | string => {
      try {
        return shift();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: shift method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');

    const shiftItem = shift(list);
    const expectShiftItem = [2, 3, 4, 5, 6];
    assert.deepEqual(shiftItem, expectShiftItem,
      'Shift an item from the begining of a list and returns a new list');

    assert.end();
  });


  nested.test('Sort items :: sort([e0, e1]) -> array', (assert: OBJECT) => {
    const numbersList = [6, 3, 1, 5, 2, 4];
    const stringList = ['cherries', 'apples', 'bananas', 'pears'];

    deepFreeze(numbersList);
    deepFreeze(stringList);


    const listThrow = (): OBJECT | string => {
      try {
        return sort();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: sort method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');


    const sortNumbersItem = sort(numbersList);
    const expectSortNumbersItem = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(sortNumbersItem, expectSortNumbersItem,
      'Sorts numbers in a List correctly and returns a new List');


    const sortStringsItem = sort(stringList);
    const expectSortStringsItem = ['apples', 'bananas', 'cherries', 'pears'];
    assert.deepEqual(sortStringsItem, expectSortStringsItem,
      'Sorts strings in a List correctly and returns a new List');

    assert.end();
  });


  nested.test('Unshift items :: unshift([i0])(i1, indx) | unshift([i0])([i1, i2], indx) -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const itemsThrow = (): OBJECT | string => {
      try {
        return unshift();
      } catch (err) {
        return err.toString();
      }
    };

    const noItems = itemsThrow();
    const expectNoItems = 'Error: unshift method is missing items argument.';
    assert.deepEqual(noItems, expectNoItems,
      'If no arguments throw error');


    const listThrow = (): OBJECT | string => {
      try {
        return unshift('A')();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: unshift method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');


    const unshiftItem = unshift('A')(list);
    const expectUnshiftItem = ['A', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftItem, expectUnshiftItem,
      'Unshift item at begining of the list and returns a new list');


    const unshiftMultipleItems = unshift(['A', 'B', 'C'])(list);
    const expectUnshiftMultipletems = ['A', 'B', 'C', 1, 2, 3, 4, 5, 6];
    assert.deepEqual(unshiftMultipleItems, expectUnshiftMultipletems,
      'Unshift multiple items at begining of the list and returns a new list');

    assert.end();
  });


  nested.test('Update an item :: update([e1, e2])(u1, indx) -> array', (assert: OBJECT) => {
    const list = [1, 2, 3, 4, 5, 6];

    deepFreeze(list);

    const indexThrow = (): OBJECT | string => {
      try {
        return update();
      } catch (err) {
        return err.toString();
      }
    };

    const noIndex = indexThrow();
    const expectNoIndex = 'Error: update method is missing index argument.';
    assert.deepEqual(noIndex, expectNoIndex,
      'If no items throw error');


    const listThrow = (): OBJECT | string => {
      try {
        return update(2)();
      } catch (err) {
        return err.toString();
      }
    };

    const noList = listThrow();
    const expectNoList = 'Error: update method is missing list argument.';
    assert.deepEqual(noList, expectNoList,
      'If no list throw error');


    const upadteItem = update(3)('A', list);
    const expectUpadteItem = [1, 2, 3, 'A', 5, 6];
    assert.deepEqual(upadteItem, expectUpadteItem,
      'Update an item in a list and returns a new list');

    assert.end();
  });
});
