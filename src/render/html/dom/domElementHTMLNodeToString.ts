import { htmlNodesToString } from "../htmlNodesToString";
import { DOMElementHTMLNode } from "../types";

export const domElementHTMLNodeToString = (node: DOMElementHTMLNode) => {
  let s = `<${node.tag}`;

  const props: string[] = [];
  for (const [key, value] of Object.entries(node.props)) {
    const keyAlias = ATTRIBUTE_ALIASES[key];

    props.push(`${keyAlias ?? key}="${value}"`);
  }

  if (props.length > 0) {
    s += ` ${props.join(" ")}`;
  }

  if (node.children.length > 0) {
    const childrenString = htmlNodesToString(...node.children);
    s += `>${childrenString}</${node.tag}>`;
  }
  //
  else {
    s += "/>";
  }

  return s;
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
