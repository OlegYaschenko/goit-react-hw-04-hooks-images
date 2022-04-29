import { LoadMoreBtn, Container } from './Button.styled';

const Button = ({ text, onClick }) => {
  return (
    <Container>
      <LoadMoreBtn onClick={onClick}>{text}</LoadMoreBtn>
    </Container>
  );
};

export default Button;
