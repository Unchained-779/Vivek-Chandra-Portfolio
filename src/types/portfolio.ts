export interface ArchitectureFlowStep {
  title: string
  subtitle: string
  tag: string
  color: string
}

export interface EngineeringInnovation {
  number: number
  title: string
  summary: string
  technicalDetails: string[]
  codeSnippet?: string
}

export interface Project {
  id: string
  title: string
  category: string
  period: string
  tagline: string
  statusBadges: string[]
  techStack: string[]
  links: {
    liveApp?: string
    swaggerDocs?: string
    github: string
  }
  problemStatement: string
  architectureFlow: ArchitectureFlowStep[]
  innovations: EngineeringInnovation[]
}

export interface DefenseDrill {
  id: string
  question: string
  category: string
  quickTake: string
  rationale: string[]
  tradeOffs: string
  codeSnippet?: string
  codeLanguage?: string
}

export interface SkillCategory {
  title: string
  iconName: string
  accentColor: string
  skills: Array<{
    name: string
    highlight?: boolean
    level?: string
  }>
}

export interface TimelineItem {
  id: string
  role: string
  organization: string
  location: string
  period: string
  type: 'experience' | 'leadership' | 'education'
  metricHighlights: string[]
  descriptionBullets: string[]
}

export interface ContactFormData {
  name: string
  email: string
  opportunityType: string
  message: string
}
