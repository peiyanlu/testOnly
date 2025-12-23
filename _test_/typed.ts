type KeyOf<T> = keyof T;

type MembersType<T> = T extends Array<infer U> ? U : never;

type ToArray<T> = T extends Array<infer U> ? Array<U> : Array<T>;

type ArgType<T> = T extends (...args: infer U) => infer R ? U : never;

type ReturnTyp<T> = T extends (...args: infer A) => infer U ? U : never;

type Shift<T> = T extends [ unknown, ...args: infer U ] ? U : never;

type Pop<T> = T extends [ ...args: infer R, unknown ] ? R : never;

type FlatObjectTuple<T> = { [K in keyof T]: T[K] };

type AssertEqual<T, U> = [ T ] extends [ U ] ? ([ U ] extends [ T ] ? true : false) : false

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type NoNullAble<T> = T extends null | undefined ? never : T;


// ------------------

type A = ToArray<string>


const x = (x: string) => {
  return 'x'
}

type X = ReturnTyp<typeof x>;

const arrCc = [ 99, '99' ]
type CC = MembersType<typeof arrCc>


type TShift = Shift<[ string, number, boolean ]>
type TPop = Pop<[ string, number, boolean ]>

type Boo = AssertEqual<[ string ], [ number ]>


type Obj = { a: { b: number; c: string }, b: number };
type PartialObj = DeepPartial<Obj>;


type Aa = NoNullAble<undefined>


const acc = [ 1, 2, undefined ]
const c = acc.filter((k): k is Exclude<typeof k, undefined> => k !== undefined)
