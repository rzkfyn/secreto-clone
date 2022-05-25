import { client, dbname } from './db';

export const registerNewUser = async (name: string, secretId: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        client.connect((err, client) => {
            if (err) return reject('Koneksi ke database gagal');
            const db = client?.db(dbname);
            db?.collection('users').insertOne({
                name,
                secretId
            }, 
            (err, res) => {
                console.log(res);
                if (err) return reject(err);
                return res ? resolve(`${res?.insertedId}`) : resolve(void 0);
            });
        });
    });
}