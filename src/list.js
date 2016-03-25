'use strict';

import { typeCheckError } from './errorHandler';
import {
  createStructure,
  transformData,
  pipeMiddleware
} from './base';
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
type OPTIONS = {
  type: ?string,
  methods: ?OBJECT,
  schema: ?OBJECT
};
type LIST = Array<any>;
type ITERATOR = { done: bool, vlaue: number };
declare function FN_BOOL(year: string): bool;
declare function FROZEN_OBJECT(data: Array<any>, opts: OPTIONS): OBJECT;


const listMethod = (data: Array<any>, options: OPTIONS): OBJECT => {
  let middleware = options.middleware;

  return {
    concat: (newData: Array<any>): LIST => {
      return createStructure(concat([transformData(data, middleware), ...newData]), options);
    },
    entries: (): ITERATOR => {
      return transformData(data, middleware).entries();
    },
    every: (fn: FN_BOOL): bool => {
      return transformData(data, middleware).every(fn);
    },
    fill: (value: any, start: number, end: number): LIST => {
      return createStructure(transformData(data, middleware).fill(value, start, end), options);
    },
    filter: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).filter(fn), options);
    },
    find: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).find(fn), options);
    },
    first: (): any => {
      return transformData(data, middleware)[0];
    },
    findIndex: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).findIndex(fn), options);
    },
    forEach: (fn: FN_BOOL) => {
      transformData(data, middleware).forEach(fn);
    },
    head: (): LIST => {
      return createStructure(transformData(data, middleware).slice(1), options);
    },
    includes: (item: any): bool => {
      return transformData(data, middleware).includes(item);
    },
    indexOf: (item: any): number => {
      return transformData(data, middleware).indexOf(item);
    },
    insert: (index: number, newData: Array<any>): LIST => {
      return createStructure(insert(index)(newData, transformData(data, middleware)), options);
    },
    isEmpty: (): bool => {
      return transformData(data, middleware).length === 0;
    },
    join: (separator: string): string => {
      return transformData(data, middleware).join(separator);
    },
    map: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).map(fn), options);
    },
    reduce: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).reduce(fn), options);
    },
    reduceRight: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).reduceRight(fn), options);
    },
    last: (): any => {
      return transformData(data, middleware)[transformData(data).length - 1];
    },
    lastIndexOf: (item: any): number => {
      return transformData(data, middleware).lastIndexOf(item);
    },
    keys: (): ITERATOR => {
      return transformData(data, middleware).keys();
    },
    pop: (): LIST => {
      return createStructure(pop(transformData(data, middleware)), options);
    },
    push: (newData: Array<any>): LIST => {
      return createStructure(push(newData)(transformData(data, middleware)), options);
    },
    remove: (newData: Array<any>): LIST => {
      return createStructure(remove(newData)(transformData(data, middleware)), options);
    },
    reverse: (): LIST => {
      return createStructure(reverse(transformData(data, middleware)), options);
    },
    shift: (): LIST => {
      return createStructure(shift(transformData(data, middleware)), options);
    },
    slice: (start: number, end: number): LIST => {
      return createStructure(transformData(data, middleware).slice(start, end), options);
    },
    some: (fn: FN_BOOL): bool => {
      return transformData(data, middleware).some(fn);
    },
    sort: (fn: FN_BOOL): LIST => {
      return createStructure(sort(transformData(data, middleware)), options);
    },
    toString: (): string => {
      return transformData(data, middleware).toString();
    },
    tail: (): LIST => {
      return createStructure(transformData(data, middleware).slice(0, transformData(data, middleware).length - 1), options);
    },
    unshift: (newData: Array<any>): LIST => {
      return createStructure(unshift(newData)(transformData(data, middleware)), options);
    },
    update: (index: number, newData: LIST): LIST => {
      return createStructure(update(index)(newData, transformData(data, middleware)), options);
    }
  };
};

// List data structures
export function List (data: Array<any>, opts: ?OPTIONS): FROZEN_OBJECT {

  const options = {
    type: opts ? opts.type || 'any' : 'any',
    methods: opts ? opts.methods || {} : {},
    size: opts ? opts.size || Infinity : Infinity,
    schema: opts ? opts.schema || null : null,
    middleware: opts ? opts.middleware || null : null
  };

  typeCheckError({ data, ...options });

  // transform data elements
  const transformDataElements = options.middleware ? pipeMiddleware(options.middleware)(data) : data || [];

  return createStructure(transformDataElements || [], Object.assign(
    {},
    options,
    { methods: { ...listMethod(transformDataElements, options), ...options.methods } }
  ));
};
