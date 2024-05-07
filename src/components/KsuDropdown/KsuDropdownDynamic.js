import { Dropdown } from 'semantic-ui-react';
import { StyledDropdown } from './StyledDropdown';
import { useCallback, useEffect, useState } from 'react';
import { getOption } from '../../utils/getOption';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';

export const KsuDropdownDynamic = ({
  onChange,
  multiple,
  placeholder,
  entityName,
  value,
  ...dropdownSettings
}) => {
  const { getAllEntities } = useGetAllEntities(entityName);
  const [options, setOptions] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    getAllEntities().then(data => {
      setOptions(data.map(el => getOption(el, value?.map(el => el.id))));
    });
  }, [getAllEntities]);


  const handleChange = useCallback((_, data) => {
    setDropdownIsOpen(false);
    onChange(data);
  }, [onChange]);

  return (
    <StyledDropdown>
      <Dropdown
        open={dropdownIsOpen}
        placeholder={placeholder}
        multiple={multiple}
        onClick={() => setDropdownIsOpen(true)}
        onChange={handleChange}
        options={options}
        {...dropdownSettings}
      />
    </StyledDropdown>
  );
};
