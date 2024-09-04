import { readService, readOneService, createService, updateService, destroyService, destroyAllService } from "../services/carts.service.js";

async function read(req, res, next) {
    try {
        const { user_id } = req.query;
        const all = await readService(user_id ? { user_id } : {});
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        } else {
            return res.error404();
        }
    } catch (error) {
        return next(error);
    }
}

async function readOne(req, res, next) {
    try {
        const { nid } = req.params;
        if (!nid) {
            return res.error400("NID is required");
        }
        const one = await readOneService(nid);
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function create(req, res, next) {
    try {
        const data = req.body;
        const one = await createService(data);
        return res.response201(one);
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const { nid } = req.params;
        const data = req.body;
        const one = await updateService(nid, data);
        return res.response200(one);
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { nid } = req.params;
        const one = await destroyService(nid);
        return res.response200(one);
    } catch (error) {
        return next(error);
    }
}

async function destroyAll(req, res, next) {
    try {
        const { nid } = req.query;
        const result = await destroyAllService(nid);
        return res.response200(result);
    } catch (error) {
        return next(error);
    }
}

export { read, readOne, create, update, destroy, destroyAll };
