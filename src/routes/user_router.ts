import express from 'express';
import moment from 'moment';
const router = express.Router();
const User = require('../models/user_model');
const auth = require('../middleware/auth');
const UserDto = require('../dto/user_dto');
const UserLoginInfo = require('../models/user_login_info_model');

router.post('/users', async (req: any, res: any) => {
    try {
        let toDto: any = UserDto.userIn(req.body);
        let user: any = await User.create(toDto);
        let fromDto: any = UserDto.userOut(user);
        let token: any = await user.generateAuthToken();
        res.status(201).json({
            "User": fromDto,
            "Token": token
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req: any, res: any) => {
    try {
        let toDto: any = UserDto.fromLogin(req.body);
        const user = await User.findByCredentials(toDto.email, toDto.password);
        let fromDto: any = UserDto.userOut(user);
        const token = await user.generateAuthToken();
        res.json({
            "User": fromDto,
            "Token": token
        });
    } catch (e) {
        res.status(404).send();
    }
});

router.post('/users/logout', auth, async (req: any, res: any) => {
    try {
        const now = moment().format();
        await UserLoginInfo.update({
            loggedOutDateTime: now
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(202).send();
    } catch (e) {
        res.status(404).send();
    }
});

router.get('/users/profile', auth, async (req: any, res: any) => {
    try {
        const fromDto = UserDto.userOut(req.user);
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(200).json(fromDto);
    } catch (e) {
        res.status(408).send();
    }
});

router.delete('/users/remove', auth, async (req: any, res: any) => {
    try {
        const user = req.user;
        await user.destroy();
        res.status(202).send();
    } catch (e) {
        res.status(408).send();
    }
});

router.put('/users/update', auth, async (req: any, res: any) => {
    const user = req.user;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NAME', 'EMAIL', 'PASSWORD'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ ERROR: 'Invalid updates!' });
    }
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        let toDto: any = UserDto.fromUpdate(req.body);
        const result = await user.update(toDto);
        let fromDto: any = UserDto.userOut(result);
        res.status(202).json(fromDto);
    } catch (e) {
        res.status(408).send();
    }
});

module.exports = router;