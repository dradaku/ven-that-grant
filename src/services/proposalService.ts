import { GrantResult } from './veniceService';

// Types for proposal management
export interface SavedGrant {
  id: string;
  grant: GrantResult;
  savedAt: string;
}

export interface Proposal {
  id: string;
  grantId: string;
  title: string;
  content: string;
  status: 'draft' | 'optimized' | 'submitted';
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  proposalId: string;
  content: string;
  submissionDate: string;
  createdAt: string;
}

export interface Critique {
  id: string;
  proposalId: string;
  content: string;
  createdAt: string;
  type: 'strength' | 'weakness' | 'suggestion';
}

// Mock storage for saved grants, proposals, reports, and critiques
let savedGrants: SavedGrant[] = [];
let proposals: Proposal[] = [];
let reports: Report[] = [];
let critiques: Critique[] = [];

// Grant Management
export const saveGrant = (grant: GrantResult): SavedGrant => {
  const savedGrant: SavedGrant = {
    id: `saved-${Date.now()}`,
    grant,
    savedAt: new Date().toISOString(),
  };
  
  savedGrants = [...savedGrants, savedGrant];
  return savedGrant;
};

export const getSavedGrants = (): SavedGrant[] => {
  return [...savedGrants];
};

export const removeSavedGrant = (id: string): boolean => {
  const initialLength = savedGrants.length;
  savedGrants = savedGrants.filter(g => g.id !== id);
  return savedGrants.length !== initialLength;
};

// Proposal Management
export const createProposal = (grantId: string, title: string, content: string): Proposal => {
  const proposal: Proposal = {
    id: `proposal-${Date.now()}`,
    grantId,
    title,
    content,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  proposals = [...proposals, proposal];
  return proposal;
};

export const getProposals = (grantId?: string): Proposal[] => {
  if (grantId) {
    return proposals.filter(p => p.grantId === grantId);
  }
  return [...proposals];
};

export const updateProposal = (id: string, updates: Partial<Omit<Proposal, 'id' | 'createdAt'>>): Proposal | null => {
  const index = proposals.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const updated = {
    ...proposals[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  proposals = [
    ...proposals.slice(0, index),
    updated,
    ...proposals.slice(index + 1),
  ];
  
  return updated;
};

export const optimizeProposal = async (proposalId: string): Promise<Proposal | null> => {
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return null;
  
  // Simulate AI optimization with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const optimizedContent = `${proposal.content}\n\n[AI OPTIMIZED CONTENT]\nThis proposal has been enhanced to highlight key strengths and align with grant requirements. The methodology section has been expanded to demonstrate feasibility, and impact statements have been strengthened with quantifiable metrics.`;
  
  return updateProposal(proposalId, {
    content: optimizedContent,
    status: 'optimized'
  });
};

// Report Management
export const createReport = (proposalId: string, content: string): Report => {
  const report: Report = {
    id: `report-${Date.now()}`,
    proposalId,
    content,
    submissionDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  
  reports = [...reports, report];
  return report;
};

export const getReports = (proposalId?: string): Report[] => {
  if (proposalId) {
    return reports.filter(r => r.proposalId === proposalId);
  }
  return [...reports];
};

export const generateAIReport = async (proposalId: string): Promise<Report | null> => {
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return null;
  
  // Simulate AI report generation with a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const reportContent = `# Progress Report for "${proposal.title}"\n\n## Summary of Activities\n- Research conducted according to timeline\n- Data collection completed\n- Preliminary analysis shows promising results\n\n## Challenges Encountered\n- Minor delays due to resource availability\n- Adapted methodology to address unexpected findings\n\n## Next Steps\n- Complete statistical analysis\n- Prepare draft of findings\n- Schedule stakeholder presentation\n\n## Budget Status\n- 65% of allocated funds utilized\n- On track with projected spending`;
  
  return createReport(proposalId, reportContent);
};

// Critique Management
export const createCritique = (proposalId: string, content: string, type: Critique['type']): Critique => {
  const critique: Critique = {
    id: `critique-${Date.now()}`,
    proposalId,
    content,
    type,
    createdAt: new Date().toISOString(),
  };
  
  critiques = [...critiques, critique];
  return critique;
};

export const getCritiques = (proposalId: string): Critique[] => {
  return critiques.filter(c => c.proposalId === proposalId);
};

export const generateAICritique = async (proposalId: string): Promise<Critique[]> => {
  const proposal = proposals.find(p => p.id === proposalId);
  if (!proposal) return [];
  
  // Simulate AI critique generation with a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate critiques for strengths, weaknesses, and suggestions
  const strengthCritique = createCritique(
    proposalId,
    "## Research Methodology\nYour proposed methodology demonstrates a strong understanding of the field. The mixed-methods approach will provide both quantitative and qualitative insights.\n\n## Literature Review\nExcellent integration of current research with clear connection to your proposed work.",
    'strength'
  );
  
  const weaknessCritique = createCritique(
    proposalId,
    "## Impact Statement\nThe impact section lacks specific, measurable outcomes. Consider adding quantifiable metrics to demonstrate the potential effect of your research.\n\n## Timeline\nThe project timeline appears optimistic given the scope of work. Consider building in additional buffer time for unexpected delays.",
    'weakness'
  );
  
  const suggestionCritique = createCritique(
    proposalId,
    "## Budget Justification\nStrengthen your budget justification by providing more detailed breakdowns of costs and explaining why each expense is necessary for project success.\n\n## Evaluation Plan\nConsider adding a more robust evaluation framework that includes both formative and summative assessment methods.",
    'suggestion'
  );
  
  return [strengthCritique, weaknessCritique, suggestionCritique];
};
