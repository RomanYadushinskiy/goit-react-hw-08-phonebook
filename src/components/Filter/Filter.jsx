import './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/contacts/selectors';
import { setFilter } from 'redux/contacts/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const getChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={getChangeFilter}
        placeholder="Find contacts by name"
      />
    </label>
  );
};