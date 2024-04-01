import { useCallback } from 'react';
import { fireStore } from '../index';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { useGetStudentProfile } from './useGetStudentProfile';
import { useGetAllEntities } from "../entity/useGetAllEntities";

export const useUpdateStudent = () => {
  const { getStudentProfile } = useGetStudentProfile();
  const { getAllEntities } = useGetAllEntities('students');

  const updateStudentData = useCallback(
    async (studentId, data) => {
      try {
        const studentDocRef = doc(fireStore, `/students/${studentId}`);
        const profileSnap = await getDoc(studentDocRef);
        const student = profileSnap.data();
        if (student) {
          await updateDoc(studentDocRef, {
            ...student?.profile,
            ...data,
            modification_timestamp: new Date().getTime(),
          });

          const studentList = await getAllEntities();
          localStorage.setItem('students', JSON.stringify(studentList));
          await getAllEntities();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getStudentProfile, getAllEntities]
  );

  return { updateStudentData };
};
