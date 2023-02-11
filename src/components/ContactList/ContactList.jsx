// import './ContactList.module.css';
// import { useSelector } from 'react-redux';
// import { getFilter } from '../../redux/contacts/filterSlice';
// import {
//   useGetContactsQuery,
//   useDeleteContactMutation,
// } from '../../redux/contacts/contactsSlice';

// export const ContactList = () => {
//   const filter = useSelector(getFilter);
//   const { data: contacts, isFetching } = useGetContactsQuery();
//   const [deleteContact, { isLoading }] = useDeleteContactMutation();

//   const findContacts = () => {
//     const normalizedFilter = filter.toLowerCase();
//     if (contacts) {
//       return contacts.filter(contact =>
//         contact.name.toLowerCase().includes(normalizedFilter)
//       );
//     }
//   };

//   const filteredContacts = findContacts();

//   return (
//     <>
//       {isFetching && <p>Loading...</p>}
//       {contacts && (
//         <ul>
//           {filteredContacts.map(({ id, name, phone }) => {
//             return (
//               <li key={id}>
//                 <div>
//                   <h3>{name}:</h3>
//                   <p>{phone}</p>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     deleteContact(id);
//                   }}
//                 >
//                   {isLoading ? '...' : 'Delete'}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </>
//   );
// };

import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/contacts/operations';
import { getContacts, getFilter } from 'redux/contacts/selectors';
import css from './ContactList.module.css';

const getVisibleContacts = (contacts, filter) => {
  if (!filter) {
    return contacts;
  } else {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  const dispatch = useDispatch();
  const handleDelete = id => dispatch(delContact(id));

  return (
    <div className={css.wraperContactList}>
      <ul className={css.contactList}>
        {visibleContacts.map((contact, id) => (
          <li key={id} className={css.contactListItem}>
            {contact.name}: {contact.number}
            <button
              type="button"
              className={css.contactListItemBtn}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
