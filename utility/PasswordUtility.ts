import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto';
import config from '../config';

// type Config = string | undefined;


export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = (payload: VendorPayload) => {

    const signature = jwt.sign(payload, config.SECRET);
}
