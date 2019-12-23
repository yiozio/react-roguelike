import * as React from 'react';
import Field from './Field';

export default function Main() {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  React.useEffect(() => {
    const onresize = (e: UIEvent) => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', onresize);
    return () => window.removeEventListener('resize', onresize);
  }, []);

  return (
    <div className="main" style={size}>
      <Field size={size} />
    </div>
  );
}
