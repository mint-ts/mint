import {
  HTMLAnchorElementProps,
  HTMLButtonElementProps,
  HTMLDivElementProps,
  HTMLFormElementProps,
  HTMLHeaderElementProps,
  HTMLHeadingElementProps,
  HTMLInputElementProps,
  HTMLLIElementProps,
  HTMLLabelElementProps,
  HTMLOptionElementProps,
  HTMLSelectElementProps,
  HTMLTextAreaProps,
  HTMLUListElementProps,
} from "./html";

export type HTMLElementPropMap = {
  div: HTMLDivElementProps;
  button: HTMLButtonElementProps;
  ul: HTMLUListElementProps;
  li: HTMLLIElementProps;
  h1: HTMLHeadingElementProps;
  h2: HTMLHeadingElementProps;
  h3: HTMLHeadingElementProps;
  h4: HTMLHeadingElementProps;
  h5: HTMLHeadingElementProps;
  h6: HTMLHeadingElementProps;
  form: HTMLFormElementProps;
  input: HTMLInputElementProps;
  label: HTMLLabelElementProps;
  header: HTMLHeaderElementProps;
  a: HTMLAnchorElementProps;
  select: HTMLSelectElementProps;
  option: HTMLOptionElementProps;
  textarea: HTMLTextAreaProps;
};
