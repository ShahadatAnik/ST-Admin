import { REGEXP_ONLY_DIGITS } from 'input-otp';

import FormOTP from './otp';
import { FormOtpProps } from './types';

const FormPhone: React.FC<Omit<FormOtpProps, 'maxLength' | 'minLength' | 'pattern'>> = ({ field, ...props }) => {
	return <FormOTP maxLength={11} minLength={11} pattern={REGEXP_ONLY_DIGITS} {...props} field={field} />;
};

export default FormPhone;
