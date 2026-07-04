export const calculatePaginationData = (page, perPage) => {
  const limit = Number(perPage);
  const skip = (Number(page) - 1) * limit;

  return {
    limit,
    skip,
  };
};
