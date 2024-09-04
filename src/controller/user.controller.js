import { createService, readService, readOneService, updateService, destroyService } from "../services/user.service.js"

async function create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.response201(one);
    } catch (error) {
      return next(error);
    }
  }
  
  async function read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        return res.response200(all);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        return res.response200(one);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }
export { create, read, readOne, update, destroy };