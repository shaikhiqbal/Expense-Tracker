import { useState } from 'react';

export type Page = 'home' | 'dashboard' | 'transactions' | 'about' | 'contact' | 'profile' | 'settings';

export function useRouter() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  return { currentPage, navigate };
}