export interface SizeProps {
  w?: '25' | '50' | '75' | '100' | 'auto';
  h?: '25' | '50' | '75' | '100' | 'auto';
  vw?: boolean;
  vh?: boolean;
  responsive?: boolean;
  flexGrow?: '0' | '1';
}

export function propsToSize(props: SizeProps) {
  const { w, h, vw, vh, responsive, flexGrow } = props;

  delete props.responsive;
  delete props.w;
  delete props.h;
  delete props.vw;
  delete props.vh;
  delete props.flexGrow;

  return {
    [`w-${responsive ? 'md-' : ''}${w}`]: w != null,
    [`h-${responsive ? 'md-' : ''}${h}`]: h != null,
    [`flex-${responsive ? 'md-' : ''}grow-${flexGrow}`]: flexGrow != null,
    [`vw-100`]: vw,
    [`vh-100`]: vh
  };
}
