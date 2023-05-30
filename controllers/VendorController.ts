import { Request, Response, NextFunction } from 'express';
import { EditVendorInputs, VendorLoginInput } from '../dto';
import { GenerateSignature, ValidatePassword } from '../utility';
import { Food, Vendor } from '../models';
import { FindVendor } from './AdminController';
import { CreateFoodInput } from '../dto/Food.dto';


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

    if (user) {
        const existingVendor = await FindVendor(user._id)

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor information not found!" });
}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { foodType, name, address, phone } = <EditVendorInputs>req.body;

    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor(user._id)

        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor information not found!" });
}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVendor = await FindVendor(user._id)

        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const savedResult = await existingVendor.save()
            return res.json(savedResult);
        }

        return res.json(existingVendor)
    }

    return res.json({ "message": "Vendor information not found!" });
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;

        const vendor = await FindVendor(user._id);

        if (vendor !== null) {

            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename);

            const createFood = await Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                images: images,
                readyTime: readyTime,
                price: price,
                rating: 0,
            })

            vendor.foods.push(createFood);
            const result = await vendor.save();

            return res.json(result);
        }

    }

    return res.json({ "message": "Something went wrong with food." });
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {

        const foods = await Food.find({ vendorId: user._id });

        if (foods !== null) {
            return res.json(foods);
        }

    }

    return res.json({ "message": "Foods information not found." });
}