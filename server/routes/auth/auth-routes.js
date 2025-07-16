const Router = require('express')
const {loginUser, registerUser, logoutUser, authMiddleware} = require('../../controllers/auth/auth-contoller.js')

const router = Router()

router.post('/register', registerUser )
router.post('/login', loginUser )
router.post('/logout', logoutUser )
router.get('/check-auth', authMiddleware, async(req, res) => {
    const user = req.user
    return res.status(200).json({
        success: true,
        message: 'Authenticated user',
        user
    })
} )



module.exports = router