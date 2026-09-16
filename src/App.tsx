import { useState } from 'react';
import { ContentSwitcher, Header, HeaderName, SkipToContent, Switch } from '@carbon/react';
import type { ViewMode } from './models/architecture';
import { interfaces, journeys, products } from './data/catalog';
import { ArchitectureCanvas } from './components/ArchitectureCanvas';

export default function App() {
  const [mode, setMode] = useState<ViewMode>('products');
  return (
    <>
      <Header aria-label="IBM Automation architecture"><SkipToContent /><HeaderName prefix="IBM">Automation architecture</HeaderName></Header>
      <main id="main-content" className="app-shell">
        <section className="hero">
          <div><p className="eyebrow">Interactive architecture MVP</p><h1>{mode === 'products' ? 'Specialized products, connected outcomes' : 'Turn operational insight into decisive action'}</h1><p>{mode === 'products' ? 'Select an interface to open its Better Together journey.' : 'Explore shared context, coordinated decisions, agents, workflows, and governed execution.'}</p></div>
          <ContentSwitcher selectedIndex={mode === 'products' ? 0 : 1} onChange={({ index }) => setMode(index === 0 ? 'products' : 'concert-platform')} size="lg" aria-label="Architecture mode">
            <Switch name="products" text="Product Mode" />
            <Switch name="concert" text="Concert Platform Mode" />
          </ContentSwitcher>
        </section>
        <ArchitectureCanvas mode={mode} products={products} interfaces={interfaces} journeys={journeys} />
      </main>
    </>
  );
}
