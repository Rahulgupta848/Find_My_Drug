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

export interface authState {
     name?: string,
     pharmacyName?: string,
     email?: string,
     mobileNo?: number | string;
     role?: string,
     country?: string,
     state?: string,
     city?: string,
     pincode?: number | string;
     addressLine1?: string,
     loading?:boolean;
     id?:string;
     token?:string;
}

export interface pageState{
     pageNo:number;
     pageSize:any;
}

export interface newDrugState{
     name:string;
     quantity:number;
     loading:boolean;
     validate:boolean;
}

export interface pharmacyState{
     items:any;
     itemCount:number;
     loading:boolean;
}