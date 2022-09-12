import { useEffect } from 'react';

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = `Twitter ${title ? `| ${title}` : ''}`;
  }, [title]);
};

export default useDocumentTitle;
