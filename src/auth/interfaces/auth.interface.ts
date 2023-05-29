export interface SignupInfo {
    phone: string;
    password: string;
    name: string;
}

export interface LoginInfo {
    phone: string;
    password: string;
}

export interface JwtPayload {
    user_id: string;
}

export enum AuthError {
    PhoneAlreadyInUse = 'phone number already in use',
    InvalidCredentials = 'Invalid credentials',
}
