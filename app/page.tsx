"use client";

import { useEffect, useSyncExternalStore } from "react";
import BrandMark from "./BrandMark";
import DesignDecisions from "./DesignDecisions";
import VersionStatus from "./VersionStatus";
import { siteCopy, type Locale } from "./siteCopy";

const LANGUAGE_KEY = "leego-design-ppt-language";
const LANGUAGE_EVENT = "leego-design-ppt-language-change";

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_EVENT, callback);
  };
}

function getLanguageSnapshot(): Locale {
  try { return window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "zh"; } catch { return "zh"; }
}

function getServerLanguageSnapshot(): Locale {
  return "zh";
}

function Lines({ children }: { children: string }) {
  return <>{children.split("\n").map((line, index) => <span className="title-line" key={`${line}-${index}`}>{line}</span>)}</>;
}

export default function Home() {
  const locale = useSyncExternalStore(subscribeToLanguage, getLanguageSnapshot, getServerLanguageSnapshot);
  const copy = siteCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const changeLanguage = (next: Locale) => {
    window.localStorage.setItem(LANGUAGE_KEY, next);
    window.dispatchEvent(new Event(LANGUAGE_EVENT));
  };

  return (
    <main>
      <nav className="site-nav" aria-label={copy.a11y.primaryNavigation}>
        <a className="brand" href="#top" aria-label={copy.a11y.home}>
          <BrandMark /><span>Leego Design PPT</span>
        </a>
        <div className="nav-links">
          <a href="#capabilities">{copy.nav.capabilities}</a><a href="#layouts">{copy.nav.layouts}</a><a href="#quality">{copy.nav.quality}</a>
        </div>
        <div className="nav-utilities">
          <div className="language-switch" role="group" aria-label={copy.a11y.language}>
            <button type="button" aria-pressed={locale === "zh"} onClick={() => changeLanguage("zh")}>中文</button>
            <button type="button" aria-pressed={locale === "en"} onClick={() => changeLanguage("en")}>EN</button>
          </div>
          <a className="nav-action" href="#download">{copy.nav.download}</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="version-line"><span className="signal" aria-hidden="true" />{copy.hero.version}</div>
          <h1><span className="title-line">{copy.hero.lineOne}</span><span className="title-line accent">{copy.hero.lineTwo}</span></h1>
          <p className="hero-lead">{copy.hero.lead}</p>
          <div className="hero-actions"><a className="primary-action" href="/demo/index.html">{copy.hero.explore}</a><a className="text-action" href="#method">{copy.hero.method}</a></div>
          <ul className="output-list" aria-label={copy.a11y.supportedOutputs}>
            {copy.outputs.map((output) => <li key={output.title}><span>{output.no}</span>{output.title}</li>)}
          </ul>
        </div>
        <a className="deck-stage" href="/demo/index.html" aria-label={copy.a11y.openDemo}>
          <div className="stage-toolbar"><span>{copy.stage.live}</span><span>{copy.stage.responsive}</span></div>
          <div className="slide-canvas">
            <div className="slide-index">LEEGO / 2.2.1</div>
            <div className="slide-copy"><p>{copy.stage.eyebrow}</p><h2><Lines>{copy.stage.title}</Lines></h2></div>
            <div className="slide-axis" aria-hidden="true"><span>{copy.stage.context}</span><i /><span>{copy.stage.evidence}</span><i /><span>{copy.stage.decision}</span></div>
          </div>
          <div className="stage-footer"><span>{copy.stage.open}</span><span>{copy.stage.controls}</span></div>
        </a>
      </section>

      <section className="proof-strip" aria-label={copy.a11y.principles}>
        {copy.principles.map((principle) => <p key={principle}>{principle}</p>)}
      </section>

      <section className="section intro-section" id="capabilities">
        <div className="section-label">{copy.capabilities.label}</div>
        <div>
          <h2><Lines>{copy.capabilities.title}</Lines></h2>
          <p className="section-lead">{copy.capabilities.lead}</p>
        </div>
      </section>

      <section className="output-detail">
        {copy.outputs.map((output) => (
          <article key={output.title}>
            <span>{output.no}</span><h3>{output.title}</h3><p>{output.body}</p>
          </article>
        ))}
      </section>

      <section className="section method-section" id="method">
        <div className="section-label">{copy.method.label}</div>
        <div className="method-copy"><h2>{copy.method.title}</h2><p>{copy.method.body}</p></div>
        <ol className="method-steps">
          {copy.method.steps.map((step) => <li key={step.no}><span>{step.no}</span><strong>{step.title}</strong><p>{step.body}</p></li>)}
        </ol>
      </section>

      <DesignDecisions locale={locale} />

      <section className="section layout-section" id="layouts">
        <div className="section-label">{copy.layouts.label}</div>
        <div className="layout-heading"><h2><Lines>{copy.layouts.title}</Lines></h2><p>{copy.layouts.body}</p></div>
        <div className="layout-grid">
          {copy.layouts.items.map((layout, index) => <div className={`layout-tile tile-${(index % 6) + 1}`} key={layout}><span>{String(index + 1).padStart(2, "0")}</span><div className="mini-slide" aria-hidden="true"><i /><i /><i /></div><strong>{layout}</strong></div>)}
        </div>
      </section>

      <section className="section system-section">
        <div className="section-label">{copy.system.label}</div>
        <div className="system-copy"><h2><Lines>{copy.system.title}</Lines></h2><p>{copy.system.body}</p></div>
        <div className="swatches" aria-label={copy.a11y.colorSystem}>
          {copy.system.swatches.map((swatch, index) => <div key={swatch.value} style={{ background: swatch.value, color: index < 2 ? "white" : undefined }}><span>{swatch.name}</span><b>{swatch.value}</b></div>)}
        </div>
      </section>

      <section className="section cases-section">
        <div className="section-label">{copy.cases.label}</div>
        <div className="case-heading"><h2><Lines>{copy.cases.title}</Lines></h2></div>
        <div className="case-list">
          {copy.cases.items.map((item, index) => <article key={item.kind}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.kind}</h3><div><small>{copy.cases.before}</small><strong>{item.before}</strong></div><i>→</i><div><small>{copy.cases.after}</small><strong>{item.after}</strong></div><p>{item.note}</p></article>)}
        </div>
      </section>

      <section className="section quality-section" id="quality">
        <div className="section-label">{copy.quality.label}</div>
        <div className="quality-heading"><h2>{copy.quality.title}</h2><p>{copy.quality.body}</p></div>
        <div className="qa-list">
          {copy.quality.items.map(([title, body], index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{body}</p></div>)}
        </div>
      </section>

      <section className="section evolution-section" id="updates">
        <div className="section-label">{locale === "zh" ? "持续更新 / 已验证规则" : "CONTINUOUS UPDATES / REVIEWED RULES"}</div>
        <h2>{locale === "zh" ? "经验变成规则，再进入下一次创作。" : "Turn experience into rules for the next task."}</h2>
        <ol className="evolution-steps">
          {(locale === "zh" ? [
            ["提炼", "从反馈中提取可复用判断；不公开客户稿件和内部数据。"],
            ["验证", "同题比较、检查输出，验证后发布新规则。"],
            ["使用", "2.2+ 客户端在新任务开始时检查，校验后缓存；离线保留可用版本。"],
          ] : [
            ["Extract", "Generalize reusable decisions without publishing client material."],
            ["Verify", "Compare the same brief, inspect outputs and release reviewed rules."],
            ["Use", "Clients 2.2+ check on the next task, verify and cache. Offline work keeps a usable snapshot."],
          ]).map(([title,body]) => <li key={title}><h3>{title}</h3><p>{body}</p></li>)}
        </ol>
        <p>{locale === "zh" ? "这是使用时检查，不是后台强制推送。旧版需先升级一次；脚本与依赖仍通过安装包升级，已交付演示不会被改写。" : "Updates are checked on use, not pushed in the background. Older clients need one upgrade. Scripts and dependencies use package upgrades; delivered decks remain unchanged."}</p>
        <a className="text-action" href="/standards/leego-design-ppt/live-updates.md">{locale === "zh" ? "查看更新机制与离线方式 →" : "Read update and offline behavior →"}</a>
      </section>

      <section className="section release-section" id="download">
        <div className="section-label">{copy.release.label}</div>
        <VersionStatus labels={copy.version} />
        <div className="download-copy"><h2><Lines>{copy.release.title}</Lines></h2><p>{copy.release.body}</p></div>
        <div className="downloads">
          <a className="primary-action" href="/downloads/leego-design-ppt-2.2.1.zip" download>{copy.release.downloadSkill}</a>
          <a href="/downloads/leego-design-ppt-demo.pptx" download>{copy.release.examplePptx}</a>
          <a href="/downloads/leego-design-ppt-demo.pdf" download>{copy.release.examplePdf}</a>
          <a href="https://github.com/jiamo-coder/leego-design-ppt">{copy.release.github}</a>
        </div>
      </section>

      <footer><a className="brand" href="#top"><BrandMark /><span>Leego Design PPT</span></a><p>{copy.footer}</p></footer>
    </main>
  );
}
