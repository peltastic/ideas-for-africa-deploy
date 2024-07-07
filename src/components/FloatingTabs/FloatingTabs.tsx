import { useState } from 'react';
import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import classes from '@/app/styles/Demo.module.css';

const data = ['React', 'Vue', 'Angular', 'Svelte'];

function FloatingTabs() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <div className=""></div>
    // <UnstyledButton
    //   key={item}
    //   className={classes.control}
    //   ref={setControlRef(index)}
    //   onClick={() => setActive(index)}
    //   mod={{ active: active === index }}
    // >
    //   <span className={classes.controlLabel}>{item}</span>
    // </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}

export default FloatingTabs