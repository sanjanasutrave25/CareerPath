import { GoogleGenAI, Type } from "@google/genai";
import { CareerPath } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateCareerPaths(currentSkills: string, targetJobs: string): Promise<CareerPath[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the career transition from current skills: "${currentSkills}" to target jobs: "${targetJobs}".
    If multiple target jobs are provided, provide a separate detailed career path for each.
    For each path, provide a detailed roadmap with specific learning topics, skill gap analysis, recommended projects (Beginner to Advanced), 3 potential mentor profiles, 5 learning resources, and a list of 5-7 "Real Path Concepts" (key takeaways from people who successfully made this transition).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            targetRole: { type: Type.STRING },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                  resources: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["title", "description", "duration", "topics", "resources"]
              }
            },
            skillsGap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  currentLevel: { type: Type.NUMBER },
                  targetLevel: { type: Type.NUMBER },
                  priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                },
                required: ["skill", "currentLevel", "targetLevel", "priority"]
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] },
                  technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "description", "difficulty", "technologies"]
              }
            },
            realPathConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
            mentors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  expertise: { type: Type.ARRAY, items: { type: Type.STRING } },
                  bio: { type: Type.STRING },
                  avatar: { type: Type.STRING }
                },
                required: ["name", "role", "company", "expertise", "bio", "avatar"]
              }
            },
            recommendedResources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["Course", "Book", "Article", "Tool"] },
                  provider: { type: Type.STRING },
                  url: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "type", "provider", "url", "description"]
              }
            }
          },
          required: ["targetRole", "roadmap", "skillsGap", "projects", "realPathConcepts", "mentors", "recommendedResources"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as CareerPath[];
}
