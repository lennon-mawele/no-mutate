'use strict';

import { typeCheckError } from './errorHandler';

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
type ITERATOR = { done: bool, vlaue: number };
type LIST = Array<any>;
declare function FROZEN_OBJECT(key: string, value: any): OBJECT;
declare function FN_BOOL(year: string): bool;
declare function FN_LIST(data: Array<any>): LIST;


declare function MIDDLEWARE(value: any): bool;
function transform (middleWare: Array<any>): FN_LIST {
  return function (data: Array<any>): Array<any> {

    const reducer = (value: any, fn: MIDDLEWARE): any => {
      if (Array.isArray(value)) {
        return value.map((el: any) => fn(el));
      } else {
        return fn(value);
      }
    };

    const pipe = (fns: Array<any>) => (current: any) => fns.reduce(reducer, current);

    return pipe(middleWare)(data);
  };
}


// Number List methods
function numberMethods (list: Array<any>, options: OPTIONS): OBJECT {
  return options.type === 'number' ? {
    decrease: (i: number) => createList(push(list.length + (-i || -1))(list), options),
    increment: (i: number) => createList(push(list.length + (i || 1))(list), options)
  } : {};
};


// Creates a new List
function createList (data: Array<any>, options: OPTIONS): FROZEN_OBJECT {
  const { type, middleWare, methods, schema, size } = options;

  function transformData (): Array<any> {
    return middleWare ? transform(middleWare)(data) : data;
  }

  // return new List
  return Object.freeze(Object.assign(
    {},
    {
      data      : data,
      size      : data.length,
      type      : type,
      maxSize   : size,
      schema    : schema,

      concat: (newData: Array<any>): LIST => {
        return createList(concat([transformData(data), ...newData]), options);
      },
      entries: (): ITERATOR => {
        return transformData(data).entries();
      },
      every: (fn: FN_BOOL): bool => {
        return transformData(data).every(fn);
      },
      fill: (value: any, start: number, end: number): LIST => {
        return createList(transformData(data).fill(value, start, end), options);
      },
      filter: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).filter(fn), options);
      },
      find: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).find(fn), options);
      },
      first: (): any => {
        return transformData(data)[0];
      },
      findIndex: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).findIndex(fn), options);
      },
      forEach: (fn: FN_BOOL) => {
        transformData(data).forEach(fn);
      },
      head: (): LIST => {
        return createList(transformData(data).slice(1), options);
      },
      includes: (item: any): bool => {
        return transformData(data).includes(item);
      },
      indexOf: (item: any): number => {
        return transformData(data).indexOf(item);
      },
      insert: (index: number, newData: Array<any>): LIST => {
        return createList(insert(index)(newData, transformData(data)), options);
      },
      isEmpty: (): bool => {
        return transformData(data).length === 0;
      },
      join: (separator: string): string => {
        return transformData(data).join(separator);
      },
      map: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).map(fn), options);
      },
      reduce: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).reduce(fn), options);
      },
      reduceRight: (fn: FN_BOOL): LIST => {
        return createList(transformData(data).reduceRight(fn), options);
      },
      last: (): any => {
        return transformData(data)[transformData(data).length - 1];
      },
      lastIndexOf: (item: any): number => {
        return transformData(data).lastIndexOf(item);
      },
      keys: (): ITERATOR => {
        return transformData(data).keys();
      },
      pop: (): LIST => {
        return createList(pop(transformData(data)), options);
      },
      push: (newData: Array<any>): LIST => {
        return createList(push(newData)(transformData(data)), options);
      },
      remove: (newData: Array<any>): LIST => {
        return createList(remove(newData)(transformData(data)), options);
      },
      reverse: (): LIST => {
        return createList(reverse(transformData(data)), options);
      },
      shift: (): LIST => {
        return createList(shift(transformData(data)), options);
      },
      slice: (start: number, end: number): LIST => {
        return createList(transformData(data).slice(start, end), options);
      },
      some: (fn: FN_BOOL): bool => {
        return transformData(data).some(fn);
      },
      sort: (fn: FN_BOOL): LIST => {
        return createList(sort(transformData(data)), options);
      },
      toString: (): string => {
        return transformData(data).toString();
      },
      tail: (): LIST => {
        return createList(transformData(data).slice(0, transformData(data).length - 1), options);
      },
      unshift: (newData: Array<any>): LIST => {
        return createList(unshift(newData)(transformData(data)), options);
      },
      update: (index: number, newData: LIST): LIST => {
        return createList(update(index)(newData, transformData(data)), options);
      },
      ...numberMethods(transformData(data), options),
      ...methods
    }
  ));
};


// List data structures
export default function Stack (data: Array<any>, opts: ?OPTIONS): FROZEN_OBJECT {
  const type = opts ? opts.type || 'any' : 'any';
  const methods = opts ? opts.methods || {} : {};
  const size = opts ? opts.size || Infinity : Infinity;
  const schema = opts ? opts.schema || null : null;
  const middleWare = opts ? opts.middleWare || null : null;


  typeCheckError({ data, type, schema, size });

  // transform data elements
  const transformData = middleWare ? transform(middleWare)(data) : data;

  return createList(transformData || [], { type, middleWare, methods, size, schema });
};
