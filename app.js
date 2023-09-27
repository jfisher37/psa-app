const express = require('express');
const { authRouter, userRouter, projectRouter } = require('./routes');


const app = express()
const PORT = process.env.PORT || 3000;

const apiRouter = express.Router();
apiRouter.use(authRouter);
apiRouter.use(userRouter);
apiRouter.use(projectRouter);



app.use(express.static('./client'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(process.env.PORT || "80.209.137.198" || 3000, () => {
  console.log(`PSA Server is listening on port ${PORT}`)
})
