const router = require('express').Router();
const upload = require('../middlewares/Upload')
const {createProduct,updateProduct,deleteProduct,uploadSingle,fetchProduct} = require('../Controllers/Product');


router.get('/', fetchProduct);
router.post('/', upload.single('image'), createProduct);
router.put('/:id',upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);
router.post('/upload', upload.single('image'), uploadSingle);


module.exports = router;
