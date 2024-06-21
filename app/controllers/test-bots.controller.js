import axios from "axios";
import path from 'path';
import FormData from "form-data";
import db from "../models/index.js";
import fs from 'fs';

const { testBots: TestBots, user: User } = db;

export const testBots = async (req, res) => {

    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).send({
                message: "Not Found User!"
            })
        }

        let data = {
            scanner: '',
            social: '',
            ai_face: '',
            rr_photo: '',
            rr_user: ''
        }

        const result = await TestBots.create(data);

        const currentDate = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).replace(/[/,:]/g, '.').replace(/\s/g, '.');

        // Scanner

        const scannerRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/scrape`, {
            query: 'trump',
            currentDate: `scanner_${currentDate}_test`,
            no_google: false,
            no_bing: false,
            save_results: true,
            max_pages: 2
        });

        await axios.post(`${process.env.BOT_API_ENDPOINT}/zip`, {
            folder_name: `scanner_${currentDate}_test`,
            email: user.email,
            username: user.name
        });


        result.update({
            scanner: `scanner_${currentDate}_test`
        });

        io.emit('test_scanner_finished', `scanner_${currentDate}_test`);

        // Social Media Scanner

        const socialScannerRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/social`, {
            keywords: `trump`,
            limit: 1,
            out: `sm_scanner_${currentDate}_test`,
            email: user.email,
            username: user.name
        })

        await result.update({
            sm_scanner: `sm_scanner_${currentDate}_test`
        })

        io.emit('test_sm_scanner_finished', `sm_scanner_${currentDate}_test`);

        // AI Face Scanner

        const photoFilePath = path.join(`./assets/trump.png`);

        const ai_face_data = new FormData();
        ai_face_data.append('out', `ai_face_${currentDate}_test`);
        ai_face_data.append('photo', fs.createReadStream(photoFilePath));
        ai_face_data.append('email', user.email);
        ai_face_data.append('username', user.name);

        const aiFaceScannerRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/ai-face`, ai_face_data, {
            headers: {
                ...ai_face_data.getHeaders()
            }
        });

        await result.update({
            ai_face: `ai_face_${currentDate}_test`
        })

        io.emit('test_ai_face_finished', `ai_face_${currentDate}_test`);

        // R&R Photo Scanner

        const rr_photo_data = new FormData();
        rr_photo_data.append('out', `rr_photo_${currentDate}_test`);
        rr_photo_data.append('photo', fs.createReadStream(photoFilePath));
        rr_photo_data.append('email', user.email);
        rr_photo_data.append('username', user.name);

        const rrPhotoScannerRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/rr/photo`, rr_photo_data, {
            headers: {
                ...rr_photo_data.getHeaders()
            }
        });

        await result.update({
            rr_photo: `rr_photo_${currentDate}_test`
        })

        io.emit('test_rr_photo_finished', `rr_photo_${currentDate}_test`);


        // R&R Username Scanner

        const rr_user_data = new FormData();
        rr_user_data.append('out', `rr_user_${currentDate}_test`);
        rr_user_data.append('name', `banditaa`);
        rr_user_data.append('email', user.email);
        rr_user_data.append('username', user.name);

        const rrUserScannerRes = await axios.post(`${process.env.BOT_API_ENDPOINT}/scan/rr/user`, rr_user_data, {
            headers: {
                ...rr_user_data.getHeaders()
            }
        });

        await result.update({
            rr_user: `rr_user_${currentDate}_test`
        });

        io.emit('test_rr_user_finished', `rr_user_${currentDate}_test`);

        res.status(200).send(result);


    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }

}

export const downloadTestResult = async (req, res) => {

    const { folder_name } = req.query;

    try {
        
        const response = await axios.post(`${process.env.BOT_API_ENDPOINT}/download`, {
            folder_name: folder_name
        }, {
            responseType: "stream"
        });

        response.data.pipe(res);

    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }

}