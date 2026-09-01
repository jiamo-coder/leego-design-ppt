"use client";

import { useEffect, useState } from "react";

type Manifest = {
  version: string;
  updatedAt: string;
  summary?: string[];
};

const FALLBACK: Manifest = {
  version: "2.0.0",
  updatedAt: "2026-09-01",
  summary: ["Bundled release snapshot"],
};

export default function VersionStatus({
  labels,
}: {
  labels: { live: string; snapshot: string; updated: string };
}) {
  const [manifest, setManifest] = useState(FALLBACK);
  const [mode, setMode] = useState<"live" | "snapshot">("snapshot");

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);
    fetch("https://raw.githubusercontent.com/jiamo-coder/leego-design-ppt/main/latest.json", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("manifest unavailable");
        return response.json() as Promise<Manifest>;
      })
      .then((next) => {
        if (!/^\d+\.\d+\.\d+$/.test(next.version)) throw new Error("invalid version");
        setManifest(next);
        setMode("live");
      })
      .catch(() => {
        setManifest(FALLBACK);
        setMode("snapshot");
      })
      .finally(() => window.clearTimeout(timer));
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <div className="version-card" aria-live="polite">
      <span className={`version-dot ${mode}`} aria-hidden="true" />
      <div>
        <p>{mode === "live" ? labels.live : labels.snapshot}</p>
        <strong>Leego Design PPT {manifest.version}</strong>
        <span>{labels.updated} {manifest.updatedAt}</span>
      </div>
    </div>
  );
}
