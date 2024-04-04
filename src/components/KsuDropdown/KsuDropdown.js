import { Dropdown } from 'semantic-ui-react';
import { StyledDropdown } from './StyledDropdown';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { useCallback, useEffect, useState } from 'react';

export const KsuDropdown = ({
  entityName,
  onChange,
  multiple,
  placeholder
}) => {
  const { getAllEntities } = useGetAllEntities(entityName);
  const [options, setOptions] = useState([]);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const getOption = (el) => ({
    key: el.id,
    value: el.id,
    text: !el.firstName
      ? <div className='ksu-option'>
        <div>{`${el.firstName} ${el.lastName}`}</div>
        <div className='description'>{el.email}</div>
      </div>
      : el.email,
    image: { avatar: el.avatar, src: el.avatar },
  });

  useEffect(() => {
    getAllEntities().then(data => {
      setOptions(data.map(el => getOption(el)));
      setSearchedOptions(data.map(el => getOption(el)));
    });
  }, [entityName, getAllEntities]);

  const handleChange = useCallback((_, data) => {
    onChange(data.value);
  }, [onChange]);

  return (
    <StyledDropdown>
      <Dropdown
        placeholder={placeholder}
        fluid
        multiple={multiple}
        search
        selection
        onChange={handleChange}
        options={searchedOptions}
      />
    </StyledDropdown>
  );
};
