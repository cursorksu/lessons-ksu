import {
  Checkbox,
  Table,
  TableBody,
  TableCell, TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import React, { useCallback, useEffect, useState } from 'react';
import { TableStaled } from "./TableStaled";
import { useGetAllEntities } from "../../api/entity/useGetAllEntities";
import { Emoji } from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

export const DataTable = ({
  entityName,
  shouldUpdate,
  selectedRow,
  columns,
  onSwitch
}) => {
  const [tableData, setTableData] = useState([]);
  const { t } = useTranslation('tr');
  const { getAllEntities } = useGetAllEntities(entityName);

  const getData = async() => {
    //const data = localStorage.getItem(entityName);
    try {
      // if (data) {
      //   const parsedData = JSON.parse(data);
      //   setTableData(parsedData);
      // } else {
      const studentList  = await getAllEntities();
      setTableData(studentList);
      localStorage.setItem(JSON.stringify(studentList));
      // }
    } catch (error) {
      return error;
    }
  };

  const getTotalScore = useCallback(() =>
    tableData.reduce((acc, el) => acc + el.estimation, 0 ), [tableData]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName, shouldUpdate]);

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
          {tableData && tableData?.length && tableData?.map((el, idx) => (
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
              {columns.map(item => (
                item.name === 'avatar'
                  ? (
                    <TableCell key={item.name}>
                      <div className='d-flex'>
                        <Emoji size={60} unified={el['avatar']} />
                      </div>
                    </TableCell>
                  )
                  : (
                    <TableCell key={item.name}>
                      {item.render ? item.render(el) : el[item.name]}
                    </TableCell>
                  )
              ))}
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
              {tableData.length}
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
