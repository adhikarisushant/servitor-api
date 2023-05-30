import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vendor.findOne({ email: email });
    } else {
        return await Vendor.findById(id);
    }
}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, ownerName, foodType, pincode, address, phone, email, password } = <createVendorInput>req.body;

    const existingVendor = await FindVendor('', email);

    if (existingVendor !== null) {
        return res.json({ 'message': 'user with this email already exists' });
    }

    // generate salt

    const salt = await GenerateSalt();

    // encrypt the password using salt

    const userPassword = await GeneratePassword(password, salt);

    console.log("userPassword =>", typeof userPassword, userPassword);

    const createdVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: [],
    })

    res.json(createdVendor);
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find();

    if (vendors !== null) {
        return res.json(vendors);
    }

    res.json({ message: 'vendors is empty' });
}


export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;

    const vendor = await FindVendor(vendorId)

    if (vendor !== null) {
        return res.json(vendor);
    }

    res.json({ message: 'vendor with that id not available.' })

}