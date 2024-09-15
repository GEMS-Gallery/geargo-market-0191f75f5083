import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CarPart {
  'title' : string,
  'cpid' : string,
  'description' : string,
  'stock' : bigint,
  'imageUrl' : [] | [string],
  'price' : number,
}
export interface _SERVICE {
  'addCarPart' : ActorMethod<[CarPart], undefined>,
  'deleteCarPart' : ActorMethod<[string], boolean>,
  'getCarPart' : ActorMethod<[string], [] | [CarPart]>,
  'listCarParts' : ActorMethod<[], Array<CarPart>>,
  'updateCarPart' : ActorMethod<[CarPart], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
