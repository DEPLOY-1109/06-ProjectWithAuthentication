import {app} from './app.js';
import { dbConnect } from './data/dbConnect.js';

dbConnect();

const port = process.env.PORT;
// console.log(process.env.PORT)
app.listen(port, () => {
    console.log(`Server is running at port : ${port} in ${process.env.NODE_ENV} Mode`, );
} )