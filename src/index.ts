import express from 'express'
import { router } from './loginRoutes'
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const app = express()

app.use(bodyParser.urlencoded({extended:true})) // this is what makes the pos variables to appear in the router
app.use(cookieSession({ keys: ['ksjsj']}))
app.use(router)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})