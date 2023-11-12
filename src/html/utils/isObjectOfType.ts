import { createTypeChecker } from "../../core";
import { TYPE_MAP, TypeMap } from "../constants";

export const isObjectOfType = createTypeChecker<TypeMap>(TYPE_MAP);
