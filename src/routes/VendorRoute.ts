import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.use(Authenticate);
router.post('/login', VendorLogin);
router.get('/profile', GetVendorProfile);
router.patch('/profile', UpdateVendorProfile);
router.patch('/service', UpdateVendorService);

router.post('/food', AddFood);
router.get('/foods', GetFoods);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from vendor.' });
});

export { router as VendorRoute };