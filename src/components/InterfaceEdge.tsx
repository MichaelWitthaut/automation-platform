import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export function InterfaceEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath(props);
  const active = Boolean(props.data?.active);
  const muted = Boolean(props.data?.muted);
  return (
    <>
      <BaseEdge id={props.id} path={path} markerEnd={props.markerEnd} style={{ stroke: active ? '#0f62fe' : '#8d8d8d', strokeWidth: active ? 4 : 2, opacity: muted ? .16 : 1 }} />
      <EdgeLabelRenderer>
        <button
          className={`edge-label ${active ? 'is-active' : ''}`}
          style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`, opacity: muted ? .2 : 1 }}
          onClick={() => props.data?.onSelect?.(props.id)}
          aria-label={`Open interface ${props.label}`}
        >
          {String(props.label ?? '')}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
