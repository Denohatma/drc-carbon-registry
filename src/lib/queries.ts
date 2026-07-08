export interface ProjectQuery {
  id: string;
  projectId: string;
  projectName: string;
  userName: string;
  userEmail: string;
  question: string;
  response: string | null;
  status: 'Open' | 'Responded' | 'Closed';
  createdAt: string;
  respondedAt: string | null;
  respondedBy: string | null;
}

const STORAGE_KEY = 'drc-project-queries';

export function getQueries(): ProjectQuery[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuery(query: ProjectQuery) {
  const queries = getQueries();
  queries.unshift(query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
}

export function updateQuery(id: string, updates: Partial<ProjectQuery>) {
  const queries = getQueries();
  const idx = queries.findIndex((q) => q.id === id);
  if (idx !== -1) {
    queries[idx] = { ...queries[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  }
  return queries;
}

export function generateId() {
  return 'QRY-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}
