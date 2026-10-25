"use client";

import identity from "../skill/leego-design-ppt/assets/brand-identity.json";

export default function BrandMark() {
  // The adjacent name remains readable if the central asset service is unavailable.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="brand-mark" src={identity.stableUrl} data-icon-id={identity.id}
    alt="" width={40} height={40} onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />;
}
