import * as React from 'react';

interface Props {
  size: { width: number; height: number };
}
export default function Field({ size }: Props) {
  return <div className="field" style={size}></div>;
}
