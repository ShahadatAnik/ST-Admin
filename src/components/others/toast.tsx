import { IToast } from '@/types';
import { Slide, toast, ToastContainer, ToastContainerProps } from 'react-toastify';

const ToastBody = ({ text }: { text: string }) => (
	<div className='flex items-center'>
		<p className='text-sm font-medium text-gray-900'>{text}</p>
	</div>
);

const SuccessToast = (text: string) => toast.success(<ToastBody {...{ text }} />);
const WarningToast = (text: string) => toast.warn(<ToastBody {...{ text }} />);
const ErrorToast = (text: string) => toast.error(<ToastBody {...{ text }} />);

const ShowLocalToast = ({ toastType, message }: Omit<IToast, 'status'>) => {
	switch (toastType) {
		case 'create':
		case 'insert':
			SuccessToast(message);
			break;
		case 'delete':
		case 'error':
			ErrorToast(message);
			break;
		case 'warning':
		case 'update':
			WarningToast(message);
			break;
		default:
			toast(<ToastBody text={message} />);
	}
};

const ShowToast = (toast: Omit<IToast, 'status'>) => {
	const { toastType, message } = toast;
	ShowLocalToast({
		toastType,
		message,
	});
};

const DefaultConfig: ToastContainerProps = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	closeButton: false,
};

const Toast = () => {
	return <ToastContainer style={{ width: 'auto' }} transition={Slide} {...DefaultConfig} />;
};

export { ErrorToast, ShowLocalToast, ShowToast, SuccessToast, Toast, WarningToast };
