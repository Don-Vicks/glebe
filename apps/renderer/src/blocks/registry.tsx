import type { Block } from "@orgsites/block-schema";
import { BlockRenderer as Render } from "@orgsites/ui";

/**
 * Published-site entry point for a single block. All actual rendering is
 * delegated to the shared `@orgsites/ui` package so the live site and the
 * Puck live-preview in the builder stay pixel-identical from one source.
 */
export function BlockRenderer({ block }: { block: Block }) {
  if (process.env.NODE_ENV === "development" && !Render) {
    return (
      <div className="p-6 border border-dashed border-[#ccc] text-[#999]">
        Block renderer unavailable
      </div>
    );
  }
  return <Render block={block} />;
}
