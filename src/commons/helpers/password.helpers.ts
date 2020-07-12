import { genSalt, hash, compare } from 'bcrypt';
import { saltPasword } from 'src/commons/constants';


export async function hashPassword(password: string): Promise<string> {
    return new Promise(resolve => {
        genSalt(saltPasword, function (err, salt) {
            hash(password, salt, function (err, hash) {
                resolve(hash)
            });
        });

    })
}
export async function compareHashPassword(password: string, hash: string): Promise<boolean> {
    return new Promise(resolve => {
        compare(password, hash).then(function (result) {
            resolve(result)
        });


    })
}