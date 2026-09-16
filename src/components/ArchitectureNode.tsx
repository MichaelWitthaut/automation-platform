import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Tag } from '@carbon/react';

export type ArchitectureNodeData = {
  label: string;
  eyebrow?: string;
  summary?: string;
  accent?: string;
  active?: boolean;
  muted?: boolean;
};

export function ArchitectureNode({ data }: NodeProps) {
  const d = data as ArchitectureNodeData;
  return (
    <article className={`architecture-node ${d.active ? 'is-active' : ''} ${d.muted ? 'is-muted' : ''}`} style={{ '--accent': d.accent ?? '#0f62fe' } as React.CSSProperties}>
      <Handle type="target" position={Position.Left} />
      {d.eyebrow && <p className="architecture-node__eyebrow">{d.eyebrow}</p>}
      <h3>{d.label}</h3>
      {d.summary && <p>{d.summary}</p>}
      {d.active && <Tag type="blue">Active step</Tag>}
      <Handle type="source" position={Position.Right} />
    </article>
  );
}
