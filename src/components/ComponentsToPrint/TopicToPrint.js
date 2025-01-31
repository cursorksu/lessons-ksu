import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KsuCard } from '../KsuCard'
import { Checkbox, FormField, Popup } from 'semantic-ui-react'
import { ButtonIconMiniStyled, ButtonIconStyled } from '../ButtonStyled'
import { ReactComponent as EditIcon } from '../../assets/edit.svg'
import { ReactComponent as SaveIcon } from '../../assets/save.svg'
import { ReactComponent as ScreenIcon } from '../../assets/screen.svg'
import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import Editor from '../TextEditor'
import { useEditEntity } from '../../api/entity/useEditEntity'
import { HTMLRenderer } from '../HTMLRender/HTMLRender'
import { InputStyled } from '../InputStyled'
import { DynamicList } from '../DynamicList/DynamicList'
import { InfoBlockStyled } from '../InfoBlockStyled'
import { useReactToPrint } from 'react-to-print'
import clsx from 'clsx'
import { TitleLarge } from '../TitleStyled'
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm'
import { lessonConfig, lessonDefaultValues } from '../../constants/entities/lessonConfig'
import { AdminPanel } from './AsideCards/AdminPanel'
import { BibleText } from './AsideCards/BibleText'
import { StaffList } from './AsideCards/StaffList'
import { LessonGoal } from './AsideCards/LessonGoal'

export const TopicToPrint = React.forwardRef(({
	                                              forceUpdate,
	                                              lesson,
	                                              onChangeConfirm
                                              }, ref) => {
	const { editEntity } = useEditEntity('lessons')
	const [isTopicEdit, setIsTopicEdit] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	
	useEffect(() => {
		if (lesson?.memory?.length) {
			const data = lesson?.memory?.find((el) => el.id === 'test')
			data && localStorage.setItem('test', JSON.stringify(data.settings))
		}
	}, [lesson])
	
	const {
		control,
		getValues,
		setValue,
		reset
	} = useForm({
		defaultValues: {
			goal: lesson?.goal,
			bibleText: lesson?.bibleText,
			bibleQuote: lesson?.bibleQuote,
			material: lesson?.material,
			topic: lesson?.topic,
		},
		caches: false,
	})
	
	const { user } = useSelector((state) => state.auth)
	
	const editLessonHandler = (fieldName) => {
		const newData = {
			id: lesson?.id,
		}
		
		if (fieldName === 'bible') {
			newData.bibleText = getValues('bibleText')
			newData.bibleQuote = getValues('bibleQuote')
		} else {
			newData[fieldName] = getValues(fieldName)
		}
		
		editEntity(newData)
		.then(() => {
			onChangeConfirm()
			setIsTopicEdit(false)
			reset({
				goal: lesson?.goal,
				bibleText: lesson?.bibleText,
				bibleQuote: lesson?.bibleQuote,
				material: lesson?.material,
				topic: lesson?.topic,
			})
		})
		.catch((err) => new Error(err))
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})
	
	return ( <InfoBlockStyled ref={ ref }>
		<section
			className="print-block ksu-wrapper"
			ref={ componentRef }>
			<aside className="aside-wrapper print-fluid">
				<div
					className={ clsx('image-wrapper', {
						'full-screen': isFullScreen,
					}) }>
					<div className="print-hide">
						{ !isFullScreen ? ( <ButtonIconStyled onClick={ () => setIsFullScreen(true) }>
							<FullScreenIcon/>
						</ButtonIconStyled> ) : ( <ButtonIconStyled onClick={ () => setIsFullScreen(false) }>
							<ScreenIcon/>
						</ButtonIconStyled> ) }
					</div>
					<img src={ lesson?.imageUrl } alt={ lesson?.title }/>
				</div>
				<LessonGoal
					lesson={lesson}
					onEdit={editLessonHandler}
					
				/>
			</aside>
			<section className="content-wrapper">
				<TitleLarge>{ lesson?.title }
					<span className="action print-hide">
						{ user?.uid && lesson?.createdBy?.uid === user?.uid && ( !isTopicEdit ? (
							<ButtonIconMiniStyled onClick={ () => setIsTopicEdit(true) }>
								<EditIcon/>
							</ButtonIconMiniStyled> ) : ( <ButtonIconMiniStyled onClick={ () => editLessonHandler('topic') }>
							<SaveIcon/>
						</ButtonIconMiniStyled> ) ) }
					</span>
				</TitleLarge>
				
				<div className="action-top">
					{ isTopicEdit ? ( <Controller
						name="topic"
						control={ control }
						render={ ({ field }) => ( <FormField>
							<Editor
								placeholder={ 'Почніть вводити текст...' }
								onChange={ (data) => setValue('topic', data) }
								value={ field.value }
							/>
						</FormField> ) }
					/> ) : ( <HTMLRenderer htmlContent={ lesson?.topic }/> ) }
				</div>
			</section>
			<aside className="aside-wrapper print-fluid">
				<AdminPanel
					onEdit={() => forceUpdate(prev => !prev)}
					lesson={lesson}
					onPrint={handlePrint}
				/>
				<BibleText
					lesson={lesson}
					onEdit={editLessonHandler}
				/>
				<StaffList
					lesson={lesson}
					onEdit={editLessonHandler}
				/>
			</aside>
		</section>
	</InfoBlockStyled> )
})
