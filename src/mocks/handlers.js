import { graphql } from 'msw';
import { mockedResponse } from './utils';

export const handlers = [
    graphql.query('catchAll', (req) => mockedResponse(req)),
];
