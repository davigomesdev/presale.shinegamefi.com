import React from 'react';
import { ButtonThemeEnum } from '../../../../domain/enums/button-theme.enum';

export interface ButtonProps {
	text: string;
	width?: string;
	fontSize?: string;
	theme?: ButtonThemeEnum;
	icon?: React.JSX.Element;
	radius?: string;
	disabled?: boolean;
	onClick?: () => void;
}
