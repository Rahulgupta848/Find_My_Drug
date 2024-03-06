export interface loginState {
     email: string;
     password: string;
     rememberMe: boolean;
     loading: boolean;
     validate: boolean;
     role: string;
}

export interface registerState {
     name?: string,
     pharmacyName?: string,
     email?: string,
     password?: string,
     mobileNo?: number | string;
     role?: string,
     country?: string,
     state?: string,
     city?: string,
     pincode?: number | string;
     addressLine1?: string,
     loading?:boolean;
     validate?:boolean;
     confirmPassword?:string;
}