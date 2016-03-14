// @flow

'use strict';

type LIST = Array<any>;
type OBJECT = { [key: string]: any };
declare function MODIFY_LIST(items: any): Array<any>;
declare function MODIFY_OBJECT(key: string, value: any): OBJECT;


// Adds items to a list
export function add (list: LIST): MODIFY_LIST {
  return (items: any): LIST => {
    if (items == null) return [...list];

    if (Array.isArray(items)) return [...list, ...items];

    return [...list, items];
  };
};


// Push alias for add
export function push (list: LIST): MODIFY_LIST {
  return (item: any) => add(list)(item);
};


// Removes items from a list
export function remove (list: LIST): MODIFY_LIST {
  return (index: number): LIST => {

    if (index == null) return [...list];

    if (index === 'last') return [...list.slice(0, list.length - 1)];

    if (index === 'first') return [...list.slice(0, 0), ...list.slice(1)];

    return [...list.slice(0, index), ...list.slice(index + 1)];
  };
};


// Pop alias for remove last
export function pop (list: LIST): MODIFY_LIST {
  return remove(list)('last');
};


// Shift alias for remove first
export function shift (list: LIST): MODIFY_LIST {
  return remove(list)('first');
};


// Inserts items from a list
export function insert (list: LIST): MODIFY_LIST {
  return (items: any, index: number): LIST => {
    if (items == null) return [...list];

    return [...list.slice(0, index), ...items, ...list.slice(index)];

  };
};


// Shift alias for remove first
export function unshift (list: LIST): MODIFY_LIST {
  return (items: any) => insert(list)(items, 0);
};


// Update an item in a list
export function update (list: LIST): MODIFY_LIST {
  return (item: any, index: number): LIST => {
    if (item == null) return [...list];

    return [...list.slice(0, index), item, ...list.slice(index + 1)];
  };
};


// Merge multiple lists
export function merge (list: LIST): MODIFY_LIST {
  return list.reduce((a: LIST, b: LIST) => a.concat(b), []);
};


// Merge objects
export function assign (obj: OBJECT): MODIFY_OBJECT {
  return (updateObj: OBJECT): OBJECT => {
    if (updateObj == null) return { ...obj };

    return {...obj, ...updateObj};
  };
};
