import * as React from 'react';
import { IconProps } from './types';

const ArrowTop: React.FC<IconProps> = ({
  className,
  color: colorProp = '#181B32',
  size = 32,
  ignoreColor,
  animation = '',
}) => {
  const color = !ignoreColor ? colorProp : undefined;

  return (
    <svg
      className={`${className} ${animation}`}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M9.48 3.976L6.212 7.244a.73.73 0 000 1.036.73.73 0 001.036 0l2.016-2.016v9.24a.732.732 0 001.464 0v-9.24l2.016 2.016a.73.73 0 001.036 0 .733.733 0 000-1.04l-3.26-3.264a.734.734 0 00-1.04 0z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowTop;
