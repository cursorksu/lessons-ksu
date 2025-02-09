import React, { useEffect, useRef, useState } from 'react'
import { FormField } from 'semantic-ui-react'
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
import { InfoBlockStyled } from '../InfoBlockStyled'
import { useReactToPrint } from 'react-to-print'
import clsx from 'clsx'
import { TitleLarge } from '../TitleStyled'
import { AdminPanel } from './AsideCards/AdminPanel'
import { BibleText } from './AsideCards/BibleText'
import { StaffList } from './AsideCards/StaffList'
import { LessonGoal } from './AsideCards/LessonGoal'
import { MediaCard } from './AsideCards/MediaCard'
import { LessonEntity } from '../LessonEntity/LessonEntity'
import { LessonVideo } from '../LessonEntity/LessonVideo'

export const TopicToPrint = React.forwardRef(({
	                                              lesson,
	                                              onChangeConfirm
                                              }, ref) => {
	const { editEntity } = useEditEntity('lessons');
	const [activeTab, setActiveTab] = useState(0);
	const [isTopicEdit, setIsTopicEdit] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	
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
				<MediaCard
					lesson={lesson}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/>
			</aside>
			<div>
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
				{activeTab === 0 &&
					<>
						<LessonGoal
							lesson={ lesson }
							onEdit={ editLessonHandler }
						/>
						<section className="content-wrapper">
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
					</>
				}
				
				{activeTab === 1 &&
					<LessonEntity entityName={'presentation'} lesson={lesson} />
				}
				{activeTab === 2 &&
					<LessonVideo entityName={'video'} lesson={lesson} />
				}
				{activeTab === 3 &&
					<LessonEntity entityName={'subject'} lesson={lesson} />
				}
				{activeTab === 4 &&
					<LessonEntity entityName={'creative'} lesson={lesson} />
				}
				{activeTab === 5 &&
					<LessonEntity entityName={'game'} lesson={lesson} />
				}
				{activeTab === 6 &&
					<div>
						{lesson.memory?.length > 0 && lesson.memory.map((el) => ( <div>{
							el.settings.map((el2) => ( <div>
								<h3>{el2.question}</h3>
								{el2.answer.map((ans, idx) => ( <p><b>{idx}.  {" "}</b>{ans.text}</p> ))}
								<br/>
							</div> ))
						}</div>))}
					</div>
				}
				{activeTab === 7 &&
					<LessonEntity entityName={'food'} lesson={lesson} />
				}
				{activeTab === 8 &&
					<LessonEntity entityName={'print'} lesson={lesson} />
				}
			</div>
			<aside className="aside-wrapper print-fluid">
				<AdminPanel
					onEdit={ onChangeConfirm }
					lesson={ lesson }
					onPrint={ handlePrint }
				/>
				<BibleText
					lesson={ lesson }
					onEdit={ editLessonHandler }
				/>
				<StaffList
					lesson={ lesson }
					onEdit={ editLessonHandler }
				/>
			</aside>
		</section>
	</InfoBlockStyled> )
})
