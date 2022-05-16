import Preloader from '../Preloader/Preloader';

const Loader = ({loading, ...props}) => (WrapperComponent) => {
    return loading ? <Preloader /> : <WrapperComponent {...props} />

};

export default Loader;