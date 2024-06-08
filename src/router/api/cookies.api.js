import { Router } from "express";

const cookieRouter = Router();

// Endpoint para obtener una cookie
cookieRouter.get('/set', (req, res, next) => {
    try {
        return res
       .cookie('cookie', 'cookieValue', { maxAge: 100000 })
       .cookie('cookieName2', 'cookieValue2', { maxAge: 1000 }) 
       .cookie('online', 'true', { maxAge: 1000 })
       .json({ message: 'Cookie se vence en 10s' });
    } catch (error) {
        return next(error);
        
    }
})
    

cookieRouter.get('/', (req, res,next) => {
    try {
        const cookies = req.cookies;
        const online = req.cookies.online;
        return res.json({ cookies, online });
    } catch (error) {
        return next(error);
    }
});
    

// Endpoint para eliminar una cookie
cookieRouter.get('/destroy/:cookie', (req, res, next) => {
    const { cookie } = req.params;
    return res.clearCookie(cookie).json({ message: 'Cookie eliminada' + cookie + "eliminada"});
    }
    
);

cookieRouter.get('/signed', (req, res, next) => {
    try {
        return res.cookie("role", "admi", { signed: true }).json({ message: "Cookie firmada" });

    } catch (error) {
        return next(error);
    }
});
cookieRouter.get('/get-signed', (req, res, next) => {
    try {
        return res.json({ cookies: req.signedCookies });
    } catch (error) {
        return next(error);
    }
});
 export default cookieRouter;
