import { Router } from 'express';
import {createResume} from "../controllers/resumeBuilder.controller";
import {validate} from "../middlewares/validate.middleware";
import {resumeBodySchema} from "../validations/resumeBody.validation";

const router = Router();

router.post('/generate', validate({body: resumeBodySchema}), createResume);

export default router;
