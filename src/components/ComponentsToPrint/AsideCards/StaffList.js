import { KsuCard } from '../../KsuCard'
import { ButtonIconMiniStyled } from '../../ButtonStyled'
import { Controller } from 'react-hook-form'
import { Checkbox, FormField } from 'semantic-ui-react'
import { DynamicList } from '../../DynamicList/DynamicList'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from '../../../assets/edit.svg'
import { ReactComponent as SaveIcon } from '../../../assets/save.svg'

export const StaffList = ({
	                          lesson,
	                          onEdit
                          }) => {
	const [isMaterialEdit, setIsMaterialEdit] = useState(false)
	const { user } = useSelector((state) => state.auth)
	return ( <KsuCard
		title={ 'Що треба взяти' }
		action={ user?.uid && lesson?.createdBy?.uid === user?.uid && ( !isMaterialEdit ? (
			<ButtonIconMiniStyled onClick={ () => setIsMaterialEdit(true) }>
				<EditIcon/>
			</ButtonIconMiniStyled>
		) : (
			<ButtonIconMiniStyled onClick={ () => onEdit('material') }>
				<SaveIcon/>
			</ButtonIconMiniStyled>
		) ) }>
		<div>
			{ isMaterialEdit ? ( <Controller
				name="material"
				control={ control }
				render={ ({ field }) => ( <FormField>
					<DynamicList
						field={ field }
						initialField={ field.value }
						onChangeField={ (data) => setValue('material', data.value) }
					/>
				</FormField> ) }
			/> ) : ( <ul className="material-list">
				{ lesson?.material?.map((el) => ( <li key={ el.key }>
					<Checkbox label={ { children: el.value } }/>
				</li> )) }
			</ul> ) }
		</div>
	</KsuCard> )
}
