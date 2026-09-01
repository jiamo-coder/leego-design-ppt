import VersionStatus from "./VersionStatus";

const outputs = [
  { no: "01", title: "Responsive HTML", body: "16:9 presentation mode plus reading layouts for five viewport widths." },
  { no: "02", title: "Editable PPTX", body: "Text, images, charts, tables, and basic geometry stay editable." },
  { no: "03", title: "Pixel-stable PDF", body: "Built from final high-resolution slide renders to prevent layout drift." },
];

const layouts = [
  "Cover", "Executive summary", "Timeline", "Problem matrix", "Principles", "Split visual",
  "Architecture", "Data flow", "Process", "Dual screenshot", "Product matrix", "VI showcase",
  "Comparison", "Governance", "Evidence wall", "Roadmap", "KPI", "Decision close",
];

const cases = [
  { kind: "Brand book", before: "Asset collection", after: "Brand-led narrative", note: "VI, product, space, packaging, and scenarios gain distinct visual roles." },
  { kind: "Product introduction", before: "Feature inventory", after: "Decision story", note: "Capabilities connect to evidence, governance, owners, and next actions." },
  { kind: "Leadership report", before: "Dense source deck", after: "Executive brief", note: "Claims are shortened, ordered, and closed with a clear decision." },
];

const qa = [
  ["Narrative", "One job and one primary claim per slide"],
  ["Typography", "No orphan characters or accidental title wraps"],
  ["Imagery", "No meaningless crop or low-resolution enlargement"],
  ["Brand", "No old logo, name, metadata, or note residue"],
  ["Files", "Matched page count, order, sources, and openability"],
  ["Responsive", "1440 / 1024 / 768 / 390 / 320 px + 200% zoom"],
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Leego Design PPT home">
          <span className="brand-mark">L</span><span>Leego Design PPT</span>
        </a>
        <div className="nav-links">
          <a href="#capabilities">Capabilities</a><a href="#layouts">Layouts</a><a href="#quality">Quality</a>
        </div>
        <a className="nav-action" href="#download">Get 2.0.0</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="version-line"><span className="signal" aria-hidden="true" />Version 2.0.0 · Presentation system</div>
          <h1>One story.<br /><span>Three precise outputs.</span></h1>
          <p className="hero-lead">A disciplined presentation skill that turns evidence, brand assets, and project context into responsive web decks, editable slides, and reliable PDFs.</p>
          <div className="hero-actions"><a className="primary-action" href="/demo/index.html">Explore the live deck</a><a className="text-action" href="#method">Read the method →</a></div>
          <ul className="output-list" aria-label="Supported outputs">
            {outputs.map((output) => <li key={output.title}><span>{output.no}</span>{output.title}</li>)}
          </ul>
        </div>
        <a className="deck-stage" href="/demo/index.html" aria-label="Open the interactive deck preview">
          <div className="stage-toolbar"><span>LIVE DECK / 01</span><span>16:9 · RESPONSIVE</span></div>
          <div className="slide-canvas">
            <div className="slide-index">LEEGO / 2.0.0</div>
            <div className="slide-copy"><p>DECISION NARRATIVE</p><h2>Clarity is a system,<br />not a finishing touch.</h2></div>
            <div className="slide-axis" aria-hidden="true"><span>CONTEXT</span><i /><span>EVIDENCE</span><i /><span>DECISION</span></div>
          </div>
          <div className="stage-footer"><span>OPEN INTERACTIVE DEMO ↗</span><span>Notes · Overview · Touch</span></div>
        </a>
      </section>

      <section className="proof-strip" aria-label="Core principles">
        <p>Strategy before slides.</p><p>Contain before crop.</p><p>Evidence before ornament.</p><p>QA before delivery.</p>
      </section>

      <section className="section intro-section" id="capabilities">
        <div className="section-label">01 / ONE SEMANTIC SOURCE</div>
        <div>
          <h2>Author once in <code>deck-spec.json</code>.<br />Deliver without narrative drift.</h2>
          <p className="section-lead">Audience, purpose, evidence, theme, image fit, source labels, and speaker notes stay connected across every output.</p>
        </div>
      </section>

      <section className="output-detail">
        {outputs.map((output) => (
          <article key={output.title}>
            <span>{output.no}</span><h3>{output.title}</h3><p>{output.body}</p>
          </article>
        ))}
      </section>

      <section className="section method-section" id="method">
        <div className="section-label">02 / THE METHOD</div>
        <div className="method-copy"><h2>Good slides begin before the canvas.</h2><p>Leego Design PPT starts with the communication job, evidence boundary, and brand inventory. Layout is selected only after the argument is stable.</p></div>
        <ol className="method-steps">
          <li><span>01</span><strong>Understand</strong><p>Audience, decision, sources, constraints.</p></li>
          <li><span>02</span><strong>Structure</strong><p>One slide job, one claim, cumulative arc.</p></li>
          <li><span>03</span><strong>Compose</strong><p>Grid, type, whitespace, image intent.</p></li>
          <li><span>04</span><strong>Verify</strong><p>Visual, file, brand, and source QA.</p></li>
        </ol>
      </section>

      <section className="section layout-section" id="layouts">
        <div className="section-label">03 / LAYOUT LIBRARY</div>
        <div className="layout-heading"><h2>18 tested narrative jobs.<br />No generic page filler.</h2><p>Each layout exists because it answers a different presentation question.</p></div>
        <div className="layout-grid">
          {layouts.map((layout, index) => <div className={`layout-tile tile-${(index % 6) + 1}`} key={layout}><span>{String(index + 1).padStart(2, "0")}</span><div className="mini-slide" aria-hidden="true"><i /><i /><i /></div><strong>{layout}</strong></div>)}
        </div>
      </section>

      <section className="section system-section">
        <div className="section-label">04 / PURPLE TECH</div>
        <div className="system-copy"><h2>Flat color. Crisp type.<br />A disciplined accent.</h2><p>No ornamental gradient, glass effect, or card pile is needed to communicate precision.</p></div>
        <div className="swatches" aria-label="Purple tech color system">
          <div style={{ background: "#10132E", color: "white" }}><span>INK</span><b>#10132E</b></div>
          <div style={{ background: "#6546FF", color: "white" }}><span>PURPLE</span><b>#6546FF</b></div>
          <div style={{ background: "#CFE6FF" }}><span>ICE</span><b>#CFE6FF</b></div>
          <div style={{ background: "#F7F8FC" }}><span>PAPER</span><b>#F7F8FC</b></div>
        </div>
      </section>

      <section className="section cases-section">
        <div className="section-label">05 / ANONYMIZED CASES</div>
        <div className="case-heading"><h2>The work is not “make it prettier.”<br />It is make the argument visible.</h2></div>
        <div className="case-list">
          {cases.map((item, index) => <article key={item.kind}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.kind}</h3><div><small>BEFORE</small><strong>{item.before}</strong></div><i>→</i><div><small>AFTER</small><strong>{item.after}</strong></div><p>{item.note}</p></article>)}
        </div>
      </section>

      <section className="section quality-section" id="quality">
        <div className="section-label">06 / QA CONTRACT</div>
        <div className="quality-heading"><h2>A build is not an approval.</h2><p>Every final page is rendered and reviewed. Files are checked separately from visual quality and sensitive information.</p></div>
        <div className="qa-list">
          {qa.map(([title, body], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{body}</p></div>)}
        </div>
      </section>

      <section className="section release-section" id="download">
        <div className="section-label">07 / RELEASE CHANNEL</div>
        <VersionStatus />
        <div className="download-copy"><h2>Install the skill.<br />Inspect the example.<br />Build all three outputs.</h2><p>The public package includes only anonymized rules, templates, scripts, and example content.</p></div>
        <div className="downloads">
          <a className="primary-action" href="/downloads/leego-design-ppt-2.0.0.zip" download>Download Skill ZIP</a>
          <a href="/downloads/leego-design-ppt-demo.pptx" download>Example PPTX ↓</a>
          <a href="/downloads/leego-design-ppt-demo.pdf" download>Example PDF ↓</a>
          <a href="https://github.com/jiamo-coder/leego-design-ppt">GitHub ↗</a>
        </div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">L</span><span>Leego Design PPT</span></a><p>Presentation system · Version 2.0.0 · Updated 2026-09-01</p></footer>
    </main>
  );
}
