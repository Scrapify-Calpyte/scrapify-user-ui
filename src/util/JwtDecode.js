import jwt_decode from 'jwt-decode';

export default function JwtDecode(token) {
    const decoded = jwt_decode(token);
    return decoded;
}
