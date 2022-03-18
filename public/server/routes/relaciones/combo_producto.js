const { Router } = require('express');

const {
    test,
    list,
    getOne,
    update,
    create
} = require('../../controllers/relaciones/combo_producto');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.post(    '/'     , create);
router.put(     '/:id'  , update);


module.exports = router;