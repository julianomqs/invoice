import { validate as uuidValidate, version as uuidVersion } from "uuid";

export const uuidValidateV7 = (uuid: string) =>
  uuidValidate(uuid) && uuidVersion(uuid) === 7;
