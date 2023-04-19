import { useKeycloak } from '@react-keycloak/web';

export default function PrivateRoute(props) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return keycloak.login();
    }
    // eslint-disable-next-line react/prop-types
    return <>{props.children}</>;
}
