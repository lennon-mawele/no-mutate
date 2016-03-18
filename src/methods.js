// @flow

'use strict';

import {
  methodsError,
  indexError
} from './errorHandler';

type LIST = Array<any>;
type OBJECT = { [key: string]: any };
declare function MODIFY_LIST(items: any): Array<any>;
declare function MODIFY_OBJECT(key: string, value: any): OBJECT;


// Merge objects
export function assign (obj: OBJECT): MODIFY_OBJECT {
  const data = obj == null ? {} : obj;

  return (updateObj: OBJECT): OBJECT => {
    if (updateObj == null) return { ...data };

    return {...data, ...updateObj};
  };
};


// Concatantes multiple lists
export function concat (list: LIST): MODIFY_LIST {
  if (list == null || !Array.isArray(list)) {
    throw new Error(methodsError('concat', 'list'));
  }

  return list.reduce((a: LIST, b: LIST) => a.concat(b), []);
};


// Inserts Array Iterator key/value pairs
export function insert (index: number): MODIFY_LIST {
  if (index == null) throw new Error(methodsError('insert', 'index'));
  if (typeof index !== 'number') throw new Error(indexError('insert'));

  return (items: any, list: LIST): LIST => {
    if (list == null || !Array.isArray(list)) {
      throw new Error(methodsError('insert', 'list'));
    }

    if (items == null) throw new Error(methodsError('insert', 'items'));

    return [...list.slice(0, index), ...items, ...list.slice(index)];

  };
};


// Pop alias for remove last
export function pop (list: LIST): MODIFY_LIST {
  if (list == null || !Array.isArray(list)) {
    throw new Error(methodsError('pop', 'list'));
  }

  return [...list.slice(0, list.length - 1)];
};


// Push alias for add
export function push (items: any): MODIFY_LIST {
  if (items == null) throw new Error(methodsError('push', 'items'));

  return (list: LIST): LIST => {
    if (list == null || !Array.isArray(list)) {
      throw new Error(methodsError('push', 'list'));
    }

    if (Array.isArray(items)) return [...list, ...items];

    return [...list, items];
  };
};


// Removes items from a list
export function remove (index: number): MODIFY_LIST {
  if (index == null) throw new Error(methodsError('remove', 'index'));
  if (typeof index !== 'number') throw new Error(indexError('remove'));

  return (list: LIST): LIST => {
    if (list == null || !Array.isArray(list)) {
      throw new Error(methodsError('remove', 'list'));
    }

    return [...list.slice(0, index), ...list.slice(index + 1)];
  };
};


// Reverse a lists order
export function reverse (list: LIST): MODIFY_LIST {
  if (list == null || !Array.isArray(list)) {
    throw new Error(methodsError('reverse', 'list'));
  }

  const mapped = list.map((el: string| number) => el);
  return [...mapped.reverse()];
};


// Shift alias for remove first
export function shift (list: LIST): MODIFY_LIST {
  if (list == null || !Array.isArray(list)) {
    throw new Error(methodsError('shift', 'list'));
  }

  return [...list.slice(0, 0), ...list.slice(1)];
};


// Sort list in to order
export function sort (list: LIST): MODIFY_LIST {
  if (list == null || !Array.isArray(list)) {
    throw new Error(methodsError('sort', 'list'));
  }

  const mapped = list.map(function (el: any, i: number): OBJECT {
    return {
      index: i,
      value: typeof el === 'string' ? el.toLowerCase() : el
    };
  });

  mapped.sort(function (a: any, b: any) : number {
    return +(a.value > b.value) || +(a.value === b.value) - 1;
  });

  return mapped.map(function (el: any): Array<any> {
    return list[el.index];
  });
};


// Unshift alias for insert first
export function unshift (items: LIST): MODIFY_LIST {
  if (items == null) throw new Error(methodsError('unshift', 'items'));

  return (list: any): LIST => {
    if (list == null || !Array.isArray(list)) {
      throw new Error(methodsError('unshift', 'list'));
    }

    return insert(0)(items, list);
  };
};


// Update an item in a list
export function update (index: number): MODIFY_LIST {
  if (index == null) throw new Error(methodsError('update', 'index'));

  return (item: any, list: LIST): LIST => {
    if (list == null || !Array.isArray(list)) {
      throw new Error(methodsError('update', 'list'));
    }

    if (item == null) return [...list];

    return [...list.slice(0, index), item, ...list.slice(index + 1)];
  };
};
