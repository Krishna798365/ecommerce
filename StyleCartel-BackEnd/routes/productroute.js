import express from 'express'
import  {listproduct,addproduct,deleteproduct,singleproduct} from '../controllers/ProductController.js'
import upload from '../middleware/multter.js';
import adminAuth from '../middleware/adminauth.js';
const productrouter = express.Router();
productrouter.post('/add',adminAuth,upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addproduct);
productrouter.get('/list',listproduct);
productrouter.post('/single',singleproduct);
productrouter.post('/delete',adminAuth,deleteproduct);
export default productrouter;