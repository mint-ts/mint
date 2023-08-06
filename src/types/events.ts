export type MintEventHandler<T, E = Event> = (
  e: E & { currentTarget: T }
) => void;

export type MintMouseEventHandler<T> = MintEventHandler<T, MouseEvent>;
export type MintKeyboardEventHandler<T> = MintEventHandler<T, KeyboardEvent>;
export type MintDragEventHandler<T> = MintEventHandler<T, DragEvent>;
export type MintTouchEventHandler<T> = MintEventHandler<T, TouchEvent>;
export type MintFocusEventHandler<T> = MintEventHandler<T, FocusEvent>;
export type MintSubmitEventHandler<T> = MintEventHandler<T, SubmitEvent>;

export type MintEventProps<T> = {
  onClick?: MintMouseEventHandler<T>;
  onMouseDown?: MintMouseEventHandler<T>;
  onMouseUp?: MintMouseEventHandler<T>;
  onMouseMove?: MintMouseEventHandler<T>;
  onMouseOver?: MintMouseEventHandler<T>;
  onMouseEnter?: MintMouseEventHandler<T>;
  onMouseLeave?: MintMouseEventHandler<T>;
  onTouchStart?: MintTouchEventHandler<T>;
  onTouchEnd?: MintTouchEventHandler<T>;
  onTouchCancel?: MintTouchEventHandler<T>;
  onTouchMove?: MintTouchEventHandler<T>;
  onInput?: MintEventHandler<T>;
  onChange?: MintEventHandler<T>;
  onSubmit?: MintSubmitEventHandler<T>;
  onFocus?: MintFocusEventHandler<T>;
  onBlur?: MintFocusEventHandler<T>;
  onKeyDown?: MintKeyboardEventHandler<T>;
  onKeyUp?: MintKeyboardEventHandler<T>;
  onKeyPress?: MintKeyboardEventHandler<T>;
  onDrag?: MintDragEventHandler<T>;
  onDragStart?: MintDragEventHandler<T>;
  onDragEnd?: MintDragEventHandler<T>;
  onDragEnter?: MintDragEventHandler<T>;
  onDragLeave?: MintDragEventHandler<T>;
  onDragOver?: MintDragEventHandler<T>;
  onDrop?: MintDragEventHandler<T>;
};
