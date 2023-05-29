import { Request, Response, NextFunction } from 'express';
import { VendorLoginInput } from '../dto';
import { ValidatePassword } from '../utility';
import { Vendor } from '../models';


export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInput>req.body;

    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor !== null) {

        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

        if (validation) {
            return res.json(existingVendor);
        } else {
            return res.json({ "message": "email or password not valid." });
        }
    }

    return res.json({ "message": "Login credentials not valid." });
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {

}