import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { TableStaled } from "./TableStaled";
import { useGetAllEntities } from "../../api/entity/useGetAllEntities";

export const DataTable = ({ entityName, shouldUpdate, columns }) => {
  const [tableData, setTableData] = useState([]);
  const { getAllEntities } = useGetAllEntities(entityName);

  const getData = async() => {
    const data = localStorage.getItem(entityName);
    try {
      if (data) {
        const parsedData = JSON.parse(data);
        setTableData(parsedData);
      } else {
        const studentList  = await getAllEntities();
        setTableData(studentList);
        localStorage.setItem(JSON.stringify(studentList));
      }
    } catch (error) {
      return error;
    }
  };

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
              <TableHeaderCell>{el.label}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {tableData && tableData?.length && tableData?.map(el => (
            <TableRow key={el.id}>
              <TableCell collapsing>
                <Checkbox slider checked={el.isActive} />
              </TableCell>
              {columns.map(item => (
                <TableCell key={item.name}>
                  {item.render ? item.render(el) : el[item.name]}
                </TableCell>
              ))}
            </TableRow>
          )) || <></>
          }
        </TableBody>
      </Table>
    </TableStaled>

  );
};