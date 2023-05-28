import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, ownerName, foodType, pincode, address, phone, email, password } = <createVendorInput>req.body;

    const CreateVendor = await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: password,
        salt: '',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    })

    res.json({ name, ownerName, foodType, pincode, address, phone, email, password });
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from admin controller' })
}


export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from admin controller' })
}