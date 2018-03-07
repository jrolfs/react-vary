/// <reference types="react" />
import React from 'react';
declare global  {
    interface Function {
        name: string;
    }
}
export declare type IVariants = {
    [key: number]: React.ComponentType;
};
export interface IVariantsProps {
    variants: IVariants;
}
export interface IWithVariantProps {
    variant: number;
    [x: string]: any;
}
export interface IVariantCombined extends IVariantsProps, IWithVariantProps {
}
export interface InternalState {
    variantCount: number;
}
export interface IVariantState extends InternalState, IVariantCombined {
    isDefault: boolean;
}
export interface IVariantProps extends IVariantState {
    displayName: string;
}
export declare type DefaultVariantComponent = IVariantsProps & React.ComponentType;
