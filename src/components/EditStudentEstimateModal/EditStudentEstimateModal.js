import { FormField, Popup } from 'semantic-ui-react'
import { InputStyled, LabelStyled } from '../InputStyled'
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EstimationModalStyled } from './EstimationModalStyled'
import { ReactComponent as AddIcon } from '../../assets/add.svg'
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg'

export const EditStudentEstimateModal = ({ onConfirm }) => {
	const { t } = useTranslation('tr')
	const [estimation, setEstimation] = useState(0)
	const [isOpen, setIsOpen] = useState(false)
	const confirmationHandler = async (mode) => {
		await onConfirm(mode === 'add' ? +estimation : -estimation)
		setIsOpen(false)
		setEstimation(0)
	}
	return (
		<Popup
			open={ isOpen }
			content={
				<EstimationModalStyled>
					<FormField>
						<LabelStyled htmlFor="estime">
							Наберіть кількість динариків
						</LabelStyled>
						<LabelStyled>Максимально 100, Мінімально -100</LabelStyled>
						<InputStyled
							name="estime"
							type="number"
							min={ -100 }
							max={ 100 }
							step="1"
							value={ estimation }
							onChange={ ({ target }) =>
								target.value >= -100 &&
								target.value <= 100 &&
								setEstimation(target.value)
							}
						/>
					</FormField>
					<div className="action">
						<ButtonIconMiniStyled onClick={ () => confirmationHandler('remove') }>
							<RemoveIcon/>
						</ButtonIconMiniStyled>
						<ButtonIconMiniStyled onClick={ () => confirmationHandler('add') }>
							<AddIcon/>
						</ButtonIconMiniStyled>
						<ButtonStyled onClick={ () => setIsOpen(false) }>
							{ t('button.cancel') }
						</ButtonStyled>
					</div>
				</EstimationModalStyled>
			}
			on="click"
			pinned
			trigger={
				<div role="button" onClick={ () => setIsOpen(true) }>
					<img
						src="https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fcoin.png?alt=media&token=6b26e6f8-1b2b-4d0d-bd29-69ebca27cc20"
						alt="coin"
					/>
				</div>
			}
		/>
	)
}
