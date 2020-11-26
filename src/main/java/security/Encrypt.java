package security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Encrypt {

    protected String MASTER_KEY = "7ff4b03006d2fd188110b72d44267207";
    public String SALT = "02bb12fbbc1dcf408d7dab12f43f5cf6";

    Base64.Encoder enc = Base64.getEncoder();
    Base64.Decoder dec = Base64.getDecoder();

    public String encode64(String data) {

        try {

            String dataAndKey = data + "###" + MASTER_KEY;

            // encode data using BASE64
            String encoded = enc.encodeToString(dataAndKey.getBytes());

            return encoded;

        } catch (Exception e) {

            System.out.println(e);
            return null;

        }

    }

    public String decode64(String data) {

        try {

            String decoded = new String(dec.decode(data));

            String[] splitedData = decoded.split("###");

            if (new String(splitedData[1]).equals(MASTER_KEY)) {

                return splitedData[0];

            }

        } catch (Exception e) {

            System.out.println(e);

        }

        return null;

    }

    public String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {

            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
            for (int idx = 0; idx < hashedBytes.length; ++idx) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }

        } catch (NoSuchAlgorithmException e) {

            System.out.println(e);

        }

        return hash.toString();
    }

    public String generateMD5Hash(String md5) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            byte[] array = md.digest(md5.getBytes());
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < array.length; ++i) {
                sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1, 3));
            }
            return sb.toString();
        } catch (java.security.NoSuchAlgorithmException e) {
        }
        return null;
    }
}
