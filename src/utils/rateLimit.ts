let requestsQueue: any[] = [];
const RATE_LIMIT_WINDOW = 30 * 1000;
const MAX_REQUESTS = 10;

export const rateLimitedRequest = async (
  requestFunction: () => Promise<any>
): Promise<any> => {
  const now = Date.now();
  requestsQueue = requestsQueue.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (requestsQueue.length >= MAX_REQUESTS) {
    const oldestRequestTime = requestsQueue[0];
    const timeToWait = RATE_LIMIT_WINDOW - (now - oldestRequestTime);
    await new Promise((resolve) => setTimeout(resolve, timeToWait));
    requestsQueue = requestsQueue.slice(1);
  }

  requestsQueue.push(now);
  return requestFunction();
};
