import { HTMLAttributes, ReactNode } from 'react';

export type CollapseProps = {
  open?: boolean;
  defaultOpen?: boolean;
  collapsedHeight?: number;
  className?: string;

  onExpandEnd?: () => void;
  onExpandStart?: () => void;
  'data-testid'?: string;
  htmlProps?: HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
};
