// style imports
import * as Style from './modal-loading.style';

// props imports
import { ModalLoadingProps } from './modal-loading.props';

const ModalLoading = ({ title, message }: ModalLoadingProps) => {
	return (
		<Style.Container>
			<Style.Background />
			<Style.Content>
				<Style.Shape />
				<h1>{title}</h1>
				<p>{message}</p>
			</Style.Content>
		</Style.Container>
	);
};

export default ModalLoading;
