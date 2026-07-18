require('dotenv').config()
const pool = require('./src/config/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');


const usernames = ["dheeraj.naik2000", "ashwiniun10"];
const saltRounds = 10;
const myPlaintextPassword = 'Surekhanaik@100';

const addAdmins = async (myPlaintextPassword, saltRounds, usernames) => {
    try {
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        for (const username of usernames) {
            await pool.execute(
                `INSERT INTO admin (id, username, password) VALUES (?, ?, ?)`,
                [uuidv4(), username, hash]
            );
        }
        console.log('inserted successfully');

    }
    catch (error) {
        console.log(error.message)
    } finally {
        pool.end()
        console.log('DB closed')
    }
}

addAdmins(myPlaintextPassword, saltRounds, usernames)

