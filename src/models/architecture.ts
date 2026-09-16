export type ViewMode = 'products' | 'concert-platform';
export type Domain = 'operations' | 'engineering' | 'financial' | 'platform';
export type IntegrationLevel = 'events-alerts' | 'data-context' | 'mcp' | 'agent-to-agent' | 'artifacts';
export type DeliveryStatus = 'ga' | 'beta' | 'preview' | 'nda';

export interface Product {
  id: string;
  name: string;
  shortName: string;
  domain: Domain;
  summary: string;
  capabilities: string[];
  outcomes: string[];
  accent: string;
}

export interface ArchitectureInterface {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
  direction: 'one-way' | 'bidirectional';
  integrationLevels: IntegrationLevel[];
  journeyIds: string[];
  benefits: string[];
  status?: DeliveryStatus;
}

export interface JourneyStep {
  id: string;
  title: string;
  actor: string;
  description: string;
  nodeIds: string[];
  interfaceIds: string[];
  approvalRequired?: boolean;
}

export interface Journey {
  id: string;
  title: string;
  mode: ViewMode;
  summary: string;
  outcomes: string[];
  steps: JourneyStep[];
  status?: DeliveryStatus;
}
