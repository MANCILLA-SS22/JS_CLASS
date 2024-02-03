import {Router} from 'express';

const router = Router();

router.get('/', function(req,res){
    res.render('cookiesIndex',{});
});

export default router