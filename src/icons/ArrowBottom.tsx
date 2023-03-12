import * as React from 'react';
import { IconProps } from './types';

const ArrowBottom: React.FC<IconProps> = ({
  className = '',
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
        d="M10.52 16.024l3.268-3.268a.73.73 0 000-1.036.73.73 0 00-1.036 0l-2.016 2.016v-9.24a.732.732 0 00-1.464 0v9.24L7.256 11.72a.73.73 0 00-1.036 0 .733.733 0 000 1.04l3.268 3.268a.728.728 0 001.032-.004z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowBottom;
