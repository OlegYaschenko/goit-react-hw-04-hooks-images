import { Container, Text } from './ErrorMessage.styled';
import propTypes from 'prop-types';

const ErrorMessage = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

ErrorMessage.propTypes = {
  text: propTypes.string.isRequired,
};

export default ErrorMessage;
