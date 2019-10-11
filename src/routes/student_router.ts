import { Router } from 'express';
import moment from 'moment';
import { UserLoginInfo } from '../models/user_login_info_model';
import { User } from '../models/user_model';
import { auth } from '../middleware/auth';
import * as userDto from '../dto/user_dto';

const router = Router();

router.get('/students', auth, async (req: any, res: any) => {
    if (req.user.role == 'student') {
        return res.status(403).send();
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let students = await User.findAll({
            where: {
                role: 'student'
            }
        });
        for (let i = 0; i < students.length; i++) {
            students[i] = userDto.userOut(students[i]);
        }
        res.status(200).json(students);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/students/remove/:id', auth, async (req: any, res: any) => {
    if (req.user.role != 'admin') {
        return res.status(403).send();
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        const student = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        await student.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

export { router }