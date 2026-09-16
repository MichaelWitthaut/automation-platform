import type { ArchitectureInterface, Journey, Product } from '../models/architecture';

export const products: Product[] = [
  { id: 'instana', name: 'IBM Instana', shortName: 'Instana', domain: 'operations', summary: 'Full-stack observability and application context.', capabilities: ['Observe', 'Trace', 'Diagnose'], outcomes: ['Performance', 'Faster resolution'], accent: '#0f62fe' },
  { id: 'turbonomic', name: 'IBM Turbonomic', shortName: 'Turbonomic', domain: 'operations', summary: 'Application resource management for performance and efficiency.', capabilities: ['Optimize', 'Rightsize', 'Scale'], outcomes: ['Performance', 'Cost efficiency'], accent: '#009d9a' },
  { id: 'terraform', name: 'HashiCorp Terraform', shortName: 'Terraform', domain: 'operations', summary: 'Declarative infrastructure provisioning and lifecycle management.', capabilities: ['Provision', 'Plan', 'Apply'], outcomes: ['Consistency', 'Delivery speed'], accent: '#8a3ffc' },
  { id: 'ansible', name: 'Red Hat Ansible Automation Platform', shortName: 'Ansible', domain: 'operations', summary: 'Configuration automation and operational orchestration.', capabilities: ['Configure', 'Orchestrate', 'Remediate'], outcomes: ['Automation', 'Reduced toil'], accent: '#da1e28' },
  { id: 'cloudability', name: 'IBM Cloudability', shortName: 'Cloudability', domain: 'financial', summary: 'Cloud cost visibility, governance, and optimization.', capabilities: ['Inform', 'Optimize', 'Govern'], outcomes: ['Cost transparency', 'Financial accountability'], accent: '#4589ff' },
  { id: 'concert', name: 'IBM Concert platform', shortName: 'Concert', domain: 'platform', summary: 'Shared context, coordinated decisions, agents, workflows, and governed execution.', capabilities: ['Understand', 'Decide', 'Act'], outcomes: ['Speed', 'Reduced risk', 'Resilience'], accent: '#001d6c' }
];

export const interfaces: ArchitectureInterface[] = [
  { id: 'instana-turbonomic', sourceId: 'instana', targetId: 'turbonomic', label: 'Application context', direction: 'bidirectional', integrationLevels: ['data-context'], journeyIds: ['observe-optimize'], benefits: ['Performance-aware optimization', 'Continuous validation'] },
  { id: 'terraform-ansible', sourceId: 'terraform', targetId: 'ansible', label: 'Provision and configure', direction: 'bidirectional', integrationLevels: ['events-alerts', 'artifacts'], journeyIds: ['provision-configure'], benefits: ['Day 0 to Day 2 continuity', 'Consistent inventory'] },
  { id: 'cloudability-terraform', sourceId: 'cloudability', targetId: 'terraform', label: 'Pre-deployment governance', direction: 'bidirectional', integrationLevels: ['data-context', 'artifacts'], journeyIds: [], benefits: ['Earlier cost insight', 'Policy guardrails'], status: 'beta' },
  { id: 'instana-concert', sourceId: 'instana', targetId: 'concert', label: 'Observe context', direction: 'one-way', integrationLevels: ['events-alerts', 'data-context'], journeyIds: ['concert-alert-resolution'], benefits: ['Connected understanding', 'Faster root-cause analysis'] },
  { id: 'turbonomic-concert', sourceId: 'turbonomic', targetId: 'concert', label: 'Optimize action', direction: 'bidirectional', integrationLevels: ['data-context', 'agent-to-agent'], journeyIds: ['concert-alert-resolution'], benefits: ['Prioritized resource action', 'Governed execution'] },
  { id: 'concert-github', sourceId: 'concert', targetId: 'github', label: 'Inspect and remediate code', direction: 'bidirectional', integrationLevels: ['mcp', 'artifacts'], journeyIds: ['concert-alert-resolution'], benefits: ['Code-level context', 'Pull request workflow'], status: 'preview' },
  { id: 'concert-servicenow', sourceId: 'concert', targetId: 'servicenow', label: 'Incident closure', direction: 'bidirectional', integrationLevels: ['data-context', 'artifacts'], journeyIds: ['concert-alert-resolution'], benefits: ['Complete incident record', 'Closed-loop operations'] }
];

