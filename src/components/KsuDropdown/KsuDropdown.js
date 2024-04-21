import { Dropdown } from 'semantic-ui-react';
import { StyledDropdown } from './StyledDropdown';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { useCallback, useEffect, useState } from 'react';
import { getOption } from '../../utils/getOption';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';

export const KsuDropdown = ({
  entityName,
  onChange,
  multiple,
  placeholder,
  optionsIds,
  ...field
}) => {
  const { getAllEntities } = useGetAllEntities(entityName);
  const { getEntities, entities: optionsData } = useGetEntityListByIds(entityName);
  const [options, setOptions] = useState([]);
  const [searchedOptions, setSearchedOptions] = useState(options);

  useEffect(() => {
    if (optionsIds) {
      getEntities(optionsIds);
    } else {
      getAllEntities().then(data => {
        setOptions(data.map(el => getOption(el, field?.value?.map(el => el.id))));
        setSearchedOptions(data.map(el => getOption(el, field?.value?.map(el => el.id))));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName, getAllEntities, optionsIds]);

  useEffect(() => {
    if (optionsData?.length) {
      setOptions(optionsData.map(el => getOption(el)));
      setSearchedOptions(optionsData.map(el => getOption(el)));
    }
  }, [optionsData]);

  const handleChange = useCallback((_, data) => {
    const currentData = optionsData.find(el => el.id === data.value);
    currentData && onChange(currentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, options]);

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
