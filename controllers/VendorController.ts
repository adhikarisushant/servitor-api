import { Request, Response, NextFunction } from 'express';
import { VendorLoginInput } from '../dto';
import { ValidatePassword } from '../utility';
import { FindVendor } from './AdminController';


export const VendorLogin = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInput>req.body;

    const existingVendor = await FindVendor('', email);

    if(existingVendor !== null) {
        return res.json({ "message": "email or password is valid." });
        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

        if(validation) {
            return res.json(existingVendor);
        } else {
            return res.json({ "message": "email or password not valid." });
        }

    }

    return res.json({ "message": "Login credentials not valid." });
}