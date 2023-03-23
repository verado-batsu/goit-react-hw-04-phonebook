import PropTypes from 'prop-types';
import { ContactListEl } from 'components/ContactList/ContactList.styled';

export function ContactList({ filteredContacts, handleDeleteClick }) {
	return (
		<ContactListEl>
			{
				filteredContacts.map(({ id, name, number }) => {
						return (
							<li key={id}>
								<span>{name}: {number}</span>
								<button id={id} type="button" onClick={handleDeleteClick}>Delete</button>
							</li>
						)
					})
			}
		</ContactListEl>
	)
}

ContactList.propTypes = {
	filteredContacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string.isRequired)),
	handleDeleteClick: PropTypes.func.isRequired,
}