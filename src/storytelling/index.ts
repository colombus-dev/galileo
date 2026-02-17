// Types notebook
export type {
  Token,
  NotebookCell,
  NotebookSection,
  NotebookModel,
  DocEntry,
} from '@/types/notebook';

// Mocks
export { mockNotebookIris, mockNotebookSimple } from '@/mocks/notebook.mock';
export { mockDocs, mockDocNotFound } from '@/mocks/docs.mock';

// Mock API
export {
  uploadNotebookMock,
  fetchNotebookMock,
  fetchDocMock,
} from '@/mocks/mockApi';
export type {
  UploadNotebookResponse,
  FetchNotebookResponse,
  FetchDocResponse,
} from '@/mocks/mockApi';

// Composants
export {
  NotebookWorkspaceLayout,
  SummarySidebar,
  SectionSummaryView,
  CodePanel,
  CodeCell,
  TokenChip,
  CollapseToggle,
  DocSidePanel,
  SectionBadge,
} from '@/components/storytelling';

// Page
export { NotebookWorkspacePage } from '@/pages/storytelling/NotebookWorkspacePage';
