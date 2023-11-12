import { TYPE_MAP, TypeMap } from "../constants";
import { createTypeChecker } from "./createTypeChecker";

export const isCoreObjectOfType = createTypeChecker<TypeMap>(TYPE_MAP);
