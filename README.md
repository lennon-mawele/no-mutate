#No Mutate

A small library for working with immutable arrays.


#### Table of contents  

[Installation](#install)

[Methods](#methods)

[Structures](#structures)

[List](#list)  

- [Options](#list-options)
- [Methods](#list-methods)

[Stack](#stack)  

- [Options](#stack-options)
- [Methods](#stack-methods)

[Queue](#queue)  

- [Options](#queue-options)
- [Methods](#queue-methods)


<a name="methods"></a>
## Installation
From the command line run.
```
npm install --save no-mutate
```

<a name="methods"></a>
## Methods
Methods for working with arrays. The methods do not mutate the arrays.

To use methods import the methods module.
```
//ES6
import { methods } from 'no-mutate';


//ES5  
var no-mutate = require('no-mutate').default.methods;
var methods = no-mutate.no-mutate;
```


<a name="methods-concat"></a>
### concat
Concatenates multiple arrays together and returns a new array.  
```
concat([ [1, 2, 3, 4, 5, 6], ['A', 'B', 'C'] ]); [1, 2, 3, 4, 5, 6, 'A', 'B', 'C']  
//=> [1, 2, 3, 4, 5, 6, 'A', 'B', 'C']
```

<a name="methods-insert"></a>
### insert
Inserts elements into an array at a specified index and returns a new array.  
```
insert(3)('A', [1, 2, 3, 4, 5, 6],);  
//=> [1, 2, 3, 'A', 4, 5, 6]  

insert(3)(['A', 'B', 'C'], [1, 2, 3, 4, 5, 6]);  
//=> [1, 2, 3, 'A', 'B', 'C', 4, 5, 6]  

```

<a name="methods-pop"></a>
### pop
Removes the last element in a array and returns a new array.
```
pop([1, 2, 3, 4, 5, 6]);
//=> [1, 2, 3, 4, 5]
```

<a name="methods-push"></a>
### push
Adds elements to the end of an array and returns a new array.
```
push(2)([1]);
//=> [1, 2]


push([2, 3])([1]);
//=> [1, 2, 3]
```

<a name="methods-remove"></a>
### remove
Removes an element from an array at a specified index and returns a new array.
```
remove(1)([1, 2, 3, 4, 5, 6]);
//=> [1, 3, 4, 5, 6];

```

<a name="methods-reverse"></a>
### reverse
Reverses the order of elements in an array and returns a new array.
```
reverse([7, 20, 1, 91]);
//=> [91, 1, 20, 7]
```


<a name="methods-shift"></a>
### shift
Removes the first element in a array and returns a new array.
```
shift([1, 2, 3, 4, 5, 6]);
//=> [2, 3, 4, 5, 6]
```


<a name="methods-sort"></a>
### sort
Sorts the order of the element and returns a new array.
```
sort([6, 3, 1, 5, 2, 4]);
//=> [1, 2, 3, 4, 5, 6]

sort(['cherries', 'apples', 'bananas', 'pears']);
//=> ['apples', 'bananas', 'cherries', 'pears']
```

<a name="methods-unshift"></a>
### unshift
 Adds elements to the beginning of an array and returns a new array.
```
unshift('A')([1, 2, 3, 4, 5, 6])
//=> ['A', 1, 2, 3, 4, 5, 6]

unshift(['A', 'B', 'C'])([1, 2, 3, 4, 5, 6]);
//=> ['A', 'B', 'C', 1, 2, 3, 4, 5, 6]
```

<a name="methods-update"></a>
### update
Replaces an element of an array at the specified index and returns a new array.
```
update(3)('A', [1, 2, 3, 4, 5, 6]);
//=> [1, 2, 3, 'A', 5, 6]
```

<a name="structures"></a>
## Structures
Structures are wrapper around an arrays to make them immutable and contain methods for working with those arrays. As data is stored is a plain JavaScript array all of the built-in JavaScript methods can be used on it.

<hr>

<a name="list"></a>
### List
A List is used to create an immutable array where data can be added or removed anywhere in the List.

To use List import the List module.
```
// ES6
import { List } from 'no-mutate';

//ES5  
var no-mutate = require('no-mutate').default;  
var List = no-mutate.List;
```

Creates a new empty List.
```
var list = List();

```

Creates a new List with initial data.
```
var list = List([1, 2, 3, 4, 5, 6]);

```

<a name="list-options"></a>
#### List options
Lists take an object as its second argument to pass options.

##### type
The type option restricts the list to a particular data type.


Only accepts booleans.
```
var bool = List([true, false], { type: 'boolean' });
```
Only accepts numbers.
```
var num = List([1, 2], { type: 'number' });
```

Only accepts strings.
```
var str = List(['a', 'b'], { type: 'string' });
```

Only accepts objects.
```
var data = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

var obj = List(data, { type: 'object' });
```

Only accepts collections. A schema is also required. See [is-schema-valid](https://=>github.com/otissv/is-schema-valid.git) for how to create a schema.

```
var schema = {
  name    : { type: 'string', required: true },
  quantity: { type: 'number', required: true },
  country : 'string'
};

var data = [
  { name: 'apples', quantity: 2, country: 'england' },
  { name: 'bananas', quantity: 5, country: 'jamaica' },
  { name: 'cherries', quantity: 1, country: 'spain' }
];


var collection = List(data, { type: 'collection', schema });
```


##### middleware
Allows custom functions to transforms the data elements before it enters the List.
```
var middleware = [
  (x: any) => x.toUpperCase(),
  (x: any) => `${x}_VIGINIE`
];

var list = List(['otis', 'ania', 'jocelyne'], { middleware });

console.log(list.data);
//=> ['OTIS_VIGINIE', 'ANIA_VIGINIE', 'JOCELYNE_VIGINIE']
```

##### methods
Custom methods can be added to a List to extend the behaviour of the List by assigning an array of functions to the method option.

The method option merges the custom methods with the build-in methods. If the custom method has
the same name as a built-in method the custom method will overwrite the built-in one.

##### schmema
Schema option only works on collections. See List collections.


<a name="list-methods"></a>
### List Methods

#### concat
Concatenates multiple arrays together and returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]);

console.log(list.data);
//=> [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10]
```


#### data
Returns an array containing the data held within the List.
```
var data = List([1, 2, 3, 4, 5, 6]).data;

console.log(data);
//=> [1, 2, 3, 4, 5, 6]
```

#### entries
Returns an Array Iterator with key/value pairs.
```
var entries = List([1, 2, 3, 4, 5, 6]).entries();

console.log(entries.next());
//=> { done: false, value: [ 0, 1 ] }
```

#### every
Checks to see if every element in the List passes a test, specified by a function. Returns true or false.
```
var every = List([11, 12, 13]).every((i: any): bool => i >= 10);

console.log(every);
//=> true
```


#### filter
Filters items in the List specified by a function and returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4);

console.log(list.data);
//=> [4, 5, 6]
```

#### find
Finds items in the List specified by a function and returns a new List. Otherwise undefined is returned.
```
var list 5 = List([1, 120, 2, 12]).find((i: any): bool => i > 5);

console.log(list.data);
//=> 120
```


#### findIndex
Finds the index of an element in the List item and return index or -1 if it is not present.
```
var list = List([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5).data;

console.log(list.data);
//=> 4
```

#### first
Returns the first element in the List.
```
var first = List([1, 2, 3, 4, 5, 6]).first();

console.log(first);
//=> 1
```

#### forEach
Executes a provided function once per List element. Returns undefined.
```
List([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
//=> undefined
```

#### head
Returns a new Stack with all but the last element in a List.
```
var list = List([1, 2, 3, 4, 5, 6]).head();

console.log(list.data);
//=> [2, 3, 4, 5, 6]

```


#### includes
Checks to see if the List includes an element and returns true or false.
```
var includes = List([1, 2, 3, 4, 5, 6]).includes(5);

console.log(includes);
//=> true
```

#### indexOf
Return first index of an element in a List, or -1 if it is not present.
```
var fifthIndex = List([1, 2, 3, 4, 5, 6]).indexOf(5);

console.log(fifthIndex);
//=> 4
```

#### insert
Inserts elements into the List and returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).insert(3, ['A', 'B', 'C']);

console.log(list.data);
//=> [1, 2, 3, 'A', 'B', 'C', 4, 5, 6];
```

#### isEmpty
Checks to see if the List data is empty (has no elements). Returns true or false.
```
var isEmpty = List([1]).isEmpty();
console.log(isEmpty);
//=> false
```

#### join
Joins all the elements of the List into a string.
```
var str = List([1, 2, 3, 4, 5, 6]).join(', ');
console.log(str);
//=> '1, 2, 3, 4, 5, 6'
```

#### keys
Returns an Array Iterator that contains the keys for each index in the List.
```
var keys = List([1, 2, 3, 4, 5, 6]).keys();

console.log(keys).next();;
//=> { value: 0, done: false };
```

#### last
Returns last element in the List.
```
var last = List([1, 2, 3, 4, 5, 6]).last();

console.log(last);
//=> 6
```


#### lastIndexOf
Return the last index of an element in the List, or -1 if it is not present.
```
var lastIndex = List([1, 2, 3, 4, 1]).lastIndexOf(1);

console.log(lastIndex);
//=> 4
```

#### map
Returns a new List with the results from a provided function called on each element.
```
var list = List([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1);

console.log(list.data);
//=> [2, 3, 4, 5, 6, 7]
```

#### pop
Removes an element from the end of the List and returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).pop();

console.log(list.data);
//=> [1, 2, 3, 4, 5];
```

#### push
Adds elements to the end of the List and returns a new List.
```
var pushOne = List([1, 2, 3, 4, 5, 6]).push('otis');

console.log(pushOne.data);
//=>[1, 2, 3, 4, 5, 6, 'otis']

var pushMultipleItems = List([1, 2, 3, 4, 5, 6]).push(['otis', 'ania']);

console.log(pushMultipleItems.data);
//=> [1, 2, 3, 4, 5, 6, 'otis', 'ania']
```


#### reduce
Applies a function against an accumulator to each value of the List (left-to-right). Returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c);

console.log(list.data);
//=> 21
```

#### reverse
Reverse the order of elements in the List and returns a new List
```
var list = List([1, 2, 3, 4, 5, 6]).reverse();

console.log(list.data);
//=> [6, 5, 4, 3, 2, 1];
```


#### reduceRight
Applies a function against an accumulator to each value of the List (right-to left). Returns a new List.'
```
var list = List([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c);

console.log(list.data);
//=> 21
```

#### remove
Remove an element from the List using the specified index and returns a new List.
```
var list = List([1, 2, 3, 4, 5, 6]).remove(1);

console.log(list.data);
//=> [1, 3, 4, 5, 6];
```

#### shift
Remove an element from the beginning of the List and returns a new List.'
```
var list = List([1, 2, 3, 4, 5, 6]).shift();

console.log(list.data);
//=> [2, 3, 4, 5, 6]
```

#### size
Returns the the number of elements held within the List.
```
var list = List([1, 2, 3, 4, 5, 6]);

console.log(list.size);
//=> 6
```

#### slice
Returns a shallow copy of a portion of the List into a new List.
```
var list =List([1, 2, 3, 4, 5, 6]).slice(1, 3);

console.log(list.data);
//=> [2, 3]
```


#### some
Checks to see if the List has some element against a provide function. Returns true or false.
```
var some = List([11, 5, 13, 3]).some((i: any): bool => i >= 10);

console.log(some);
//=> true
```


#### sort
Sorts the elements in a List in the correct order and returns a new List.
```
var list = List(['d', 'f', 'a', 'x']).sort();

console.log(list.data);
//=> [ 'a', 'd', 'f', 'x' ]
```

#### tail
Returns a new List with all but the first element.
```
var list = List([1, 2, 3, 4, 5, 6]).tail();

console.log(list.data);
//=> 1, 2, 3, 4, 5]
```

#### toString
Returns a string representing the List.
```
var str = List([1, 2, 3, 4, 5, 6]).toString();

console.log(str);
//=> '1,2,3,4,5,6'
```

#### unshift
Adds multiple element at the beginning of the list and returns a new list.
```
var list =  List([1, 2, 3, 4, 5, 6]).unshift(['A', 'B', 'C']);

console.log(list.data);
//=> ['A', 'B', 'C', 1, 2, 3, 4, 5, 6]
```

#### update
Replaces an elemet in the List at the specified index and returns a new list.'
```
var list = List([1, 2, 3, 4, 5, 6]).update(3, 'A');

console.log(list.data);
//=> [1, 2, 3, 'A', 5, 6]
```


<hr>


<a name="stack"></a>
### Stack
A Stack is used to create an immutable array where data can only be added or removed from the front of stacks.A Stack follows the LIFO (last in first out) principle.

To use Stack import the Stack module.
```
// ES6  
import { Stack } from 'no-mutate';


//ES5  
var no-mutate = require('no-mutate').default;  
var Stack = no-mutate.Stack;
```

Creates a new empty Stack.
```
var stack = Stack();

```

Creates a new Stack with initial data.
```
var stack = Stack([1, 2, 3, 4, 5, 6]);
```

<a name="stack-options"></a>
#### Stack Options
Stack take an object as its second argument to pass options.

##### type
Only accepts booleans.
```
var bool = Stack([true, false], { type: 'boolean' });
```

Only accepts numbers.
```
var num = Stack([1, 2], { type: 'number' });
```

Only accepts Strings.
```
var str = Stack(['a', 'b'], { type: 'string' });
```

Only accepts objects.
```
var data = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

var obj = Stack(data, { type: 'object' });
```

Only accepts collections. A schema is also required. See [is-schema-valid](https://=>github.com/otissv/is-schema-valid.git) for how to create a schema.

```
var schema = {
  name    : { type: 'string', required: true },
  quantity: { type: 'number', required: true },
  country : 'string'
};

var data = [
  { name: 'apples', quantity: 2, country: 'england' },
  { name: 'bananas', quantity: 5, country: 'jamaica' },
  { name: 'cherries', quantity: 1, country: 'spain' }
];


var collection = Stack(data, { type: 'collection', schema });
```


##### middleware
Allows custom functions to transforms the data elements before it enters the Stack.
```
var middleware = [
  (x: any) => x.toUpperCase(),
  (x: any) => `${x}_VIGINIE`
];

var stack = Stack(['otis', 'ania', 'jocelyne'], { middleware });

console.log(stack.data);
//=> ['OTIS_VIGINIE', 'ANIA_VIGINIE', 'JOCELYNE_VIGINIE']
```

##### methods
Custom methods can be added to a Stack to extend the behaviour of the Stack by assigning an array of functions to the method option.

The method option merges the custom methods with the build-in methods. If the custom method has
the same name as a built-in method the custom method will overwrite the built-in one.

##### schmema
Schema option only works on collections. See Stack collections.


<a name="stack-methods"></a>
### Stack Methods

#### add
Add multiple elements at the beginning of the Stack and returns a new Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).add(['A', 'B', 'C']);

console.log(stack.data);
//=> ['A', 'B', 'C', 1, 2, 3, 4, 5, 6]
```

#### concat
Concatenates multiple arrays together and returns a new Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]);
List
console.log(stack.data);
//=> [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10]
```

#### data
Returns an array containing the data held within the Stack.
```
var data = Stack([1, 2, 3, 4, 5, 6]).data;

console.log(data);
//=> [1, 2, 3, 4, 5, 6]
```

#### entries
Returns an Array Iterator with key/value pairs.
```
var entries = Stack([1, 2, 3, 4, 5, 6]).entries();

console.log(entries.next());
//=> { done: false, value: [ 0, 1 ] }
```

#### every
Checks to see if every element in the Stack passes a test, specified by a function. Returns true or false.
```
var every = Stack([11, 12, 13]).every((i: any): bool => i >= 10);

console.log(every);
//=> true
```


#### filter
Filters items in the List specified by a function and returns a new Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4);

console.log(stack.data);
//=> [4, 5, 6]
```

#### find
Finds items in the Stack specified by a function and returns a new Stack. Otherwise undefined is returned.
```
var stack 5 = Stack([1, 120, 2, 12]).find((i: any): bool => i > 5);

console.log(stack.data);
//=> 120
```


#### findIndex
Finds the index of an element in the Stack item and return index or -1 if it is not present.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5);

console.log(stack.data);
//=> 4
```

#### first
Returns the first element in the Stack.
```
var first = Stack([1, 2, 3, 4, 5, 6]).first();

console.log(first);
//=> 1
```


#### forEach
Executes a provided function once per Stack element. Returns undefined.
```
Stack([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
//=> undefined
```

#### head
Returns a new Stack with all but the last element in a Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).head();

console.log(stack.data);
//=> [2, 3, 4, 5, 6]

```

#### includes
Checks to see if the Stack includes an element and returns true or false.
```
var includes = Stack([1, 2, 3, 4, 5, 6]).includes(5);

console.log(includes);
//=> true
```

#### indexOf
Return first index of an element in a Stack, or -1 if it is not present.
```
var fifthIndex = Stack([1, 2, 3, 4, 5, 6]).indexOf(5);

console.log(fifthIndex);
//=> 4
```


#### isEmpty
Checks to see if the Stack data is empty (has no elements). Returns true or false.
```
var isEmpty = Stack([1]).isEmpty();

console.log(isEmpty);
//=> false
```

#### join
Joins all the elements of the Stack into a string.
```
var str = Stack([1, 2, 3, 4, 5, 6]).join(', ');
console.log(str);
//=> '1, 2, 3, 4, 5, 6'
```

#### keys
Returns an Array Iterator that contains the keys for each index in the Stack.
```
var keys = Stack([1, 2, 3, 4, 5, 6]).keys();

console.log(keys).next();;
//=> { value: 0, done: false };
```

#### last
Returns last element in the Stack.
```
var last = Stack([1, 2, 3, 4, 5, 6]).last();

console.log(last);
//=> 6
```


#### lastIndexOf
Return the last index of an element in the Stack, or -1 if it is not present.
```
var lastIndex = Stack([1, 2, 3, 4, 1]).lastIndexOf(1);

console.log(lastIndex);
//=> 4
```

#### map
Returns a new Stack with the results from a provided function called on each element.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1);

console.log(stack.data);
//=> [2, 3, 4, 5, 6, 7]
```


#### reduce
Applies a function against an accumulator to each value of the Stack (left-to-right). Returns a new Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c);

console.log(stack.data);
//=> 21
```

#### reverse
Reverse the order of elements in the Stack and returns a new Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).reverse();

console.log(stack.data);
//=> [6, 5, 4, 3, 2, 1];
```


#### reduceRight
Applies a function against an accumulator to each value of the Stack (right-to left). Returns a new Stack.'
```
var stack = Stack([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c);

console.log(stack.data);
//=> 21
```

#### remove
Remove an element from the Stack using the specified index and returns a new Stack. If No index is provided the first element is removed.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).remove(1);

console.log(stack.data);
//=> [1, 3, 4, 5, 6];
```


#### size
Returns the the number of elements held within the Stack.
```
var stack = Stack([1, 2, 3, 4, 5, 6]);

console.log(stack.size);
//=> 6
```

#### some
Checks to see if the Stack has some element against a provide function. Returns true or false.
```
var some = Stack([11, 5, 13, 3]).some((i: any): bool => i >= 10);

console.log(some);
//=> true
```


#### sort
Sorts the elements in a Stack in the correct order and returns a new Stack.
```
var stack = Stack(['d', 'f', 'a', 'x']).sort();

console.log(stack.data);
//=> [ 'a', 'd', 'f', 'x' ]
```

#### tail
Returns a new Stack with all but the first element.
```
var stack = Stack([1, 2, 3, 4, 5, 6]).tail();

console.log(stack.data);
//=> 1, 2, 3, 4, 5]
```


#### toString
Returns a string representing the Stack.
```
var str = Stack([1, 2, 3, 4, 5, 6]).toString();

console.log(str);
//=> '1,2,3,4,5,6'
```


<hr>


<a name="queue"></a>
### Queue
A Queue is used to create an immutable array where data can only be added to the end and removed from the front of the Queue.A Queue follows the FIFO (first in first out) principle.

To use Queue import the Queue module.
```
// ES6  
import { Queue } from 'no-mutate';

//ES5  
var no-mutate = require('no-mutate').default;  
var Queue = no-mutate.Queue;
```

Creates a new empty Queue.
```
var stack = Queue();

```

Creates a new Queue with initial data.
```
var stack = Queue([1, 2, 3, 4, 5, 6]);
```

<a name="queue-options"></a>
#### Queue Options
Queue take an object as its second argument to pass options.

##### type
Only accepts booleans.
```
var bool = Queue([true, false], { type: 'boolean' });
```

Only accepts numbers.
```
var num = Queue([1, 2], { type: 'number' });
```

Only accepts Strings.
```
var str = Queue(['a', 'b'], { type: 'string' });
```

Only accepts objects.
```
var data = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

var obj = Queue(data, { type: 'object' });
```

Only accepts collections. A schema is also required. See [is-schema-valid](https://=>github.com/otissv/is-schema-valid.git) for how to create a schema.

```
var schema = {
  name    : { type: 'string', required: true },
  quantity: { type: 'number', required: true },
  country : 'string'
};

var data = [
  { name: 'apples', quantity: 2, country: 'england' },
  { name: 'bananas', quantity: 5, country: 'jamaica' },
  { name: 'cherries', quantity: 1, country: 'spain' }
];


var collection = Queue(data, { type: 'collection', schema });
```


##### middleware
Allows custom functions to transforms the data elements before it enters the Queue.
```
var middleware = [
  (x: any) => x.toUpperCase(),
  (x: any) => `${x}_VIGINIE`
];

var stack = Queue(['otis', 'ania', 'jocelyne'], { middleware });

console.log(stack.data);
//=> ['OTIS_VIGINIE', 'ANIA_VIGINIE', 'JOCELYNE_VIGINIE']
```

##### methods
Custom methods can be added to a Queue to extend the behaviour of the Queue by assigning an array of functions to the method option.

The method option merges the custom methods with the build-in methods. If the custom method has
the same name as a built-in method the custom method will overwrite the built-in one.

##### schmema
Schema option only works on collections. See Queue collections.


<a name="queue-methods"></a>
### Queue Methods


#### add
Adds elements to the end of the Queue and returns a new Queue.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).add(['otis', 'ania']);

console.log(queue.data);
//=> [1, 2, 3, 4, 5, 6, 'otis', 'ania']
```

#### concat
Concatenates multiple arrays together and returns a new Stack.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).concat([ ['A', 'B', 'C'], [7, 8, 9, 10] ]);
List
console.log(queue.data);
//=> [1, 2, 3, 4, 5, 6, 'A', 'B', 'C', 7, 8, 9, 10]
```

#### data
Returns an array containing the data held within the Queue.
```
var data = Queue([1, 2, 3, 4, 5, 6]).data;

console.log(data);
//=> [1, 2, 3, 4, 5, 6]
```


#### entries
Returns an Array Iterator with key/value pairs.
```
var entries = Queue([1, 2, 3, 4, 5, 6]).entries();

console.log(entries.next());
//=> { done: false, value: [ 0, 1 ] }
```

#### every
Checks to see if every element in the Queue passes a test, specified by a function. Returns true or false.
```
var every = Queue([11, 12, 13]).every((i: any): bool => i >= 10);

console.log(every);
//=> true
```


#### filter
Filters items in the List specified by a function and returns a new Queue.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).filter((i: any): bool => i >= 4);

console.log(queue.data);
//=> [4, 5, 6]
```


#### find
Finds items in the Queue specified by a function and returns a new Queue. Otherwise undefined is returned.
```
var queue 5 = Queue([1, 120, 2, 12]).find((i: any): bool => i > 5);

console.log(queue.data);
//=> 120
```


#### findIndex
Finds the index of an element in the Queue item and return index or -1 if it is not present.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).findIndex((i: any): bool => i === 5);

console.log(queue.data);
//=> 4
```

#### first
Returns the first element in the Stack.
```
var first = Queue([1, 2, 3, 4, 5, 6]).first();

console.log(first);
//=> 1
```


#### forEach
Executes a provided function once per Queue element. Returns undefined.
```
Queue([1, 2, 3, 4, 5, 6]).forEach((i: any): bool => i * 2);
//=> undefined
```

#### head
Returns a new Queue with all but the last element in a Queue.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).head();

console.log(queue.data);
//=> [2, 3, 4, 5, 6]
```

#### includes
Checks to see if the Queue includes an element and returns true or false.
```
var includes = Queue([1, 2, 3, 4, 5, 6]).includes(5);

console.log(includes);
//=> true
```

#### indexOf
Return first index of an element in a Queue, or -1 if it is not present.
```
var fifthIndex = Queue([1, 2, 3, 4, 5, 6]).indexOf(5);

console.log(fifthIndex);
//=> 4
```


#### isEmpty
Checks to see if the Queue data is empty (has no elements). Returns true or false.
```
var isEmpty = Queue([1]).isEmpty();

console.log(isEmpty);
//=> false
```


#### join
Joins all the elements of the Queue into a string.
```
var str = Queue([1, 2, 3, 4, 5, 6]).join(', ');
console.log(str);
//=> '1, 2, 3, 4, 5, 6'
```

#### keys
Returns an Array Iterator that contains the keys for each index in the Queue.
```
var keys = Queue([1, 2, 3, 4, 5, 6]).keys();

console.log(keys).next();;
//=> { value: 0, done: false };
```

#### last
Returns last element in the Queue.
```
var last = Queue([1, 2, 3, 4, 5, 6]).last();

console.log(last);
//=> 6
```


#### lastIndexOf
Return the last index of an element in the Queue, or -1 if it is not present.
```
var lastIndex = Queue([1, 2, 3, 4, 1]).lastIndexOf(1);

console.log(lastIndex);
//=> 4
```

#### map
Returns a new Queue with the results from a provided function called on each element.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).map((e: number) => e + 1);

console.log(queue.data);
//=> [2, 3, 4, 5, 6, 7]
```

#### reduce
Applies a function against an accumulator to each value of the Queue (left-to-right). Returns a new Stack.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).reduce((p: number, c: number) => p + c);

console.log(queue.data);
//=> 21
```

#### reverse
Reverse the order of elements in the Queue and returns a new Queue.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).reverse();

console.log(queue.data);
//=> [6, 5, 4, 3, 2, 1];
```


#### reduceRight
Applies a function against an accumulator to each value of the Queue (right-to left). Returns a new Queue.'
```
var queue = Queue([1, 2, 3, 4, 5, 6]).reduceRight((p: number, c: number) => p + c);

console.log(queue.data);
//=> 21
```


#### remove
Remove an element from the Stack using the specified index and returns a new Stack. If No index is provided the first element is removed.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).remove(1);

console.log(queue.data);
//=> [1, 3, 4, 5, 6];
```


#### size
Returns the the number of elements held within the Queue.
```
var queue = Queue([1, 2, 3, 4, 5, 6]);

console.log(stack.size);
//=> 6
```

#### some
Checks to see if the Queue has some element against a provide function. Returns true or false.
```
var some = Queue([11, 5, 13, 3]).some((i: any): bool => i >= 10);

console.log(some);
//=> true
```


#### sort
Sorts the elements in a Stack in the correct order and returns a new Stack.
```
var queue = Queue(['d', 'f', 'a', 'x']).sort();

console.log(queue.data);
//=> [ 'a', 'd', 'f', 'x' ]
```

#### tail
Returns a new Queue with all but the first element.
```
var queue = Queue([1, 2, 3, 4, 5, 6]).tail();

console.log(queue.data);
//=> 1, 2, 3, 4, 5]
```


#### toString
Returns a string representing the Queue.
```
var str = Queue([1, 2, 3, 4, 5, 6]).toString();

console.log(str);
//=> '1,2,3,4,5,6'
