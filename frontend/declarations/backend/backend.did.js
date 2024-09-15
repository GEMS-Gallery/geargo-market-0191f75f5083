export const idlFactory = ({ IDL }) => {
  const CarPart = IDL.Record({
    'title' : IDL.Text,
    'cpid' : IDL.Text,
    'description' : IDL.Text,
    'stock' : IDL.Nat,
    'imageUrl' : IDL.Opt(IDL.Text),
    'price' : IDL.Float64,
  });
  return IDL.Service({
    'addCarPart' : IDL.Func([CarPart], [], []),
    'deleteCarPart' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getCarPart' : IDL.Func([IDL.Text], [IDL.Opt(CarPart)], ['query']),
    'listCarParts' : IDL.Func([], [IDL.Vec(CarPart)], ['query']),
    'updateCarPart' : IDL.Func([CarPart], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
