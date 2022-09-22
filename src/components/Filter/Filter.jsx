import Title from 'components/Title/Title';
import PropTypes from 'prop-types';
const Filter = ({ filterChange }) => {
  return (
    <>
      <Title title="Find contacts by name" />
      <label>
        <input type="text" onChange={e => filterChange(e)} />
      </label>
    </>
  );
};
Filter.propTypes = {
  filterChange: PropTypes.func,
};
export default Filter;
