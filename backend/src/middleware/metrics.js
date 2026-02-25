import client from 'prom-client';

// Collect default metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics({ prefix: 'delivero_' });

// HTTP request duration histogram (seconds)
export const httpRequestDurationSeconds = new client.Histogram({
  name: 'delivero_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

export const httpRequestsTotal = new client.Counter({
  name: 'delivero_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Domain counters
export const inventoryToggleTotal = new client.Counter({
  name: 'delivero_inventory_toggles_total',
  help: 'Number of inventory availability toggles',
  labelNames: ['by_role'],
});

export const dispatchEstimateTotal = new client.Counter({
  name: 'delivero_dispatch_estimates_total',
  help: 'Number of dispatch estimate requests',
});

export const dispatchSimulateTotal = new client.Counter({
  name: 'delivero_dispatch_simulations_total',
  help: 'Number of dispatch simulate requests',
});

// Express middleware to measure request durations
export const metricsMiddleware = (req, res, next) => {
  const route = req.route && req.route.path ? req.route.path : req.path;
  const method = req.method;
  const end = httpRequestDurationSeconds.startTimer();

  res.on('finish', () => {
    const status = res.statusCode;
    end({ method, route, status_code: status });
    httpRequestsTotal.inc({ method, route, status_code: status }, 1);
  });

  next();
};

export default client;
