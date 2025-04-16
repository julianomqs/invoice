import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { uuidValidateV7 } from "../util/util";

const useSubrecord = <T extends { id: string }, X = Omit<T, "id">, Y = T>(
  originalSubrecords: T[] = [],
  {
    createMapFn = (v) => v as unknown as X,
    updateMapFn = (v) => v as unknown as Y
  }: {
    createMapFn?: (v: Omit<T, "id">) => X;
    updateMapFn?: (v: T) => Y;
  } = {}
): [
  T[],
  Dispatch<SetStateAction<T[]>>,
  () => X[],
  () => Y[],
  () => string[]
] => {
  const [subrecords, setSubrecords] = useState<T[]>([]);
  const originalSubrecordsString = JSON.stringify(originalSubrecords);

  useEffect(() => {
    setSubrecords(originalSubrecords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalSubrecordsString]);

  return [
    subrecords,
    setSubrecords,
    () =>
      subrecords
        .filter((sr) => uuidValidateV7(sr.id))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ id, ...sr }) => ({ ...sr }))
        .map(createMapFn),
    () => subrecords.filter((sr) => !uuidValidateV7(sr.id)).map(updateMapFn),
    () =>
      originalSubrecords
        .filter((sr) => subrecords.every((srr) => srr.id !== sr.id))
        .map((v) => v.id)
  ];
};

export default useSubrecord;
