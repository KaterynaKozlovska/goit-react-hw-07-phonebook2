import { ContactForm } from '../Form/Form';
import { ContactList } from '../List/List';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  selectContactsItems,
  selectIsLoading,
  selectError,
} from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import Message from '../Message/Message';

import { ToastWrapper } from '../ToastContainer/ToastContainer';

function App() {
  const contactsItems = useSelector(selectContactsItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error === 'ERR_BAD_REQUEST') {
      toast.error('There are some problems! Try again later.');
      return;
    }
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={css.container}>
      {isLoading && <TailSpin color="navy" />}
      <h1 className={css.title}>Phonebook</h1>
      <section className={css.section}>
        <ContactForm />
      </section>
      <section className={css.section}>
        <h2 className={css.title}>Contacts</h2>
        {contactsItems.length !== 0 ? (
          <>
            <Filter />
            <ContactList />
          </>
        ) : (
          <Message message="There are no contacts in your Phonebook. Please add your first contact!" />
        )}
      </section>
      <ToastWrapper />
    </div>
  );
}
export default App;
