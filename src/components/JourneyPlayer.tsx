import { Button, ProgressIndicator, ProgressStep, Tag } from '@carbon/react';
import { Pause, Play, SkipBack, SkipForward } from '@carbon/icons-react';
import type { Journey } from '../models/architecture';

interface Props {
  journey?: Journey;
  step: number;
  playing: boolean;
  onStep: (step: number) => void;
  onToggle: () => void;
  onClose: () => void;
}

export function JourneyPlayer({ journey, step, playing, onStep, onToggle, onClose }: Props) {
  if (!journey) return null;
  const current = journey.steps[step];
  return (
    <aside className="journey-player" aria-live="polite">
      <div><p className="eyebrow">Journey</p><h2>{journey.title}</h2><p>{journey.summary}</p></div>
      <ProgressIndicator currentIndex={step} spaceEqually>{journey.steps.map(s => <ProgressStep key={s.id} label={s.title} onClick={() => onStep(journey.steps.indexOf(s))} />)}</ProgressIndicator>
      <section className="step-card"><div className="tag-row"><Tag type="blue">{current.actor}</Tag>{current.approvalRequired && <Tag type="purple">Human approval</Tag>}</div><h3>{current.title}</h3><p>{current.description}</p></section>
      <div className="journey-controls">
        <Button hasIconOnly iconDescription="Previous step" renderIcon={SkipBack} kind="ghost" disabled={step === 0} onClick={() => onStep(step - 1)} />
        <Button hasIconOnly iconDescription={playing ? 'Pause journey' : 'Play journey'} renderIcon={playing ? Pause : Play} onClick={onToggle} />
        <Button hasIconOnly iconDescription="Next step" renderIcon={SkipForward} kind="ghost" disabled={step === journey.steps.length - 1} onClick={() => onStep(step + 1)} />
        <Button kind="tertiary" size="sm" onClick={onClose}>End journey</Button>
      </div>
    </aside>
  );
}
