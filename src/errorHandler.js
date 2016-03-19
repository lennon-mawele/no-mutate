'use strcit';

import { schemaValidation } from './schemaValidation';


// Flow types
type OBJECT = { [key: string]: any };


function elementTypeError (data: Array<any>, type: string) {
  const dataType = type === 'collection' ? 'object' : type;

  if (Array.isArray(data)) {
    data.forEach((i: any): void => {
      if (type !== 'any' && typeof i !== dataType) {
        throw new Error(`Type Error: ${i} is not of type ${type}`);
      }
    });
  }
}


function collectionsError (data: Array<OBJECT>, type: string, schema: OBJECT) {
  if (type === 'collection') {
    if (schema) {
      schemaValidation(data, schema);

    } else {
      throw new Error('List Collection Error: Collection must have a valid schema.');
    }
  }
}


function maxSizeError (size: number | void): string {
  if (size != null && typeof size !== 'number') {
    throw new Error('List max size Error:.');
  }
};


function typeError (type: string) {
  const types = {
    string: true,
    number: true,
    boolean: true,
    object: true,
    collection: true,
    any: true
  };

  if (!types[type] && type.toString() != null) {
    throw new Error(`List Type Error: Type ${type} is not a valid List type. Types must be string, number, boolean, date or any`);
  }
}


export function typeCheckError (args: OBJECT): void {
  const { data, type, schema, size } = args;

  if (!Array.isArray(data) && data != null) {
    throw new Error(`List Data Error: Data ${data} is not a array.`);
  }

  elementTypeError(data, type);
  typeError(type);
  collectionsError(data, type, schema);
  maxSizeError(size);
};


export function methodsError (method: string, type: string): string {
  return `${method} method is missing ${type} argument.`;
}


export function indexError (method: string): string {
  return `${method} methods index argument is not a number type.`;
}
