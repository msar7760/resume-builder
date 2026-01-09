import express from 'express';
import { globalErrorHandler } from './middlewares/error.middleware';
import resumeBuilderRoutes from "./routes/resumeBuilder.route";
import cors from 'cors';

function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api', resumeBuilderRoutes);
    app.use(globalErrorHandler);

    return app;
}

export default createApp;