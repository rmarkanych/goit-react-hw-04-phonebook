import PropTypes from 'prop-types';
const Title = ({ title }) => {
  return (
    <>
      <h3>{title}</h3>
    </>
  );
};
Title.propTypes = {
  title: PropTypes.string,
};
export default Title;
