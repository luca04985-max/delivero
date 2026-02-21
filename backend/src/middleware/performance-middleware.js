/**
 * Performance Monitoring Middleware
 * Tracks request performance and system resources
 */

import PerformanceMonitor from '../utils/performance-monitor.js';

class PerformanceMiddleware {
  constructor() {
    this.monitor = new PerformanceMonitor();
    this.requestTimes = new Map();
    this.requestCounts = {
      total: 0,
      byEndpoint: new Map(),
      byMethod: new Map(),
      errors: 0
    };
  }

  /**
   * Initialize performance monitoring
   */
  initialize() {
    this.monitor.startMonitoring(5000); // Monitor every 5 seconds

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\\n🛑 Graceful shutdown initiated...');
      this.monitor.stopMonitoring();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\\n🛑 Graceful shutdown initiated...');
      this.monitor.stopMonitoring();
      process.exit(0);
    });
  }

  /**
   * Express middleware for performance tracking
   */
  middleware() {
    return (req, res, next) => {
      const startTime = Date.now();
      const requestId = `${req.method}-${req.path}-${startTime}`;

      // Store request start time
      this.requestTimes.set(requestId, startTime);

      // Track request count
      this.requestCounts.total++;
      const endpoint = req.route?.path || req.path;
      this.requestCounts.byEndpoint.set(endpoint, (this.requestCounts.byEndpoint.get(endpoint) || 0) + 1);
      this.requestCounts.byMethod.set(req.method, (this.requestCounts.byMethod.get(req.method) || 0) + 1);

      // Override res.end to track completion
      const originalEnd = res.end;
      res.end = function (...args) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Track request completion
        this.monitor.trackRequest(responseTime, res.statusCode >= 400);

        // Clean up request tracking
        this.requestTimes.delete(requestId);

        // Log slow requests
        if (responseTime > 1000) {
          console.log(`🐌 Slow request: ${req.method} ${req.path} - ${responseTime}ms`);
        }

        // Call original end with correct context
        return originalEnd.apply(res, args);
      }.bind({ monitor: this.monitor, requestTimes: this.requestTimes });

      next();
    };
  }

  /**
   * Database query tracking middleware
   */
  databaseMiddleware() {
    return (req, res, next) => {
      // This would be integrated with actual database query tracking
      // For now, we'll simulate query tracking
      const originalQuery = req.db?.query;

      if (originalQuery) {
        req.db.query = async (...args) => {
          const startTime = Date.now();
          try {
            const result = await originalQuery.apply(req.db, args);
            const responseTime = Date.now() - startTime;

            this.monitor.trackDbQuery(responseTime, responseTime > 500);

            return result;
          } catch (error) {
            const responseTime = Date.now() - startTime;
            this.monitor.trackDbQuery(responseTime, true);
            throw error;
          }
        };
      }

      next();
    };
  }

  /**
   * Health check endpoint
   */
  healthCheck() {
    return (req, res) => {
      const metrics = this.monitor.getMetrics();
      const stress = this.monitor.isSystemUnderStress();
      const recommendations = this.monitor.getRecommendations();

      const health = {
        status: stress.isStressed ? 'degraded' : 'healthy',
        timestamp: new Date().toISOString(),
        uptime: metrics.uptime,
        system: {
          cpu: metrics.system.cpu[metrics.system.cpu.length - 1] || 0,
          memory: metrics.system.memory[metrics.system.memory.length - 1] || 0,
          loadAverage: metrics.system.loadAverage[metrics.system.loadAverage.length - 1] || 0
        },
        application: {
          requests: this.requestCounts.total,
          errors: this.requestCounts.errors,
          avgResponseTime: metrics.application.responseTime.length > 0
            ? metrics.application.responseTime.reduce((a, b) => a + b, 0) / metrics.application.responseTime.length
            : 0
        },
        database: {
          queryCount: metrics.database.queryCount,
          avgResponseTime: metrics.database.avgResponseTime,
          connectionPool: metrics.database.connectionPool
        },
        stress,
        recommendations
      };

      res.status(stress.isStressed ? 200 : 200).json(health);
    };
  }

  /**
   * Metrics endpoint for detailed monitoring
   */
  metricsEndpoint() {
    return (req, res) => {
      const metrics = this.monitor.getMetrics();

      res.json({
        timestamp: new Date().toISOString(),
        metrics,
        requests: {
          total: this.requestCounts.total,
          byEndpoint: Object.fromEntries(this.requestCounts.byEndpoint),
          byMethod: Object.fromEntries(this.requestCounts.byMethod),
          errors: this.requestCounts.errors,
          errorRate: this.requestCounts.total > 0 ? (this.requestCounts.errors / this.requestCounts.total * 100).toFixed(2) : 0
        },
        system: {
          platform: process.platform,
          nodeVersion: process.version,
          pid: process.pid,
          memory: process.memoryUsage()
        }
      });
    };
  }

  /**
   * Performance dashboard endpoint
   */
  dashboardEndpoint() {
    return (req, res) => {
      const metrics = this.monitor.getMetrics();
      const stress = this.monitor.isSystemUnderStress();

      // Generate ASCII dashboard
      const dashboard = this.generateDashboard(metrics, stress);

      res.set('Content-Type', 'text/plain');
      res.send(dashboard);
    };
  }

  /**
   * Generate ASCII performance dashboard
   */
  generateDashboard(metrics, stress) {
    const latestCpu = metrics.system.cpu[metrics.system.cpu.length - 1] || 0;
    const latestMem = metrics.system.memory[metrics.system.memory.length - 1] || 0;
    const latestLoad = metrics.system.loadAverage[metrics.system.loadAverage.length - 1] || 0;

    return `
╔══════════════════════════════════════════════════════════════╗
║                    PERFORMANCE DASHBOARD                    ║
╚══════════════════════════════════════════════════════════════╝

🖥️  SYSTEM STATUS
═══════════════════════════════════════════════════════════════
CPU Usage:    ${this.monitor.createBar(latestCpu, 30)} ${latestCpu.toFixed(1)}%
Memory:      ${this.monitor.createBar(latestMem, 30)} ${latestMem.toFixed(1)}%
Load Avg:    ${this.monitor.createBar(Math.min(latestLoad * 25, 100), 30)} ${latestLoad.toFixed(2)}
Status:      ${stress.isStressed ? '⚠️  STRESSED' : '✅ HEALTHY'}

📊  APPLICATION METRICS
═══════════════════════════════════════════════════════════════
Total Requests:    ${this.requestCounts.total}
Error Rate:         ${this.requestCounts.total > 0 ? (this.requestCounts.errors / this.requestCounts.total * 100).toFixed(2) : 0}%
Avg Response Time:  ${metrics.application.responseTime.length > 0 ? (metrics.application.responseTime.reduce((a, b) => a + b, 0) / metrics.application.responseTime.length).toFixed(1) : 0}ms

🗄️  DATABASE PERFORMANCE
═══════════════════════════════════════════════════════════════
Query Count:       ${metrics.database.queryCount}
Avg Query Time:    ${metrics.database.avgResponseTime.toFixed(1)}ms
Connection Pool:    ${metrics.database.connectionPool}

⏱️  UPTIME
═══════════════════════════════════════════════════════════════
${Math.floor(metrics.uptime / 3600)}h ${Math.floor((metrics.uptime % 3600) / 60)}m ${Math.floor(metrics.uptime % 60)}s

📈  RECOMMENDATIONS
═══════════════════════════════════════════════════════════════
${this.monitor.getRecommendations().length > 0 ? this.monitor.getRecommendations().join('\\n') : '✅ All systems operating normally'}

═══════════════════════════════════════════════════════════════
Last Updated: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════
`;
  }

  /**
   * Create visual bar for dashboard
   */
  createBar(value, max, filledChar = '█', emptyChar = '░') {
    const percentage = Math.min(value, 100) / 100;
    const filledCount = Math.floor(percentage * max);
    const emptyCount = max - filledCount;

    return filledChar.repeat(filledCount) + emptyChar.repeat(emptyCount);
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      requests: this.requestCounts,
      metrics: this.monitor.getMetrics(),
      stress: this.monitor.isSystemUnderStress(),
      recommendations: this.monitor.getRecommendations()
    };
  }
}

export default PerformanceMiddleware;
