import { LoaderContainer } from './Loader.styled';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderContainer>
      <TailSpin color="#00BFFF" height={100} width={100} />
    </LoaderContainer>
  );
};

export default Loader;
