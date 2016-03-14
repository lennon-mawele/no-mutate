

'use strict';

import errorHandler from './errorHandler';
import {
  add,
  insert,
  merge,
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
      data   : data,
      size   : data.length,
      add    : (newData: Array<any>) => createList(add(data)(newData), { type }),
      insert : (newData: Array<any>, index: number) => createList(insert(data)(newData, index), { type }),
      merge  : (newData: Array<any>) => createList(merge([data, ...newData]), { type }),
      pop    : () => createList(pop(data), { type }),
      push   : (newData: Array<any>) => createList(push(data)(newData), { type }),
      remove : (newData: Array<any>) => createList(remove(data)(newData), { type }),
      shift  : () => createList(shift(data), { type }),
      unshift: (newData: Array<any>) => createList(unshift(data)(newData), { type }),
      update : (newData: Array<any>, index: number) => createList(update(data)(newData, index), { type }),
      type   : type,
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
