import PropTypes from 'prop-types';
import { css } from './Message.module.css';

function Message({ message }) {
  return <>{message && <div className={css.message}>{message}</div>}</>;
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
