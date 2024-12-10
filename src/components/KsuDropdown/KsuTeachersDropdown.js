import { Dropdown } from 'semantic-ui-react';
import { StyledDropdown } from './StyledDropdown';
import { useCallback, useEffect, useState } from 'react';
import { getOption } from '../../utils/getOption';
import { useSelector } from 'react-redux';

export const KsuTeachersDropdown = ({
  onChange,
  multiple,
  placeholder,
  optionsIds,
  value,
  ...dropdownSettings
}) => {
  const { teachers } = useSelector((state) => state.lessonData);
  const [options, setOptions] = useState([]);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    console.log({ searchString });
  }, [searchString]);

  useEffect(() => {
    if (optionsIds) {
      const newList = [];
      for (const teacherId of optionsIds) {
        const selectedTeachers = teachers.filter((el) => el?.uid === teacherId);
        selectedTeachers?.map((el) =>
          getOption(
            el,
            value?.map((el) => el?.id)
          )
        );
      }
      setOptions(newList);
      setSearchedOptions(newList);
    } else {
      setOptions(
        teachers?.map((el) =>
          getOption(
            el,
            value?.map((el) => el?.id)
          )
        )
      );
      setSearchedOptions(
        teachers?.map((el) =>
          getOption(
            el,
            value?.map((el) => el?.id)
          )
        )
      );
    }
  }, [teachers, optionsIds, value]);

  const handleChange = useCallback(
    (_, data) => {
      setDropdownIsOpen(false);
      onChange(data);
    },
    [onChange]
  );

  return (
    <StyledDropdown>
      <Dropdown
        open={dropdownIsOpen}
        placeholder={placeholder}
        multiple={multiple}
        onClick={() => setDropdownIsOpen(true)}
        onSearchChange={(_, data) => setSearchString(data.searchQuery)}
        onChange={handleChange}
        options={searchedOptions}
        {...dropdownSettings}
      />
    </StyledDropdown>
  );
};
