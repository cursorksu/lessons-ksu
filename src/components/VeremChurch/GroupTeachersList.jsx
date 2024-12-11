import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import React, { useEffect } from 'react';

export const GroupTeachersList = ({ idsList }) => {
    const { getEntities: getTeachers, entities: teachersList } =
        useGetEntityListByIds('users');

    useEffect(() => {
       !teachersList?.length && getTeachers(idsList);
    }, [idsList]);

    return (
        <div className="content-block">
            <h3>Teachers:</h3>
            {teachersList?.length && teachersList.map((el, idx) => (
                <div key={idx}>{el.fullName}</div>
            ))}
        </div>
    );
}