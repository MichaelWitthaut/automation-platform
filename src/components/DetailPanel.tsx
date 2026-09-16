import { Button, ComposedModal, ModalBody, ModalFooter, ModalHeader, Tag } from '@carbon/react';
import type { ArchitectureInterface, Journey } from '../models/architecture';

interface Props {
  open: boolean;
  item?: ArchitectureInterface;
  journeys: Journey[];
  onClose: () => void;
  onPlay: (journey: Journey) => void;
}

export function DetailPanel({ open, item, journeys, onClose, onPlay }: Props) {
  const related = journeys.filter(j => item?.journeyIds.includes(j.id));
  return (
    <ComposedModal open={open} onClose={onClose} size="sm">
      <ModalHeader title={item?.label ?? 'Interface'} label="Better Together interface" closeModal={onClose} />
      <ModalBody>
        {item && <>
          <div className="tag-row">{item.integrationLevels.map(level => <Tag key={level} type="cool-gray">{level}</Tag>)}{item.status && <Tag type={item.status === 'ga' ? 'green' : 'purple'}>{item.status.toUpperCase()}</Tag>}</div>
          <h4>Benefits</h4>
          <ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
          <h4>Journeys</h4>
          {related.length === 0 && <p>No sample journey is attached yet.</p>}
          {related.map(journey => <div className="journey-card" key={journey.id}><strong>{journey.title}</strong><p>{journey.summary}</p><Button size="sm" onClick={() => onPlay(journey)}>Play journey</Button></div>)}
        </>}
      </ModalBody>
      <ModalFooter><Button kind="secondary" onClick={onClose}>Close</Button></ModalFooter>
    </ComposedModal>
  );
}
