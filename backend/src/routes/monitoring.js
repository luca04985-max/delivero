/**
 * Monitoring Routes
 * Provides endpoints for performance monitoring and optimization
 */

import express from 'express';
import PerformanceMonitor from '../utils/performance-monitor.js';
import ResourceOptimizer from '../utils/resource-optimizer.js';

const router = express.Router();
const monitor = new PerformanceMonitor();
const optimizer = new ResourceOptimizer();

// Initialize monitoring
monitor.initialize();

/**
 * GET /health - Basic health check
 */
router.get('/health', (req, res) => {
  const metrics = monitor.getMetrics();
  const stress = monitor.isSystemUnderStress();
  
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
      requests: monitor.getMetrics().application.requests,
      errors: monitor.getMetrics().application.errors,
      avgResponseTime: monitor.getMetrics().application.responseTime.length > 0 
        ? monitor.getMetrics().application.responseTime.reduce((a, b) => a + b, 0) / monitor.getMetrics().application.responseTime.length 
        : 0
    },
    database: {
      queryCount: metrics.database.queryCount,
      avgResponseTime: metrics.database.avgResponseTime,
      connectionPool: metrics.database.connectionPool
    },
    stress,
    recommendations: monitor.getRecommendations()
  };
  
  res.status(stress.isStressed ? 200 : 200).json(health);
});

/**
 * GET /metrics - Detailed metrics
 */
router.get('/metrics', (req, res) => {
  const metrics = monitor.getMetrics();
  const stats = monitor.getStats();
  
  res.json({
    timestamp: new Date().toISOString(),
    metrics,
    requests: stats.requests,
    system: {
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid,
      memory: process.memoryUsage()
    }
  });
});

/**
 * GET /dashboard - ASCII performance dashboard
 */
router.get('/dashboard', (req, res) => {
  const metrics = monitor.getMetrics();
  const stress = monitor.isSystemUnderStress();
  
  // Generate ASCII dashboard
  const dashboard = `
╔══════════════════════════════════════════════════════════════╗
║                    PERFORMANCE DASHBOARD                    ║
╚══════════════════════════════════════════════════════════════╝

🖥️  SYSTEM STATUS
═══════════════════════════════════════════════════════════════
CPU Usage:    ${createBar(metrics.system.cpu[metrics.system.cpu.length - 1] || 0, 30)} ${(metrics.system.cpu[metrics.system.cpu.length - 1] || 0).toFixed(1)}%
Memory:      ${createBar(metrics.system.memory[metrics.system.memory.length - 1] || 0, 30)} ${(metrics.system.memory[metrics.system.memory.length - 1] || 0).toFixed(1)}%
Load Avg:    ${createBar(Math.min((metrics.system.loadAverage[metrics.system.loadAverage.length - 1] || 0) * 25, 100), 30)} ${(metrics.system.loadAverage[metrics.system.loadAverage.length - 1] || 0).toFixed(2)}
Status:      ${stress.isStressed ? '⚠️  STRESSED' : '✅ HEALTHY'}

📊  APPLICATION METRICS
═══════════════════════════════════════════════════════════════
Total Requests:    ${monitor.getStats().requests.total}
Error Rate:         ${monitor.getStats().requests.total > 0 ? (monitor.getStats().requests.errors / monitor.getStats().requests.total * 100).toFixed(2) : 0}%
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
${monitor.getRecommendations().length > 0 ? monitor.getRecommendations().join('\\n') : '✅ All systems operating normally'}

═══════════════════════════════════════════════════════════════
Last Updated: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════
`;
  
  res.set('Content-Type', 'text/plain');
  res.send(dashboard);
});

/**
 * GET /optimization - Performance optimization report
 */
router.get('/optimization', (req, res) => {
  const report = optimizer.generateReport();
  res.json(report);
});

/**
 * GET /optimization/report - ASCII optimization report
 */
router.get('/optimization/report', (req, res) => {
  const report = optimizer.generateASCIIReport();
  res.set('Content-Type', 'text/plain');
  res.send(report);
});

/**
 * GET /system - System information
 */
router.get('/system', (req, res) => {
  const systemInfo = optimizer.systemInfo;
  const analysis = optimizer.analyzePerformance();
  
  res.json({
    timestamp: new Date().toISOString(),
    system: systemInfo,
    analysis,
    recommendations: {
      scaling: optimizer.getScalingRecommendations(),
      optimization: optimizer.getOptimizationRecommendations()
    }
  });
});

/**
 * POST /track-request - Track a request (for manual tracking)
 */
router.post('/track-request', (req, res) => {
  const { responseTime, isError = false } = req.body;
  
  if (typeof responseTime !== 'number' || responseTime < 0) {
    return res.status(400).json({ error: 'Invalid responseTime' });
  }
  
  monitor.trackRequest(responseTime, isError);
  
  res.json({ 
    message: 'Request tracked successfully',
    metrics: monitor.getStats()
  });
});

/**
 * POST /track-db-query - Track a database query (for manual tracking)
 */
router.post('/track-db-query', (req, res) => {
  const { responseTime, isSlow = false } = req.body;
  
  if (typeof responseTime !== 'number' || responseTime < 0) {
    return res.status(400).json({ error: 'Invalid responseTime' });
  }
  
  monitor.trackDbQuery(responseTime, isSlow);
  
  res.json({ 
    message: 'Database query tracked successfully',
    metrics: monitor.getMetrics()
  });
});

