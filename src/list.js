

'use strict';

import errorHandler from './errorHandler';
import {
  add,
  concat,
  insert,
  pop,
  push,
  remove,
  shift,
  unshift,
  update
} from './helpers';


// Flow types
type OBJECT = { [key: string]: any };
type OPTIONS = { type: ?string, methods: ?OBJECT };
declare function FROZEN_OBJECT(key: string, value: any): OBJECT;
declare function FN_BOOL(year: string): bool;
type LIST = Array<any>;


// Number List methods
const numberMethods = (data: Array<any>, type: string): OBJECT => {
  return type === 'number' ? {
    decrease: (i: number) => createList(push(data)(data.length + (-i || -1)), type),
    increment: (i: number) => createList(push(data)(data.length + (i || 1)), type)
  } : {};
};


// Creates a new List
const createList = (data: Array<any>, options: OPTIONS): FROZEN_OBJECT => {
  const { type, methods } = options;

  return Object.freeze(Object.assign(
    {},
    {
      data    : data,
      size    : data.length,
      type    : type,

      add: (newData: LIST) => createList(add(data)(newData), { type }),

      concat: (newData: LIST) => createList(concat([data, ...newData]), { type }),

      entries: () => data.entries(),

      every: (fn: FN_BOOL): bool => data.every(fn),

      fill: (value: any, start: number, end: number) => createList(data.fill(value, start, end), { type }),

      filter: (fn: FN_BOOL) => createList(data.filter(fn), { type }),

      find: (fn: FN_BOOL) => createList(data.find(fn), { type }),

      findIndex: (fn: FN_BOOL) => createList(data.findIndex(fn), { type }),

      forEach: (fn: FN_BOOL) => data.forEach(fn),

      includes: (item: any) => data.includes(item),

      indexOf: (item: any) => data.indexOf(item),

      insert: (newData: LIST, index: number) => createList(insert(data)(newData, index), { type }),

      pop: () => createList(pop(data), { type }),

      push: (newData: LIST) => createList(push(data)(newData), { type }),

      remove: (newData: LIST) => createList(remove(data)(newData), { type }),

      shift: () => createList(shift(data), { type }),

      unshift: (newData: LIST) => createList(unshift(data)(newData), { type }),

      update: (newData: LIST, index: number) => createList(update(data)(newData, index), { type }),

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

  errorHandler({ data, type, schema });

  return createList(data || [], { type, methods, schema });
};


export function Numbers (data: Array<any>, methods: OBJECT): FROZEN_OBJECT {
  const options = { type: 'number', methods };

  return List(data, options);
};


export function Strings (data: Array<any>, methods: OBJECT): FROZEN_OBJECT {
  const options = { type: 'string', methods };

  return List(data, options);
};
