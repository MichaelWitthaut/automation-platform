import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

type InterfaceEdgeData = {
  active?: boolean;
  muted?: boolean;
  onSelect?: (id: string) => void;
};

export function InterfaceEdge(props: EdgeProps) {
  const edgeData = (props.data ?? {}) as InterfaceEdgeData;

  const [path, labelX, labelY] = getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  });

  const active = edgeData.active ?? false;
  const muted = edgeData.muted ?? false;

  return (
    <>
      <BaseEdge
        id={props.id}
        path={path}
        markerEnd={props.markerEnd}
        style={{
          stroke: active ? "#0f62fe" : "#8d8d8d",
          strokeWidth: active ? 4 : 2,
          opacity: muted ? 0.15 : 1,
        }}
      />

      <EdgeLabelRenderer>
        <button
          className={`edge-label ${active ? "is-active" : ""}`}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            opacity: muted ? 0.2 : 1,
          }}
          onClick={() => edgeData.onSelect?.(props.id)}
        >
          {String(props.label ?? "")}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
`