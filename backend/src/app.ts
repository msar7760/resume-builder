import express from 'express';
import { globalErrorHandler } from './middlewares/error.middleware';
import resumeBuilderRoutes from "./routes/resumeBuilder.route";

function createApp() {
    const app = express();
    app.use(express.json());
    app.use('/api', resumeBuilderRoutes);
    app.use(globalErrorHandler);

    return app;
}

export default createApp;