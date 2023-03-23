// import { Component } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { FormStyled } from 'components/ContactForm/ContactForm.styled';

import { isValidName, isValidPhone } from './addMethodContactFormYup';
	
const nameRegex = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const invalidNameMessage = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";

yup.addMethod(yup.string, "isValidName", isValidName);

yup.addMethod(yup.string, "isValidPhone", isValidPhone);


// const phoneRegex = /^(\+?\d[- .]*){6,13}\d$/;
const phoneRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const invalidPhoneMessage = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";

const schema = yup.object({
	name: yup.string().isValidName(nameRegex, invalidNameMessage).required(),
	number:	yup.string().isValidPhone(phoneRegex, invalidPhoneMessage).min(7).max(12).required(),
})
export function ContactForm ({getDataFromForm}) {
	// handleChange = (e) => {
	// 	const nameOfInput = e.target.name;

	// 	this.setState({
	// 		[nameOfInput]: e.target.value
	// 	})
	// }


	const initialValues = {
		name: '',
		number: '',
	}

	const handleSubmit = (values, { resetForm }) => {

		const contact = {
			...values,
			id: nanoid(),
		}

		resetForm();

		getDataFromForm(contact);
	}

	return (
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				<FormStyled
					// onSubmit={this.handleSubmit}
					autoComplete="off"
				>
					<label>
						<p>Name</p>
						<Field
							type="text"
							name="name"
						/>
						<ErrorMessage component="div" name="name" />
					</label>
					<label>
						<p>Number</p>
						<Field
							type="tel"
							name="number"
						/>
						<ErrorMessage component="div" name="number" />
					</label>
					<button type="submit">Add contact</button>
				</FormStyled>
			</Formik>
	)
}
	


ContactForm.propTypes = {
	getDataFromForm: PropTypes.func.isRequired,
}