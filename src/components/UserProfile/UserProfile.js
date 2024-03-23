import { UserProfileStyled } from './UserProfileStyled';
import { Image } from 'semantic-ui-react';
import {useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";
import { CreateEntityForm } from "../CreateEntityForm/CreateEntityForm";
import {ButtonIconStyled, ButtonStyled} from "../ButtonStyled";
import { DataTable } from "../DataTable/DataTable";
import { student } from "../../constants/entities/student";
import { EditStudentEstimateModal } from "../EditStudentEstimateModal/EditStudentEstimateModal";
import { useUpdateEstimation } from "../../api/student/useUpdateEstimation";
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import {useForm} from "react-hook-form";

export const UserProfile = ({ user }) => {
  const { t } = useTranslation('tr');
  const [isFormShown, setIsFormShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { updateStudentData } = useUpdateEstimation();
  //const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user?.uid) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  const initialValues = {
    firstName: '',
    secondName: '',
    phone: '',
    avatar: '',
    about: '',
    address: '',
    birthday: '',
    estimation: '',
    listOfVisits: [new Date().toDateString()],
    isActive: true,
  };

  const [defaultValues, setDefaultValues] = useState(initialValues);
  const {getValues} = useForm({ defaultValues });
  const handleRowClick = (data) => {
    setIsFormShown(true);
    setIsEdit(true);
    setDefaultValues((prev) => data);
  };
  useEffect(() => {
    getValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);
  const confirmationHandler = (id, data) => {
    const studentList = localStorage.getItem('students');
    const studentListParsed = studentList?.length ? JSON.parse(studentList) : [];
    if(isEdit) {
      setIsFormShown(false);
      setDefaultValues(initialValues);
      localStorage.setItem('students', JSON.stringify(studentListParsed.map(el => el.id === defaultValues.id ? defaultValues : el)));
    } else {
      const newData = {
        id, ...data,
      };
      localStorage.setItem('students', JSON.stringify([...studentListParsed,  newData]));
    }
    setShouldUpdate(prev => !prev);
  };

  return (
    <UserProfileStyled>
      <div className="top-container">
        <div className="d-flex">
          <Image src={user?.avatar} size='tiny' circular/>
          <div>
            <h1 className="title">{user?.firstName} {user?.lastName}</h1>
            <div className="meta">{user?.email}</div>
          </div>
        </div>

        <div>
          <ButtonStyled onClick={() => setIsFormShown(true)}>
            + {t('students.addStudent')}
          </ButtonStyled>
        </div>
      </div>

      {isFormShown && (
        <CreateEntityForm
          entityName="students"
          onConfirm={confirmationHandler}
          onClose={() => setIsFormShown(false)}
          fields={student}
          defaultValues={defaultValues}
        />
      )}
      <DataTable
        entityName="students"
        shouldUpdate={shouldUpdate} columns={[
          ...student,
          {
            inputType: 'textInput',
            name: 'estimation',
            label: 'Динарики',
            placeholder: 'Динарики',
            render: (data) => (
              <div className="estimation">
                <ButtonIconStyled disabled>
                  {data.estimation}
                </ButtonIconStyled>
                <EditStudentEstimateModal
                  studentName={data.firstName}
                  onConfirm={(estimation) => updateStudentData(data.id, { estimation: data + estimation })}
                />
              </div>
            ),
            isIgnored: true,
          },
          {
            inputType: null,
            name: 'action',
            label: 'Змiнити',
            render: (data) => (
              <ButtonIconStyled onClick={() => handleRowClick(data)}>
                <EditIcon/>
              </ButtonIconStyled>
            ),
          }
        ]}/>
    </UserProfileStyled>
  );
};