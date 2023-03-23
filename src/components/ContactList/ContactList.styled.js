import styled from "@emotion/styled";

export const ContactListEl = styled.ul`
	li{
		display: flex;
		gap: 10px;
		justify-content: space-between;

		:not(:last-child) {
			margin-bottom: 10px;
		}
	}

	li > button {
		padding: 3px 5px;
		background-color: #fff;

		:hover,
		:focus {
			background-color: #000;
			color: #fff;
		}
	}
`;