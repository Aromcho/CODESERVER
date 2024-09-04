
import { 
    createService, 
    readService, 
    paginateService, 
    readOneService, 
    updateService, 
    destroyService 
} from "../services/product.service.js";

async function read(req, res, next) {
    try {
        const { category, user_id } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (user_id) filter.user_id = user_id;
        const products = await readService(filter);
        if (products.length > 0) {
            return res.response200(products);
        } else {
            return res.error404();
        }
    } catch (error) {
        next(error);
    }
}



async function paginate(req, res, next) {
    try {
        const filter = {};
        const opts = {};

        if (req.query.limit) {
            opts.limit = parseInt(req.query.limit, 10);
        }
        if (req.query.page) {
            opts.page = parseInt(req.query.page, 10);
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.user_id) {
            filter.user_id = req.query.user_id;
        }

        const paginatedProducts = await paginateService(filter, opts);
        const info = {
            totalDocs: paginatedProducts.totalDocs,
            page: paginatedProducts.page,
            totalPages: paginatedProducts.totalPages,
            limit: paginatedProducts.limit,
            prevPage: paginatedProducts.prevPage,
            nextPage: paginatedProducts.nextPage
        };

        return res.paginate(paginatedProducts.docs, info);
    } catch (error) {
        return next(error);
    }
}

async function readOne(req, res, next) {
    try {
        const { pid } = req.params;
        const product = await readOneService(pid);
        if (product) {
            return res.response200(product);
        } else {
            return res.error404();
        }
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const data = req.body;
        data.user_id = req.user._id; // Asigna el ID del usuario que está creando el producto
        const createdProduct = await createService(data);
        return res.response201({
            message: 'Product created successfully',
            product: createdProduct,
        });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { pid } = req.params;
        const newData = req.body;
        const updatedProduct = await updateService(pid, newData);
        return res.response200(updatedProduct);
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { pid } = req.params;
        const deletedProduct = await destroyService(pid);
        return res.response200(deletedProduct);
    } catch (error) {
        next(error);
    }
}



export { read, paginate, readOne, create, update, destroy};
