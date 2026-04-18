const { GoogleGenAI } = require("@google/genai");
<<<<<<< HEAD
const {zod} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema")
=======
>>>>>>> ef09213ab4122a33959ce28860a2af15fc638d8f

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

<<<<<<< HEAD
const interviewReportSchema = z.object({

})

async function generateInterviewReport({resume,selfDescription,jobDescription}){


=======
async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello gemini! Explain what is Interview"
    })

    console.log(response.text)
>>>>>>> ef09213ab4122a33959ce28860a2af15fc638d8f
}

module.exports = invokeGeminiAi