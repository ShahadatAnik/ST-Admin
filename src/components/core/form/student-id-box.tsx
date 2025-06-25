import { REGEXP_ONLY_DIGITS } from 'input-otp';

import FormOTP from './otp';
import { FormOtpProps } from './types';

const FormStudentID: React.FC<Omit<FormOtpProps, 'maxLength' | 'minLength' | 'pattern'>> = ({ field, ...props }) => {
	return <FormOTP maxLength={9} minLength={9} pattern={REGEXP_ONLY_DIGITS} {...props} field={field} />;
};

export default FormStudentID;
