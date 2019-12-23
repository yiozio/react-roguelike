import * as React from 'react';
import { observer } from 'mobx-react';
import Field from './Field';
import KeyEvent from '../defs/KeyEvent';
import stores from '../stores';

export default observer(Main);
function Main() {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  React.useEffect(() => {
    const onresize = (e: UIEvent) => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', onresize);
    window.addEventListener('keydown', KeyEvent);
    return () => {
      window.removeEventListener('resize', onresize);
      window.removeEventListener('keydown', KeyEvent);
    };
  }, []);

  return (
    <div className="main" style={size}>
      <div>{'time: ' + stores.time}</div>
      <Field size={{ width: size.width, height: size.height - 12 }} />
    </div>
  );
}
