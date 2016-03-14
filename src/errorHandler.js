'use strcit';

// Flow types
type OBJECT = { [key: string]: any };


export default function errorHandler (args: OBJECT): void {
  const { data, type, schema } = args;

  const types = {
    string: true,
    number: true,
    boolean: true,
    collection: true,
    any: true
  };


  if (!Array.isArray(data) && data != null) {
    throw new Error(`List Data Error: Data ${data} is not a array.`);
  }


  if (!types[type] && type != null) {

    
    throw new Error(`List Type Error: Type ${type} is not a valid List type. Types must be string, number, boolean, date or any`);
  }


  if (Array.isArray(data)) {
    data.forEach((i: any): void => {
      if (type !== 'any' && typeof i !== type) throw new Error(`Type Error: ${i} is not of type ${type}`);
    });
  }


  if (type === 'collection' && schema == null) {
    throw new Error('List Collection Error: Collection must have a valid schema.');
  }
};
