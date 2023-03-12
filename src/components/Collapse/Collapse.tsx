import React, { FC, useEffect } from 'react';

import useCollapse from 'react-collapsed';

import { CollapseProps } from './types';

const Collapse: FC<CollapseProps> = ({
  children,
  open,
  defaultOpen = false,
  collapsedHeight = 0,
  className,
  'data-testid': datatestId,
  onExpandEnd,
  onExpandStart,
  htmlProps,
}) => {
  const { getCollapseProps, setExpanded } = useCollapse({
    isExpanded: open,
    defaultExpanded: defaultOpen,
    collapsedHeight,
    onExpandEnd,
    onExpandStart,
  });

  useEffect(() => {
    if (open) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [open, setExpanded]);

  return (
    <div
      {...getCollapseProps()}
      className={className}
      data-testid={datatestId}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export default Collapse;
