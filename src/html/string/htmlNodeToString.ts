import { isEventProp } from "../dom/isEventProp";
import { htmlNodesToString } from "./htmlNodesFromMultiple";
import { styleObjToString } from "./styleObjToString";
import { HtmlNode } from "./types";

export const htmlNodeToString = (node: HtmlNode): string => {
  switch (node.type) {
    case "html": {
      let s = `<${node.tag}`;

      const props: string[] = [];
      for (const [key, value] of Object.entries(node.props)) {
        if (isEventProp(key)) continue;

        const keyAlias = ATTRIBUTE_ALIASES[key];

        let v = value;

        if (key === "style") {
          v = styleObjToString(v);
        }

        props.push(`${keyAlias ?? key}="${v}"`);
      }

      if (props.length > 0) {
        s += ` ${props.join(" ")}`;
      }

      if (node.children.length > 0) {
        const childrenString = htmlNodesToString(node.children);
        s += `>${childrenString}</${node.tag}>`;
      }
      //
      else {
        s += "/>";
      }

      return s;
    }
    case "text": {
      return node.text;
    }
    case "show": {
      return htmlNodesToString(node.children);
    }
  }
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