/**
 * GET /recommendations - Get current recommendations
 */
router.get('/recommendations', (req, res) => {
  const performanceRecs = monitor.getRecommendations();
  const scalingRecs = optimizer.getScalingRecommendations();
  const optimizationRecs = optimizer.getOptimizationRecommendations();
  
  res.json({
    timestamp: new Date().toISOString(),
    performance: performanceRecs,
    scaling: scalingRecs,
    optimization: optimizationRecs,
    summary: {
      total: performanceRecs.length + scalingRecs.length + optimizationRecs.length,
      critical: scalingRecs.filter(r => r.priority === 'high').length + 
                optimizationRecs.filter(r => r.priority === 'high').length,
      warning: scalingRecs.filter(r => r.priority === 'medium').length + 
               optimizationRecs.filter(r => r.priority === 'medium').length
    }
  });
});

/**
 * GET /stress-test - Simulate system stress
 */
router.get('/stress-test', (req, res) => {
  const { duration = 10000 } = req.query; // Default 10 seconds
  
  console.log('🔥 Starting stress test...');
  
  // Simulate CPU stress
  const startTime = Date.now();
  const stressInterval = setInterval(() => {
    // CPU intensive calculation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    
    // Memory allocation
    const largeArray = new Array(10000).fill(0).map(() => ({ 
      id: Math.random(), 
      data: new Array(100).fill(Math.random()) 
    }));
    
    if (Date.now() - startTime > duration) {
      clearInterval(stressInterval);
      console.log('✅ Stress test completed');
      res.json({ 
        message: 'Stress test completed',
        duration: duration,
        finalMetrics: monitor.getMetrics()
      });
    }
  }, 100);
});

/**
 * GET /benchmark - Run performance benchmark
 */
router.get('/benchmark', (req, res) => {
  const { iterations = 1000 } = req.query;
  
  console.log('🏃 Starting performance benchmark...');
  
  const startTime = Date.now();
  let operations = 0;
  
  // CPU benchmark
  const cpuStart = Date.now();
  for (let i = 0; i < iterations; i++) {
    Math.sqrt(Math.random() * 1000000);
    operations++;
  }
  const cpuTime = Date.now() - cpuStart;
  
  // Memory benchmark
  const memStart = Date.now();
  const arrays = [];
  for (let i = 0; i < 100; i++) {
    arrays.push(new Array(1000).fill(Math.random()));
    operations++;
  }
  const memTime = Date.now() - memStart;
  
  const totalTime = Date.now() - startTime;
  
  res.json({
    message: 'Benchmark completed',
    iterations: parseInt(iterations),
    operations,
    results: {
      totalTime: `${totalTime}ms`,
      cpuOperations: `${cpuTime}ms`,
      memoryOperations: `${memTime}ms`,
      opsPerSecond: Math.floor(operations / (totalTime / 1000))
    },
    systemMetrics: monitor.getMetrics()
  });
});

/**
 * GET /alerts - Get system alerts
 */
router.get('/alerts', (req, res) => {
  const stress = monitor.isSystemUnderStress();
  const analysis = optimizer.analyzePerformance();
  const alerts = [];
  
  // CPU alerts
  if (stress.cpuHigh) {
    alerts.push({
      type: 'critical',
      category: 'cpu',
      message: 'High CPU usage detected',
      value: `${(monitor.getMetrics().system.cpu[monitor.getMetrics().system.cpu.length - 1] || 0).toFixed(1)}%`,
      recommendation: 'Consider scaling up or optimizing CPU-intensive operations'
    });
  }
  
  // Memory alerts
  if (stress.memoryHigh) {
    alerts.push({
      type: 'critical',
      category: 'memory',
      message: 'High memory usage detected',
      value: `${(monitor.getMetrics().system.memory[monitor.getMetrics().system.memory.length - 1] || 0).toFixed(1)}%`,
      recommendation: 'Check for memory leaks or increase available memory'
    });
  }
  
  // Load alerts
  if (stress.loadHigh) {
    alerts.push({
      type: 'warning',
      category: 'load',
      message: 'High system load detected',
      value: (monitor.getMetrics().system.loadAverage[monitor.getMetrics().system.loadAverage.length - 1] || 0).toFixed(2),
      recommendation: 'Consider horizontal scaling'
    });
  }
  
  // Application alerts
  const errorRate = monitor.getStats().requests.total > 0 ? 
    (monitor.getStats().requests.errors / monitor.getStats().requests.total) : 0;
  
  if (errorRate > 0.05) {
    alerts.push({
      type: 'warning',
      category: 'application',
      message: 'High error rate detected',
      value: `${(errorRate * 100).toFixed(2)}%`,
      recommendation: 'Check application logs for errors'
    });
  }
  
  res.json({
    timestamp: new Date().toISOString(),
    alerts,
    summary: {
      total: alerts.length,
      critical: alerts.filter(a => a.type === 'critical').length,
      warning: alerts.filter(a => a.type === 'warning').length
    }
  });
});

/**
 * Helper function to create visual bars
 */
function createBar(value, max, filledChar = '█', emptyChar = '░') {
  const percentage = Math.min(value, 100) / 100;
  const filledCount = Math.floor(percentage * max);
  const emptyCount = max - filledCount;
  
  return filledChar.repeat(filledCount) + emptyChar.repeat(emptyCount);
}

export default router;
