'use strict';

import {
  errorHandler,
  sizeError
} from './errorHandler';

import {
  concat,
  insert,
  pop,
  push,
  remove,
  reverse,
  shift,
  sort,
  unshift,
  update
} from './methods';


// Flow types
type OBJECT = { [key: string]: any };
type OPTIONS = { type: ?string, methods: ?OBJECT };
declare function FROZEN_OBJECT(key: string, value: any): OBJECT;
declare function FN_BOOL(year: string): bool;
type LIST = Array<any>;


// Number List methods
const numberMethods = (list: Array<any>, type: string): OBJECT => {
  return type === 'number' ? {
    decrease: (i: number) => createList(push(list.length + (-i || -1))(list), type),
    increment: (i: number) => createList(push(list.length + (i || 1))(list), type)
  } : {};
};


// Creates a new List
const createList = (data: Array<any>, options: OPTIONS): FROZEN_OBJECT => {
  const { type, methods, size } = options;

  return Object.freeze(Object.assign(
    {},
    {
      data    : data,
      size    : data.length,
      type    : type,
      maxSize : () : 'number' => {
        sizeError(size);
        return size || Infinity;
      },

      concat: (newData: LIST) => createList(concat([data, ...newData]), { type }),
      entries: () => data.entries(),
      every: (fn: FN_BOOL): bool => data.every(fn),
      fill: (value: any, start: number, end: number) => createList(data.fill(value, start, end), { type }),
      filter: (fn: FN_BOOL) => createList(data.filter(fn), { type }),
      find: (fn: FN_BOOL) => createList(data.find(fn), { type }),
      first: () => data[0],
      findIndex: (fn: FN_BOOL) => createList(data.findIndex(fn), { type }),
      forEach: (fn: FN_BOOL) => data.forEach(fn),
      head: () => createList(data.slice(1), { type }),
      includes: (item: any) => data.includes(item),
      indexOf: (item: any) => data.indexOf(item),
      insert: (index: number, newData: LIST) => createList(insert(index)(newData, data), { type }),
      isEmpty: () => data.length === 0,
      join: (separator: string) => data.join(separator),
      map: (fn: FN_BOOL) => createList(data.map(fn), { type }),
      reduce: (fn: FN_BOOL) => createList(data.reduce(fn), { type }),
      reduceRight: (fn: FN_BOOL) => createList(data.reduceRight(fn), { type }),
      last: () => data[data.length - 1],
      lastIndexOf: (item: any) => data.lastIndexOf(item),
      keys: () => data.keys(),
      pop: () => createList(pop(data), { type }),
      push: (newData: LIST) => createList(push(newData)(data), { type }),
      remove: (newData: LIST) => createList(remove(newData)(data), { type }),
      reverse: () => createList(reverse(data), { type }),
      shift: () => createList(shift(data), { type }),
      slice: (start: number, end: number) => createList(data.slice(start, end), { type }),
      some: (fn: FN_BOOL): bool => data.some(fn),
      sort: (fn: FN_BOOL) => createList(sort(data), { type }),
      toString: (): bool => data.toString(),
      tail: () => createList(data.slice(0, data.length - 1), { type }),
      unshift: (newData: LIST) => createList(unshift(newData)(data), { type }),
      update: (index: number, newData: LIST) => createList(update(index)(newData, data), { type }),
      ...numberMethods(data, type),
      ...methods
    }
  ));
};


// List data structtures
export function Booleans (data: Array<any>, methods: OBJECT): FROZEN_OBJECT {
  const options = { type: 'boolean', methods };

  return List(data, options);
};


export function List (data: Array<any>, opts: ?OPTIONS): FROZEN_OBJECT {
  const type = opts ? opts.type || 'any' : 'any';
  const methods = opts ? opts.methods || {} : {};
  const schema = opts ? opts.schmea || null : null;
  const size = opts ? opts.size || null : null;

  errorHandler({ data, type, schema, size });

  return createList(data || [], { type, methods, size, schema });
};


export function Numbers (data: Array<any>, methods: OBJECT): FROZEN_OBJECT {
  const options = { type: 'number', methods };

  return List(data, options);
};


export function Strings (data: Array<any>, methods: OBJECT): FROZEN_OBJECT {

  const options = { type: 'string', methods };

  return List(data, options);
};
