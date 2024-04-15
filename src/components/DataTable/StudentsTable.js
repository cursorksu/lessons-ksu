import {
  Checkbox,
  Table,
  TableBody,
  TableCell, TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import React, { useCallback, useEffect } from 'react';
import { TableStaled } from "./TableStaled";
import { Emoji } from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { useParams } from 'react-router';
import { useGetStudentsInGroup } from '../../api/student/useGetStudentsInGroup';

export const StudentsTable = ({
  selectedRow,
  shouldUpdate,
  columns,
  onSwitch
}) => {
  const { groupId } = useParams();
  const { t } = useTranslation('tr');
  const { getGetStudentsInGroup, studentList } = useGetStudentsInGroup();

  const getTotalScore = useCallback(() =>
    studentList?.reduce((acc, el) => acc + el.estimation, 0 ), [studentList]);

  useEffect(() => {
    getGetStudentsInGroup(groupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate, groupId]);

  return (
    <TableStaled>
      <Table compact celled definition>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Активний</TableHeaderCell>
            {columns.map(el => (
              <TableHeaderCell key={el.name}>{t(`students.labels.${el.name}`)}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentList && studentList?.length && studentList?.map((el, idx) => (
            <TableRow
              selected={selectedRow === el.id}
              key={idx}
              className={clsx({
                active: selectedRow === el.id,
                'is-active': el.isActive,
              })}
            >
              <TableCell collapsing>
                <Checkbox slider checked={el.isActive} onChange={() => onSwitch(el)}/>
              </TableCell>
              {columns.map(item => {
                return item.name === 'avatar'
                  ? (<TableCell key={item.name}>
                    <div className='d-flex'>
                      <Emoji size={60} unified={el['avatar']} />
                    </div>
                  </TableCell>)
                  : (<TableCell key={item.name}>
                    {item.render
                      ? item.render(el)
                      : el[item.name]}
                  </TableCell>);
              })}
            </TableRow>
          )) || <></>
          }
        </TableBody>
        <TableFooter >
          <TableRow>
            <TableCell>
              Разом дітей:
            </TableCell>
            <TableCell>
              {studentList?.length}
            </TableCell>

            <TableCell>
              Разом балів:
            </TableCell>
            <TableCell>
              {getTotalScore()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableStaled>

  );
};
