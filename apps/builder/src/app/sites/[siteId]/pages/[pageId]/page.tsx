import { PageEditorClient } from "./editor-client";

export default function PageEditorRoute({ params }: { params: { siteId: string; pageId: string } }) {
  return <PageEditorClient pageId={params.pageId} siteId={params.siteId} />;
}
