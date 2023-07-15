import axios from 'axios';
import GraphqlQueries from './graphql_queries';
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.API_URL ?? "";
const accessToken = process.env.ACCESS_TOKEN ?? "";

const tokenAuthHeader = { 'Authorization': `Bearer ${accessToken}` } as const;


export type QueryReturnType<T> = {
    data: T,
    status: "OK"
} | {
    data: any
    status: "ERROR"
}

export default async function queryApi(query: GraphqlQueries): Promise<QueryReturnType<any>> {
    try {
        const response = await axios.post(apiUrl, { query }, { headers: tokenAuthHeader });
        if (response.status !== 200) {
            throw new Error('An error occurred');
        }
        return {
            data: response.data,
            status: 'OK'
        };
    } catch (error) {
        return {
            data: error,
            status: 'ERROR'
        };
    }
};