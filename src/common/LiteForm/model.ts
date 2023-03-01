import { useState, useCallback } from 'react';

export default () => {
  const initState = { menuList: [] };
  const [state, setState] = useState<any>(initState);

  return {
    state,
  };
};
