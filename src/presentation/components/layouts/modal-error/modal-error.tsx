// style imports
import * as Style from './modal-error.style';

// props imports
import { ModalErrorProps } from './modal-error.props';

// icon imports
import { MdOutlineErrorOutline } from 'react-icons/md';

// component imports
import Button from '../../common/button/button';

const ModalError = ({ title, message, onClickClose }: ModalErrorProps) => {
	return (
		<Style.Container>
			<Style.Background />
			<Style.Content>
				<MdOutlineErrorOutline />
				<h1>{title}</h1>
				<p>{message}</p>
				<Button text='Ok' onClick={onClickClose} width='120px' />
			</Style.Content>
		</Style.Container>
	);
};

export default ModalError;
