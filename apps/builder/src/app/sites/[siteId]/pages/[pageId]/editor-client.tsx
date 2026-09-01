"use client";

import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useCallback } from "react";
import { puckConfig } from "@/editor/puck-config";
import { trpc } from "@/lib/trpc";

/**
 * This is the piece described in spec §8.3a: Puck supplies the editing
 * canvas, and every save round-trips through the type-checked
 * `pages.saveBlocks` tRPC mutation — no hand-written fetch calls, no
 * separately maintained request type.
 */
export function PageEditorClient({ pageId }: { pageId: string }) {
  const utils = trpc.useUtils();
  const pageQuery = trpc.pages.byId.useQuery({ pageId });
  const saveBlocks = trpc.pages.saveBlocks.useMutation({
    onSuccess: () => {
      void utils.pages.byId.invalidate({ pageId });
      void utils.pages.list.invalidate();
    },
  });

  const handlePublish = useCallback(
    (data: Data) => {
      // Puck's `Data` shape (content[] with type/props) maps directly onto
      // the pageBlocksSchema union in @orgsites/block-schema. In a fuller
      // implementation this mapping is a small adapter function; kept
      // inline here for scaffold clarity.
      const blocks = data.content.map((item) => ({
        type: item.type,
        props: item.props,
      }));

      saveBlocks.mutate({ pageId, blocks: blocks as never });
    },
    [pageId, saveBlocks]
  );

  if (pageQuery.isLoading) return <div className="auth-loading">Loading editor…</div>;
  if (pageQuery.error || !pageQuery.data) return <div className="auth-loading">Could not load this page. Try again.</div>;

  const pageBlocks = normalizePuckContent(pageQuery.data.blocks, pageId);

  return (
    <div style={{ height: "100vh" }}>
      <Puck
        config={puckConfig}
        data={{
          content: pageBlocks,
          root: {},
        }}
        onPublish={handlePublish}
      />
    </div>
  );
}

type PuckContent = { id: string; type: string; props: Record<string, unknown> };

function normalizePuckContent(value: unknown, pageId: string): PuckContent[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((block, index) => {
    if (!block || typeof block !== "object") return [];
    const candidate = block as { type?: unknown; props?: unknown; id?: unknown };
    if (typeof candidate.type !== "string" || !candidate.type) return [];
    const props = candidate.props && typeof candidate.props === "object" && !Array.isArray(candidate.props)
      ? (candidate.props as Record<string, unknown>)
      : {};
    return [{
      id: typeof candidate.id === "string" && candidate.id ? candidate.id : `${pageId}-${index}`,
      type: candidate.type,
      props,
    }];
  });
}
