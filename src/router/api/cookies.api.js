import CustomRouter from "../CustomRouter.js";
import { setCookies, getCookies, destroyCookie, setSignedCookie, getSignedCookies } from "../../controller/cookies.controller.js";

class CookiesRouter extends CustomRouter {
  init() {
    this.read('/set', ["PUBLIC"], setCookies); // Cualquier usuario puede establecer cookies
    this.read('/', ["PUBLIC"], getCookies); // Cualquier usuario puede obtener cookies
    this.destroy('/destroy/:cookie', ["PUBLIC"], destroyCookie); // Cualquier usuario puede eliminar una cookie
    this.read('/signed', ["PUBLIC"], setSignedCookie); // Cualquier usuario puede establecer una cookie firmada
    this.read('/get-signed', ["PUBLIC"], getSignedCookies); // Cualquier usuario puede obtener cookies firmadas
  }
}

const cookiesRouter = new CookiesRouter();
export default cookiesRouter.getRouter();

