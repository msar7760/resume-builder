import { Response, Request } from 'express';
import { sendFileSuccess} from '../utils/response.handler';
import { asyncHandler } from '../utils/async.handler';
import * as resumeBuilderService from "../services/resumeBuilder.service";

export const createResume = asyncHandler(async (req: Request, res: Response) => {
    const buffer = await resumeBuilderService.createResume(req.body);
    return sendFileSuccess(res, buffer, 'resume.docx');
});