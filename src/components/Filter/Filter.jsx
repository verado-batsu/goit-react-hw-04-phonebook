import PropTypes from 'prop-types';
import { FilterLabel } from 'components/Filter/Filter.styled';

export function Filter({ handleChange, filter }) {
	return (
		<FilterLabel>
			<p>Find contacts by name</p>
			<input
				name="filter"
				type="text"
				onChange={handleChange}
				value={filter}
			/>
		</FilterLabel>
	)
}

Filter.propTypes = {
	handleChange: PropTypes.func.isRequired,
	filter: PropTypes.string
}