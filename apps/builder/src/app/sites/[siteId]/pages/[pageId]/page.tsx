import { PageEditorClient } from "./editor-client";

export default function PageEditorRoute({ params }: { params: { pageId: string } }) {
  return <PageEditorClient pageId={params.pageId} />;
}
