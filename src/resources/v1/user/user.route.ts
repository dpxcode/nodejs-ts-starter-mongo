import { Router } from 'express';
const router = Router();
import { createOne } from './user.controller';
import { validateCreateUser } from './user.validation';

router.post('/', [validateCreateUser], createOne )
export default router;