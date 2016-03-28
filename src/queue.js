'use strict';

import { typeCheckError } from './errorHandler';
import {
  createStructure,
  transformData,
  pipeMiddleware
} from './base';
import {
  concat,
  reverse,
  push,
  remove,
  sort
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
    add: (newData: Array<any>): LIST => {
      return createStructure(push(newData)(transformData(data, middleware)), options);
    },
    concat: (newData: Array<any>): LIST => {
      return createStructure(concat([transformData(data, middleware), ...newData]), options);
    },
    entries: (): ITERATOR => {
      return transformData(data, middleware).entries();
    },
    every: (fn: FN_BOOL): bool => {
      return transformData(data, middleware).every(fn);
    },
    filter: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).filter(fn), options);
    },
    find: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).find(fn), options);
    },
    findIndex: (fn: FN_BOOL): LIST => {
      return createStructure(transformData(data, middleware).findIndex(fn), options);
    },
    first: (): any => {
      return transformData(data, middleware)[0];
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
    remove: (): LIST => {
      return createStructure(remove(0)(transformData(data, middleware)), options);
    },
    reverse: (): LIST => {
      return createStructure(reverse(transformData(data, middleware)), options);
    },
    some: (fn: FN_BOOL): bool => {
      return transformData(data, middleware).some(fn);
    },
    sort: (fn: FN_BOOL): LIST => {
      return createStructure(sort(transformData(data, middleware)), options);
    },
    toString: (): string => {
      return transformData(data, middleware).toString();
    }
  };
};

// Queue data structures
export default function Queue (data: Array<any>, opts: ?OPTIONS): FROZEN_OBJECT {

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
