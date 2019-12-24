import * as React from 'react';
import { observer } from 'mobx-react';
import Field from './Field';
import Log from './Log';
import Panel from './Panel';
import KeyEvent from '../defs/KeyEvent';
import stores from '../stores/dungeon';

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
      <div>{`time: ${stores.time}, floor: B${stores.level + 1}F`}</div>
      <Panel
        position={{ left: 1, top: 13 }}
        size={{ width: size.width - 2, height: size.height - 135 }}
      >
        <Field />
      </Panel>
      <Panel
        position={{ left: 1, top: size.height - 121 }}
        size={{ width: size.width - 2, height: 120 }}
      >
        <Log />
      </Panel>
    </div>
  );
}
