import express from 'express';
import queryApi from './query_api';
import endpoints from './endpoints';

const port = 4000;

const app = express();


for (const endpoint of Object.values(endpoints)) {
    app.get(endpoint.name, async (req, res) => {
        const returnedQueryData = await queryApi(endpoint.query);
        const resolvedData = endpoint.handler(returnedQueryData);
        res.status(resolvedData.status).json(resolvedData.data);
    })
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
