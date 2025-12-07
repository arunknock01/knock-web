export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  listItems?: string[];
  visualType?: 'portal' | 'grid' | 'typography' | 'color' | 'icon' | 'none';
}

export interface NavItem {
  id: string;
  label: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
