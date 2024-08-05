import { Configuration } from "openai";
export const configureopenAi = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.Organization,
    });
    return config;
};
//# sourceMappingURL=openai-config.js.map