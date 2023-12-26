const defaultRevalidate = 60 * 60 * 3; // 3 hours

const cachedRequests = {
  prayers: {
    list: { revalidate: defaultRevalidate, tags: ["list-prayers"] },
    get: { revalidate: defaultRevalidate },
  },
  categories: {
    list: { revalidate: defaultRevalidate, tags: ["list-categories"] },
    get: { revalidate: defaultRevalidate },
  },
};

export default cachedRequests;
