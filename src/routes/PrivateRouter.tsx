import { useAppSelector } from "../app/hook"
import { Navigate, PathRouteProps } from "react-router-dom"

interface PrivateRouteProps extends PathRouteProps {
    children: React.ReactNode;
}

const PrivateRouter = ({ children }: PrivateRouteProps) => {
    const {user} = useAppSelector((state) => state.user)
    if (user) return children
    return <Navigate to="/sign-in" replace={true}/>
}

export default PrivateRouter