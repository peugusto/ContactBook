import express from 'express'
import inputValidation from '../middlewares/input-validation.js'
import userController from '../controllers/user-controller.js'
import isAuth from '../middlewares/isAuth.js'
import contactController from '../controllers/contact-controller.js'
import contactValidation from '../middlewares/contact-validation.js'


const apiRouter = express.Router()

apiRouter.post('/users', inputValidation, userController.signUp)
apiRouter.post('/login', inputValidation,userController.signIn);
apiRouter.get('/auth',userController.check)

apiRouter.get('/contacts',isAuth, contactController.getContacts)
apiRouter.get('/contacts/:id',isAuth, contactController.getContact)
apiRouter.patch('/contacts/:id',isAuth, contactValidation,contactController.editContact)
apiRouter.post('/contacts',isAuth, contactValidation,contactController.addContact)
apiRouter.delete('/contacts',isAuth, contactController.deleteContact)

apiRouter.post('/logout',isAuth,userController.logout)

export default apiRouter