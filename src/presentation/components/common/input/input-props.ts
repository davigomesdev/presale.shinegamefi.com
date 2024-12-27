// react imports
import { ChangeEvent } from 'react';

// enum imports
import { InputTypeEnum } from '../../../../domain/enums/input-type.enum';

// type imports
import { TokenType } from '../../../../domain/types/token.type';

export interface InputProps {
	label: 'From' | 'To';
	token: TokenType;
	balance: string;
	placeholder?: string;
	value: string | number;
	type?: InputTypeEnum;
	required?: boolean;
	onClick?: () => void;
	onClickMaxButton?: () => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
