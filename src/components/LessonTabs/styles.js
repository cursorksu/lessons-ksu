import styled from '@emotion/styled';
import {
	BOX_SHADOW,
	CHOCO,
	CREAM,
	DARK_BG,
	GOLD, PRIMARY_MAIN, VEREM_GOLD,
} from '../../constants/colors'

export const TabStyled = styled('div')`
	.ui.tabular.menu {
		max-width: 100%;
		display: flex;
		justify-content: space-evenly;
		border-bottom: none !important;
		padding: 10px 0;
		margin-bottom: 0;
	}
	.ui.attached.segment{
		background: transparent;
	}
	.ui.tabular.menu .item {
		background: linear-gradient(to bottom, ${CREAM}, ${VEREM_GOLD});
		border-radius: 12px !important;
		border: none !important;
		color: #fff;
		font-size: 16px;
		font-weight: bold;
		padding: 12px 24px;
		text-align: center;
		display: flex;
		cursor: pointer;
		box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3) !important;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2) !important;
		transition: all 0.3s ease-in-out;
		margin: 2px;
		
		&:hover {
			background: linear-gradient(to bottom, #d4af37, #faebd7);
			box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.3);
		}
		
		
		&.active {
			background: #af931b;
			transform: scale(0.95);
			box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
		}
		
		svg {
			width: 26px;
			height: 26px;
			display: inline;
			margin-right: 20px;
		}
	}
	
	.btn-wrapper {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 15px;
	}
	
	.lesson-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40px;
		background: ${ DARK_BG };
	}
`;
