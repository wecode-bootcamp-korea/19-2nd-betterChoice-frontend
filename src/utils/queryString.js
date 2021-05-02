export const stringToQuery = queryString => {
  const [, params] = queryString.split('?');
  return params.split('&').reduce((acc, cur) => {
    const [k, v] = cur.split('=');
    return { ...acc, [k]: v };
  }, {});
};

export const queryToString = queryObj => {
  return (
    '?' +
    Object.entries(queryObj)
      .map(e => e.join('='))
      .join('&')
  );
};
