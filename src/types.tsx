import React from 'react';

interface IVariants {
  [key: number]: React.ComponentType
}

export class ComponentWithVariants extends React.PureComponent {
  variants: IVariants;
}
