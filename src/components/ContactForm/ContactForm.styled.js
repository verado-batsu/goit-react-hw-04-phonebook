import styled from "@emotion/styled";
import { Form } from 'formik';

export const FormStyled = styled(Form)`
	padding: 10px;
	margin-bottom: 20px;

	border: 1px solid #000;

	label {
		display: block;
		margin-bottom: 10px
	}

	input {
		/* display: block; */
		padding: 3px;
	}

	div {
		color: #ff0000;
	}

	button {
		padding: 5px 10px;
		background-color: #fff;

		:hover,
		:focus {
			background-color: #000;
			color: #fff;
		}
	}
`;