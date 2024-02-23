import {useCallback} from "react";
import {updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import {useDispatch} from "react-redux";
import {doc, getDoc} from "firebase/firestore";
import {setMessage} from "../../store/notificationReducer";
import {fireStore} from "../index";
import {useTranslation} from "react-i18next";

export const useLessonToCollection = () => {
  const { t } = useTranslation('tr', { ns: 'errors' });
  const dispatch = useDispatch();

  const bindLessonToCollection = useCallback(async (collectionId, lessonId) => {
    const collectionRef = doc(fireStore, 'collections/h9w2T3DUdy7RetDJH1ZS');
    const docSnap = await getDoc(collectionRef);

    if (!docSnap.exists()) throw new Error('No such document fined');
    
    try {
      await updateDoc(collectionRef, {
        lesson_ids: arrayUnion(lessonId)
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error',
        message: {
          title: t('bindingError.title'),
          description: `${t('bindingError.description')}: ${error.message}`,
        },
      }));
    }
  }, [dispatch, t]);

  const unbindLessonFromCollection = useCallback(async (collectionId, lessonId) => {
    const collectionRef = doc(fireStore, 'collections', collectionId);
    try {
      await updateDoc(collectionRef, {
        lesson_ids: arrayRemove(lessonId)
      });
    } catch (error) {
      dispatch(setMessage({
        type: 'error',
        message: {
          title: t('unbindingError.tilte'),
          description: `${t('unbindingError.description')}: ${error.message}`,
        },
      }));
    }
  }, [dispatch, t]);

  return { bindLessonToCollection, unbindLessonFromCollection };
};
