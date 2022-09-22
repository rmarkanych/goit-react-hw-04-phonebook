import Title from 'components/Title/Title';
import s from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';
const ContactList = ({ contactsList, removeContact }) => {
  return (
    <div className={s.wrapper}>
      {contactsList().length < 1 ? (
        <Title title="Add new contact to your list ⬆" />
      ) : (
        <ul className={s.list}>
          {contactsList().map(({ id, name, number }) => {
            return (
              <li className={s.item} key={id}>
                <p>
                  {name}: {number}
                </p>
                <button className={s.btn} onClick={() => removeContact(id)}>
                  Delete 🗑
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
ContactList.propTypes = {
  contactsList: PropTypes.func,
  removeContact: PropTypes.func,
};
export default ContactList;
