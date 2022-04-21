import express from 'express'
import { addRoute, allRoutes, getSingleRoute, deleteRoute, updateRoute } from '../../controllers/routesController'

const router = express.Router()

router.post('/register', addRoute)

router.get('/', allRoutes)

router.get('/:id', getSingleRoute)

router.delete('/:id', deleteRoute)

router.put('/:id', updateRoute)

export default router 