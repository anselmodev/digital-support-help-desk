package security;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieSystem extends HttpServlet {

    Encrypt encrypt = new Encrypt();

    public void setCookie(HttpServletResponse resp, String cookieName, String data) {

        String keyCookie = encrypt.generateMD5Hash(cookieName);
        String hashCookie = encrypt.encode64(data);

        Cookie newCookie = new Cookie(keyCookie, hashCookie);
        newCookie.setMaxAge(60*60*24);

        resp.addCookie(newCookie);

    }

    public String getCookie(HttpServletRequest req, String cookieName) {

        Cookie[] allCookies = req.getCookies();
        String userNumber = null;

        if (allCookies != null) {

            for (Cookie cookie : allCookies) {

                if (cookie.getName().equals(encrypt.generateMD5Hash(cookieName))) {

                    userNumber = encrypt.decode64(cookie.getValue());

                }
            }

        }

        return userNumber;

    }

    public String removeCookie(HttpServletRequest req, HttpServletResponse resp) {

        Cookie[] allCookies = req.getCookies();

        if (allCookies != null) {

            for (int i = 0; i < allCookies.length; i++) {

                Cookie cookie = allCookies[i];
                allCookies[i].setValue(null);
                allCookies[i].setMaxAge(0);
                resp.addCookie(cookie);
            }

        }

        return "logout-success";

    }
}
