import {generateResumeDocx} from "../utils/generateDocx.util";

export const createResume = async (jsonContent: string): Promise<Buffer> => {
    return await generateResumeDocx(jsonContent);
};