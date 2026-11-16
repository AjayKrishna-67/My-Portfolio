import { createContext } from 'react';

// Each cursor on the first page is one of the tools the stores are built with.
export const CURSORS = [
  { name: 'React JS', color: '#22d3ee' },
  { name: 'Vendure', color: '#f472b6' },
  { name: 'GraphQL', color: '#a78bfa' },
  { name: 'REST API', color: '#fb923c' },
  { name: 'Node JS', color: '#84cc16' },
];

// Answers "has this block been placed yet?" for each block id.
export const BuildContext = createContext(null);
