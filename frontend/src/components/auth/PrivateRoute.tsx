import { Navigate } from 'react-router-dom';
import { useContext, ReactNode } from 'react';
import GlobalStateContext from '@/context/globalStateContext';

// Add a type for the props to include children
type PrivateRouteProps = {
	children?: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { isLoggedIn } = useContext(GlobalStateContext);
	console.log(isLoggedIn);

	return isLoggedIn ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
