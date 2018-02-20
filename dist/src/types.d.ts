/// <reference types="react" />
import React from 'react';
export declare type IVariants = {
    [key: number]: React.ComponentType;
};
export interface IVariantsProps {
    variants: IVariants;
}
export interface IWithVariantProps {
    variant: number;
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