export const journeys: Journey[] = [
  {
    id: 'provision-configure', title: 'Terraform + Ansible', mode: 'products', summary: 'Provision infrastructure and hand off configuration through a coordinated workflow.', outcomes: ['Consistency', 'Delivery speed'],
    steps: [
      { id: 'pa1', title: 'Define infrastructure', actor: 'Terraform', description: 'Prepare the desired infrastructure state as code.', nodeIds: ['terraform'], interfaceIds: [] },
      { id: 'pa2', title: 'Provision', actor: 'Terraform', description: 'Create or update the infrastructure resources.', nodeIds: ['terraform'], interfaceIds: ['terraform-ansible'] },
      { id: 'pa3', title: 'Trigger configuration', actor: 'Interface', description: 'Pass the provisioning outcome into the configuration workflow.', nodeIds: ['terraform', 'ansible'], interfaceIds: ['terraform-ansible'] },
      { id: 'pa4', title: 'Configure and validate', actor: 'Ansible', description: 'Apply configuration, policy, and operational checks.', nodeIds: ['ansible'], interfaceIds: ['terraform-ansible'] }
    ]
  },
  {
    id: 'observe-optimize', title: 'Instana + Turbonomic', mode: 'products', summary: 'Use application context to inform optimization and validate the result.', outcomes: ['Performance', 'Efficiency'],
    steps: [
      { id: 'ot1', title: 'Observe', actor: 'Instana', description: 'Collect application telemetry and dependency context.', nodeIds: ['instana'], interfaceIds: [] },
      { id: 'ot2', title: 'Share context', actor: 'Interface', description: 'Make application context available for resource decisions.', nodeIds: ['instana', 'turbonomic'], interfaceIds: ['instana-turbonomic'] },
      { id: 'ot3', title: 'Optimize', actor: 'Turbonomic', description: 'Evaluate resource actions for performance and efficiency.', nodeIds: ['turbonomic'], interfaceIds: ['instana-turbonomic'] },
      { id: 'ot4', title: 'Validate', actor: 'Instana', description: 'Observe application behavior after execution.', nodeIds: ['instana', 'turbonomic'], interfaceIds: ['instana-turbonomic'] }
    ]
  },
  {
    id: 'concert-alert-resolution', title: 'Alert to resolution', mode: 'concert-platform', summary: 'Coordinate specialized agents and tools through Understand, Decide, and Act.', outcomes: ['Speed', 'Reduced risk', 'Resilience'], status: 'preview',
    steps: [
      { id: 'c1', title: 'Detect degradation', actor: 'Observe', description: 'Receive service degradation signals and relevant operational context.', nodeIds: ['observe', 'concert'], interfaceIds: ['instana-concert'] },
      { id: 'c2', title: 'Establish shared context', actor: 'Understand', description: 'Connect service signals, topology, dependencies, and history.', nodeIds: ['understand', 'concert'], interfaceIds: ['instana-concert'] },
      { id: 'c3', title: 'Stabilize performance', actor: 'Optimize Agent', description: 'Assess resource constraints and propose a stabilizing action.', nodeIds: ['optimize', 'concert'], interfaceIds: ['turbonomic-concert'], approvalRequired: true },
      { id: 'c4', title: 'Rule out network', actor: 'Network Agent', description: 'Evaluate network health over the same timeframe.', nodeIds: ['operate', 'concert'], interfaceIds: [] },
      { id: 'c5', title: 'Find root cause', actor: 'Observe Agent', description: 'Use topology and telemetry to identify the implicated code path.', nodeIds: ['observe', 'concert', 'github'], interfaceIds: ['concert-github'] },
      { id: 'c6', title: 'Propose code fix', actor: 'Coding Agent', description: 'Create a proposed change as a reviewable artifact.', nodeIds: ['concert', 'github'], interfaceIds: ['concert-github'], approvalRequired: true },
      { id: 'c7', title: 'Improve resilience', actor: 'Resilience Coordinator', description: 'Assess configuration gaps and propose preventive improvements.', nodeIds: ['resilience', 'concert'], interfaceIds: [] },
      { id: 'c8', title: 'Close the loop', actor: 'Operate', description: 'Update the incident record with actions and resolution context.', nodeIds: ['concert', 'servicenow'], interfaceIds: ['concert-servicenow'], approvalRequired: true }
    ]
  }
];
