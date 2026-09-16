import { useEffect, useMemo, useState } from 'react';
import { Background, Controls, MarkerType, ReactFlow, type Edge, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { ArchitectureInterface, Journey, Product, ViewMode } from '../models/architecture';
import { ArchitectureNode } from './ArchitectureNode';
import { InterfaceEdge } from './InterfaceEdge';
import { DetailPanel } from './DetailPanel';
import { JourneyPlayer } from './JourneyPlayer';

const nodeTypes = { architecture: ArchitectureNode };
const edgeTypes = { interface: InterfaceEdge };

const productPositions: Record<string, { x: number; y: number }> = {
  instana: { x: 80, y: 80 }, turbonomic: { x: 420, y: 80 }, terraform: { x: 80, y: 330 }, ansible: { x: 420, y: 330 }, cloudability: { x: 760, y: 330 }
};
const platformPositions: Record<string, { x: number; y: number }> = {
  concert: { x: 400, y: 220 }, understand: { x: 70, y: 220 }, optimize: { x: 740, y: 70 }, observe: { x: 740, y: 190 }, operate: { x: 740, y: 310 }, resilience: { x: 740, y: 430 }, github: { x: 1050, y: 170 }, servicenow: { x: 1050, y: 350 }
};

interface Props { mode: ViewMode; products: Product[]; interfaces: ArchitectureInterface[]; journeys: Journey[]; }

export function ArchitectureCanvas({ mode, products, interfaces, journeys }: Props) {
  const [selected, setSelected] = useState<ArchitectureInterface>();
  const [journey, setJourney] = useState<Journey>();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || !journey) return;
    const timer = window.setInterval(() => setStep(s => s >= journey.steps.length - 1 ? (setPlaying(false), s) : s + 1), 1800);
    return () => window.clearInterval(timer);
  }, [playing, journey]);

  useEffect(() => { setSelected(undefined); setJourney(undefined); setStep(0); setPlaying(false); }, [mode]);

  const activeStep = journey?.steps[step];
  const activeNodeIds = new Set(activeStep?.nodeIds ?? []);
  const activeEdgeIds = new Set(activeStep?.interfaceIds ?? []);

  const nodes = useMemo<Node[]>(() => {
    if (mode === 'products') {
      return products.filter(p => p.id !== 'concert').map(p => ({ id: p.id, type: 'architecture', position: productPositions[p.id], data: { label: p.shortName, eyebrow: p.domain, summary: p.summary, accent: p.accent, active: activeNodeIds.has(p.id), muted: Boolean(journey) && !activeNodeIds.has(p.id) } }));
    }
    const defs = [
      ['concert', 'IBM Concert platform', 'Shared agentic operations platform', '#001d6c'], ['understand', 'Understand', 'Establish shared system context', '#0f62fe'], ['observe', 'Observe', 'Full-stack operational context', '#4589ff'], ['optimize', 'Optimize', 'Performance and cost decisions', '#009d9a'], ['operate', 'Operate', 'Incidents, events, and workflows', '#8a3ffc'], ['resilience', 'Resilience', 'Assess and improve posture', '#fa4d56'], ['github', 'GitHub', 'Source and pull request artifacts', '#525252'], ['servicenow', 'ServiceNow', 'Incident and service workflow', '#525252']
    ];
    return defs.map(([id, label, summary, accent]) => ({ id, type: 'architecture', position: platformPositions[id], data: { label, summary, accent, active: activeNodeIds.has(id), muted: Boolean(journey) && !activeNodeIds.has(id) } }));
  }, [mode, journey, step]);

  const edges = useMemo<Edge[]>(() => {
    const visible = mode === 'products' ? interfaces.filter(i => ['instana-turbonomic', 'terraform-ansible', 'cloudability-terraform'].includes(i.id)) : interfaces.filter(i => ['instana-concert', 'turbonomic-concert', 'concert-github', 'concert-servicenow'].includes(i.id));
    const platformAdapter: Record<string, [string, string]> = { 'instana-concert': ['observe', 'concert'], 'turbonomic-concert': ['optimize', 'concert'] };
    return visible.map(i => {
      const pair = platformAdapter[i.id] ?? [i.sourceId, i.targetId];
      return { id: i.id, source: pair[0], target: pair[1], label: i.label, type: 'interface', markerEnd: { type: MarkerType.ArrowClosed }, animated: activeEdgeIds.has(i.id), data: { active: activeEdgeIds.has(i.id), muted: Boolean(journey) && !activeEdgeIds.has(i.id), onSelect: (id: string) => setSelected(interfaces.find(x => x.id === id)) } };
    });
  }, [mode, journey, step, interfaces]);

  const startJourney = (j: Journey) => { setSelected(undefined); setJourney(j); setStep(0); setPlaying(true); };

  return <>
    <div className="canvas-wrap">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView minZoom={0.45} maxZoom={1.4} nodesDraggable={false} nodesConnectable={false} elementsSelectable>
        <Background gap={32} size={1} color="#e0e0e0" />
        <Controls showInteractive={false} />
      </ReactFlow>
      <JourneyPlayer journey={journey} step={step} playing={playing} onStep={setStep} onToggle={() => setPlaying(p => !p)} onClose={() => { setJourney(undefined); setPlaying(false); }} />
    </div>
    <DetailPanel open={Boolean(selected)} item={selected} journeys={journeys} onClose={() => setSelected(undefined)} onPlay={startJourney} />
  </>;
}
