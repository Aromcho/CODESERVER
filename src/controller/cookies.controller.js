async function setCookies(req, res, next) {
    try {
      return res
        .cookie('cookie', 'cookieValue', { maxAge: 100000 })
        .cookie('cookieName2', 'cookieValue2', { maxAge: 1000 })
        .cookie('online', 'true', { maxAge: 1000 })
        .json({ message: 'Cookie se vence en 10s' });
    } catch (error) {
      return next(error);
    }
  }
  
  async function getCookies(req, res, next) {
    try {
      const cookies = req.cookies;
      const online = req.cookies.online;
      return res.json({ cookies, online });
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroyCookie(req, res, next) {
    try {
      const { cookie } = req.params;
      return res.clearCookie(cookie).json({ message: `Cookie ${cookie} eliminada` });
    } catch (error) {
      return next(error);
    }
  }
  
  async function setSignedCookie(req, res, next) {
    try {
      return res.cookie("role", "admi", { signed: true }).json({ message: "Cookie firmada" });
    } catch (error) {
      return next(error);
    }
  }
  
  async function getSignedCookies(req, res, next) {
    try {
      return res.json({ cookies: req.signedCookies });
    } catch (error) {
      return next(error);
    }
  }
export { setCookies, getCookies, destroyCookie, setSignedCookie, getSignedCookies };