export interface SkillGap {
  skill: string;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  priority: 'High' | 'Medium' | 'Low';
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  topics: string[];
  resources: string[];
}

export interface Project {
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
}

export interface Mentor {
  name: string;
  role: string;
  company: string;
  expertise: string[];
  bio: string;
  avatar: string;
}

export interface Resource {
  title: string;
  type: 'Course' | 'Book' | 'Article' | 'Tool';
  provider: string;
  url: string;
  description: string;
}

export interface CareerPath {
  targetRole: string;
  roadmap: RoadmapStep[];
  skillsGap: SkillGap[];
  projects: Project[];
  realPathConcepts: string[];
  mentors: Mentor[];
  recommendedResources: Resource[];
}
