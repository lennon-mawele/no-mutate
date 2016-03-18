'use strcit';

// Flow types
type OBJECT = { [key: string]: any };


function typeError (type: string) {
  const types = {
    string: true,
    number: true,
    boolean: true,
    collection: true,
    any: true
  };

  if (!types[type] && type != null) {
    throw new Error(`List Type Error: Type ${type} is not a valid List type. Types must be string, number, boolean, date or any`);
  }
}

function arrayError (data: Array<any>, type: string) {
  if (Array.isArray(data)) {
    data.forEach((i: any): void => {
      if (type !== 'any' && typeof i !== type) throw new Error(`Type Error: ${i} is not of type ${type}`);
    });
  }
}

function collectiosError (type: string, schema: OBJECT) {
  if (type === 'collection' && schema == null) {
    throw new Error('List Collection Error: Collection must have a valid schema.');
  }
}

export function typeCheckError (args: OBJECT): void {
  const { data, type, schema } = args;

  if (!Array.isArray(data) && data != null) {
    throw new Error(`List Data Error: Data ${data} is not a array.`);
  }

  arrayError(data, type);
  typeError(type);
  collectiosError(type, schema);
};


export function methodsError (method: string, type: string): string {
  return `${method} method is missing ${type} argument.`;
}


export function indexError (method: string): string {
  return `${method} methods index argument is not a number type.`;
}


export function sizeError (size: number | void): string {
  if (size != null && typeof size !== 'number') {
    throw new Error('List max size Error:.');
  }
};
