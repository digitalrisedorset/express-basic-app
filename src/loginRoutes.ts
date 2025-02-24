import {Router, Request, Response, NextFunction} from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        return next()
        return; // reinforce the idea that we return nothing
    }

    res.status(403)
    res.send('Not permitted')
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
        `)
    } else {
        res.send(`
        <div>
            <div>You are not logged in</div>
            <a href="/login">Login</a>
        </div>
    `}
})

router.get('/login', (req: Request, res: Response) => {
    res.send(`
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email" />
        </div>
        <div>
            <label>Password</label>
            <input name="password" />
        </div>
        <button>Submit</button>
    </form>
    `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === 'test@test.com' && password === 'test') {
        req.session = { loggedIn: true }
        res.redirect('/')
    } else {
        res.redirect('/denied');
    }

    res.send(email + password)
})

router.post('/denied', (req: RequestWithBody, res: Response) => {
    res.send('Access denied')
})

router.get('/logout', (req: RequestWithBody, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: RequestWithBody, res: Response) => {
    res.send('welcome in protected content')
})

export { router }