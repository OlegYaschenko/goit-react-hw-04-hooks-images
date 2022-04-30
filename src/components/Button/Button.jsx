import { LoadMoreBtn, Container } from './Button.styled';
import propTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <Container>
      <LoadMoreBtn onClick={onClick}>{text}</LoadMoreBtn>
    </Container>
  );
};

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Button;
