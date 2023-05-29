import { Request, Response, NextFunction } from 'express';
import { EditVendorInputs, VendorLoginInput } from '../dto';
import { GenerateSignature, ValidatePassword } from '../utility';
import { Vendor } from '../models';
import { FindVendor } from './AdminController';


export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInput>req.body;

    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor !== null) {

        const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

        if (validation) {

            const signature = GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodType: existingVendor.foodType,
                name: existingVendor.name
            })

            return res.json(signature);
        } else {
            return res.json({ "message": "email or password not valid." });
        }
    }

    return res.json({ "message": "Login credentials not valid." });
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user) {
        const existingVendor = await FindVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({"message": "Vendor information not found!"});
}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
   
    const { foodType, name, address, phone } = <EditVendorInputs>req.body;

    const user = req.user;

    if(user) {
        const existingVendor = await FindVendor(user._id)

        if(existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
        }

        return res.json(existingVendor)
    }

    return res.json({"message": "Vendor information not found!"});
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user) {
        const existingVendor = await FindVendor(user._id)

        if(existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedResult = await existingVendor.save()
            return res.json(savedResult);
        }

        return res.json(existingVendor)
    }

    return res.json({"message": "Vendor information not found!"});
}