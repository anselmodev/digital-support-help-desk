package security;

import security.Encrypt;

public class DefinePass {

    public String hashPassword(String password) {
        Encrypt encPass = new Encrypt();

        String saltedPassword = encPass.SALT + password;
        String hashedPassword = encPass.generateHash(saltedPassword);

        return hashedPassword;
    }


}
