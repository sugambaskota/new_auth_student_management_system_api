import { Router } from 'express';

const router: any = Router();

router.use('/*', (req: any, res: any) => {
    res.status(404).json({
        "SORRY": " ☹ "
    });
});

export { router };