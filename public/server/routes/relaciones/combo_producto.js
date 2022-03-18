const { Router } = require('express');

const {
    test,
    list,
    getOne,
    update
} = require('../../controllers/relaciones/combo_producto');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.put(     '/:id'  , update);


module.exports = router;