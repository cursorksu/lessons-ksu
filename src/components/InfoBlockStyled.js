import styled from '@emotion/styled';
import { CARD_SHADOW, VEREM_GOLD } from '../constants/colors'

export const InfoBlockStyled = styled.div`
	font-family: Comfortaa, sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	line-height: 1.5;
	width: 100%;
	padding-bottom: 20px;
	
	.ksu-wrapper {
		display: grid;
		grid-gap: 20px;
		grid-template-columns: 280px calc(100% - 600px) 280px;
	}
	
	img {
		width: 100%;
		height: 280px;
		object-fit: contain;
		display: block;
	}
	
	.image-wrapper {
		border-radius: 20px;
		box-shadow: ${ CARD_SHADOW };
		position: relative;
		overflow: hidden;
		margin-bottom: 20px;
		padding: 0;
		
		button {
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 1;
		}
	}
	.ui.checkbox input:checked:focus~label:before,
	.ui.checkbox input ~ label:before {
		border-radius: 6px;
		width: 20px;
		height: 20px;
		border: 1px solid ${ VEREM_GOLD };
		box-shadow: ${ CARD_SHADOW };
		background: #fff;
	}
	
	.ui.checkbox input:checked ~ label:after {
		color: ${ VEREM_GOLD };
		width: 20px;
		height: 20px;
	}
	
	.content-wrapper {
		background: #fff;
		padding: 20px;
		box-shadow: ${ CARD_SHADOW };
		border-radius: 20px;
		height: calc(100vh - 100px);
		overflow: auto;

		h1, h2, h3, h4, h5, h6 {
			color: ${ VEREM_GOLD };
			margin: 0;
			padding: 0;
			font-family: Comfortaa, sans-serif;
			line-height: 1.2;
			font-weight: 700;
		}
	}
`;
