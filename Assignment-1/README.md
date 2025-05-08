# ❓ What are some differences between interfaces and types in TypeScript?

🟢 In TS, both interface and type are used to define and allow a solid Shaped for objects , Variable and function , but they differ in flexibility and usage. 


## 👉Type Examples

```javascript
//Object type
 type Car = {
  brand: string;
  year: number;
};

//function typed
type SetPoint = (x: number, y: number) => void;

//primitaative type
type Nullish = null | undefined;
type Fruit = 'apple' | 'pear' | 'orange';
type Num = number | bigint;
```
## 👉Interface Examples

```javascript
 interface Person {
  name: string;
  age: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

# 📌Difference

## `Type`

 - type can describe more complex things (like union or intersection types).
 - more easy to use
 - Easy syntax
 - type supports Any Type, Built-In Type, and User-Defined Type
 - Uses Type Keyword
 - Two types with the same name raise an exception.
 - Easy to transforming multiple types into a single generic type.
 - class can't extend type
 - Types can extend interfaces using intersection types (&), but cannot extend classes.
 ### 👉 Code Example
```ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
```

 - Types can represent primitive values, tuples, and mapped types.

### 👉 Code Example
```ts
//mapped wayd
 type User = {
  name: string;
  age: number;
};

type OptionalUser = {
  [K in keyof User]: User[K];
};


//tupleed way
type UserTuple = [string, number, boolean];

const user: UserTuple = ["Bob", 25, true]; // [name, age, isActive]

```
## `interface`
- Interfaces are used to define the structure of objects
- interface is useful for class structures
- can be extended but Difference in syntax
- Union , intersection is not allowed
- An interface can Defined multiple times (for merging) 
### 👉 Code Example
```ts
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```
- class can implements interfaces
- type can extends interface
- Can't be mapped over with mapped types/interface
- less flexible 

 

# ❓ What is the use of the keyof keyword in TypeScript? Provide an example.

🟢 `keyof` is a unique feature to extra keys from a type object as union with string based keys name.Its mainly use to get keys from type/interface

## 👉 Code Example

```ts
const getData = <T, U extends keyof T>(data: T, key: U): T[U] => {
        return data[key];
    };
    type Person = {
        name: string;
        age: number;
        email: string;
    };
    const person: Person = {
        name: "John",
        age: 30,
        email: "a@b.com",
    };
    type Keys = keyof Person;
    let key: Keys = "name";

    console.log(getData(person, key)); // John
    key = "age";
    console.log(getData(person, key)); // 30
    key = "email";
    console.log(getData(person, key)); // a@b.com 
```    

# ❓ Explain the difference between any, unknown, and never types in TypeScript.

### `any`
🟢 any removes type system and act like pure javascript. A varaibles that decalared with any type and can hold any type of value.Also you can perform any types of operation in ts without compilnig Error.Its not recommended to use.
### 👉 Code Example
```ts
    let flexibleVar: any = 123;
    flexibleVar = "Hello World"; 
    flexibleVar.toUpperCase();
 ```   
### `unknown`
It represents a value whose type is not known at compile time but its maintain type safety.It works like any + type security. Before using unknown type operation , first you have to ensure the  specific type using assertion or type gaurd , typeof ,
or checking method . Its useful for dealing with external unknown data or API.
### 👉 Code Example
```ts
let value: unknown = "hello";
// value.toUpperCase(); // ❌ Error

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe after check
}
```
### `never`
It represents a type that never occurs. Generally never use in functions as a never return type for throwing new Error.It opposites of any type that doesn't take anything.
### 👉 Code Example
```ts
 function error(message: string): never {
        throw new Error(message);
    }
```    

# ❓ What is the use of enums in TypeScript? Provide an example of a numeric and string enum.

🟢 In TS , we get enum features as  define a set of values with constant .It gives the the power of readability  and reusability of our code.There are two types of enum.

- numeric enum
- string enum

## `numeric enum`
Set of string values with number data
### 👉 Code Example

```ts
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400,
}

let requestStatus: StatusCodes = StatusCodes.Success;
console.log(requestStatus); // Output: 200


//auto set number Up = 0 to Right = 3
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```
## `string enum`
Set of string keys with string value
### 👉 Code Example
```ts
enum LogLevel {
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
  Debug = "DEBUG",
}

let currentLogLevel: LogLevel = LogLevel.Error;
console.log(currentLogLevel); // Output: "ERROR"
```

# ❓ What is type inference in TypeScript? Why is it helpful?



🟢 Type inference is a feature in TypeScript where the compiler automatically determines the type of a variable, parameter, or return value based on the value we assigned before or returned of a function.

You don’t always need to explicitly write types because TypeScript can “guess” them for us.

## Usecase 
✅ Less Code:We don't need to specify each type for each varaibles,parameter etc.

✅ Readability: Makes Our code more clean and readability.

✅ Type Safety: Even though we don't decalare types , TS can auto complies the extact types and checks for error.

✅ Smart Suggestions: Editors like VS Code give better autocomplete and error checking based on inferred types.

# How does TypeScript help in improving code quality and project maintainability?



TypeScript significantly improves code quality and project maintainability in several key ways:

##  ✅ Static Type Checking
TypeScript checks our code before runtime.It can help to finding bugs easily at our development time.
It can easily catches errors like:
### 👉 Code Example
```ts
let age: number = "25"; // ❌ Error: Type 'string' is not assignable to type 'number'
```
## ✅ Auto Type Guess
TypeScript can easily get the types of a varaibles with out specifying type using `inference`
### 👉 Code Example
```ts
let message = "Hello, world!"; // inferred as string
```

## ✅  Autocompletion & IntelliSense
Editors like VS Code provide smart suggestions and documentation based on types. This speeds up development and reduces human error.

## ✅ Better Documentation
Types act as self-documenting of our code.It easily recognizedas showing the types,parameter,object structure, returned value and so on:
### 👉 Code Example
```ts
function getUser(id: number): User { ... }
```

## ✅  Large Project Scaling
In bigger codebases:

- Clear type contracts between teams/modules
- Prevents unintended changes and misuse
- Makes onboarding new developers easier
- Easy to added new feature 
- Easy to Debug 
- Easy to Test

## ✅ Supports Modern JavaScript
TypeScript supports ES6+ features and compiles them down for older version and making your code future-proof.