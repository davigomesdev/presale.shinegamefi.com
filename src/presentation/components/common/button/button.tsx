// style imports
import * as Style from './button.style';

// props imports
import { ButtonProps } from './button.props';

// enum imports
import { ButtonThemeEnum } from '../../../../domain/enums/button-theme.enum';

const Button = ({ text, width, fontSize, theme, icon, radius, disabled, onClick }: ButtonProps) => {
	if (theme === ButtonThemeEnum.OUTLINE)
		return (
			<Style.Outline width={width} onClick={onClick} radius={radius} disabled={disabled}>
				{icon && icon}
				{text}
			</Style.Outline>
		);
	else if (theme === ButtonThemeEnum.ACTIVE)
		return (
			<Style.Active width={width} onClick={onClick} radius={radius} disabled={disabled}>
				{icon && icon}
				{text}
			</Style.Active>
		);
	else
		return (
			<Style.Default
				width={width}
				fontSize={fontSize}
				onClick={onClick}
				radius={radius}
				disabled={disabled}
			>
				{text}
			</Style.Default>
		);
};

export default Button;
