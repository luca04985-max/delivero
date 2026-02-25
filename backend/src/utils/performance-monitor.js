/**
 * Performance Monitoring Utility
 * Tracks system resources, database performance, and application metrics
 */

import os from 'os';
import process from 'process';
import { performance } from 'perf_hooks';

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      system: {
        cpu: [],
        memory: [],
        loadAverage: [],
        uptime: 0,
      },
      database: {
        queryCount: 0,
        slowQueries: [],
        connectionPool: 0,
        avgResponseTime: 0,
      },
      application: {
        requests: 0,
        errors: 0,
        responseTime: [],
        activeConnections: 0,
      },
    };

    this.startTime = Date.now();
    this.lastCpuUsage = process.cpuUsage();
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }

  /**
   * Start performance monitoring
   * @param {number} intervalMs - Monitoring interval in milliseconds
   */
  startMonitoring(intervalMs = 5000) {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    console.log('🚀 Performance monitoring started');

    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
      this.logMetrics();
    }, intervalMs);

    // Log initial system info
    this.logSystemInfo();
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('⏹️ Performance monitoring stopped');
    this.logSummary();
  }

  /**
   * Collect all performance metrics
   */
  collectMetrics() {
    const timestamp = Date.now();

    // System metrics
    this.collectSystemMetrics(timestamp);

    // Process metrics
    this.collectProcessMetrics(timestamp);

    // Database metrics (would be integrated with actual DB monitoring)
    this.collectDatabaseMetrics(timestamp);
  }

  /**
   * Collect system-level metrics
   */
  collectSystemMetrics(timestamp) {
    const cpus = os.cpus();
    const loadAvg = os.loadavg();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    // CPU usage calculation
    const currentCpuUsage = process.cpuUsage(this.lastCpuUsage);
    const cpuPercent = this.calculateCpuPercent(currentCpuUsage);
    this.lastCpuUsage = process.cpuUsage();

    const systemMetric = {
      timestamp,
      cpu: cpuPercent,
      memory: {
        total: totalMem,
        used: usedMem,
        free: freeMem,
        usagePercent: (usedMem / totalMem) * 100,
      },
      loadAverage: loadAvg,
      cpuCount: cpus.length,
    };

    // Keep last 60 data points (5 minutes with 5s interval)
    this.metrics.system.cpu.push(cpuPercent);
    this.metrics.system.memory.push(systemMetric.memory.usagePercent);
    this.metrics.system.loadAverage.push(loadAvg[0]); // 1-minute load average

    if (this.metrics.system.cpu.length > 60) {
      this.metrics.system.cpu.shift();
      this.metrics.system.memory.shift();
      this.metrics.system.loadAverage.shift();
    }
  }

  /**
   * Collect process-level metrics
   */
  collectProcessMetrics(timestamp) {
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();

    const processMetric = {
      timestamp,
      memory: memUsage,
      uptime,
      pid: process.pid,
      version: process.version,
      platform: process.platform,
    };

    this.metrics.system.uptime = uptime;
  }

  /**
   * Collect database metrics (placeholder - would integrate with actual DB)
   */
  collectDatabaseMetrics(timestamp) {
    // This would be integrated with actual database monitoring
    // For now, we'll simulate some metrics
    const dbMetric = {
      timestamp,
      queryCount: this.metrics.database.queryCount++,
      avgResponseTime: Math.random() * 100 + 10, // Simulated
      connectionPool: Math.floor(Math.random() * 10) + 1,
    };

    this.metrics.database.avgResponseTime = dbMetric.avgResponseTime;
    this.metrics.database.connectionPool = dbMetric.connectionPool;
  }

  /**
   * Calculate CPU usage percentage
   */
  calculateCpuPercent(cpuUsage) {
    const totalMicroSec = cpuUsage.user + cpuUsage.system;
    const totalSec = totalMicroSec / 1000000; // Convert to seconds
    return Math.min(100, totalSec * 100); // Cap at 100%
  }

  /**
   * Log current metrics with visual indicators
   */
  logMetrics() {
    const latestCpu = this.metrics.system.cpu[this.metrics.system.cpu.length - 1] || 0;
    const latestMem = this.metrics.system.memory[this.metrics.system.memory.length - 1] || 0;
    const latestLoad =
      this.metrics.system.loadAverage[this.metrics.system.loadAverage.length - 1] || 0;

    // Create visual bars for metrics
    const cpuBar = this.createBar(latestCpu, 20, '█', '░');
    const memBar = this.createBar(latestMem, 20, '█', '░');
    const loadBar = this.createBar(Math.min(latestLoad * 20, 100), 20, '█', '░');

    console.log(`📊 Performance Metrics [${new Date().toLocaleTimeString()}]`);
    console.log(`   CPU: ${cpuBar} ${latestCpu.toFixed(1)}%`);
    console.log(`   RAM: ${memBar} ${latestMem.toFixed(1)}%`);
    console.log(`   Load: ${loadBar} ${latestLoad.toFixed(2)}`);
    console.log(
      `   DB: ${this.metrics.database.queryCount} queries | ${this.metrics.database.avgResponseTime.toFixed(1)}ms avg`,
    );
    console.log(
      `   Requests: ${this.metrics.application.requests} | Errors: ${this.metrics.application.errors}`,
    );
    console.log('');
  }

  /**
   * Create visual bar for metrics
   */
  createBar(value, max, filledChar = '█', emptyChar = '░') {
    const percentage = Math.min(value, 100) / 100;
    const filledCount = Math.floor(percentage * max);
    const emptyCount = max - filledCount;

    return filledChar.repeat(filledCount) + emptyChar.repeat(emptyCount);
  }

  /**
   * Log initial system information
   */
  logSystemInfo() {
    console.log('🖥️ System Information:');
    console.log(`   Platform: ${os.type()} ${os.release()}`);
    console.log(`   Architecture: ${os.arch()}`);
    console.log(`   CPU: ${os.cpus().length} cores - ${os.cpus()[0].model}`);
    console.log(`   Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log(`   Node.js: ${process.version}`);
    console.log(`   PID: ${process.pid}`);
    console.log('');
  }

  /**
   * Log performance summary
   */
  logSummary() {
    const uptime = process.uptime();
    const avgCpu =
      this.metrics.system.cpu.reduce((a, b) => a + b, 0) / this.metrics.system.cpu.length;
    const avgMem =
      this.metrics.system.memory.reduce((a, b) => a + b, 0) / this.metrics.system.memory.length;
    const avgLoad =
      this.metrics.system.loadAverage.reduce((a, b) => a + b, 0) /
      this.metrics.system.loadAverage.length;

    console.log('📈 Performance Summary:');
    console.log(`   Uptime: ${uptime.toFixed(2)}s`);
    console.log(`   Average CPU: ${avgCpu.toFixed(1)}%`);
    console.log(`   Average Memory: ${avgMem.toFixed(1)}%`);
    console.log(`   Average Load: ${avgLoad.toFixed(2)}`);
    console.log(`   Total DB Queries: ${this.metrics.database.queryCount}`);
    console.log(`   Total Requests: ${this.metrics.application.requests}`);
    console.log(
      `   Error Rate: ${this.metrics.application.errors > 0 ? ((this.metrics.application.errors / this.metrics.application.requests) * 100).toFixed(2) : 0}%`,
    );
    console.log('');
  }

  /**
   * Track application request
   */
  trackRequest(responseTime, isError = false) {
    this.metrics.application.requests++;
    if (isError) {
      this.metrics.application.errors++;
    }

    this.metrics.application.responseTime.push(responseTime);

    // Keep last 100 response times
    if (this.metrics.application.responseTime.length > 100) {
      this.metrics.application.responseTime.shift();
    }
  }

  /**
   * Track database query
   */
  trackDbQuery(responseTime, isSlow = false) {
    this.metrics.database.queryCount++;

    if (isSlow) {
      this.metrics.database.slowQueries.push({
        timestamp: Date.now(),
        responseTime,
      });
    }

    // Update average response time
    const avgTime = this.metrics.database.responseTime || 0;
    this.metrics.database.avgResponseTime = (avgTime + responseTime) / 2;
  }

  /**
   * Get current metrics object
   */
  getMetrics() {
    return {
      ...this.metrics,
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }

  /**
   * Check if system is under stress
   */
  isSystemUnderStress() {
    const latestCpu = this.metrics.system.cpu[this.metrics.system.cpu.length - 1] || 0;
    const latestMem = this.metrics.system.memory[this.metrics.system.memory.length - 1] || 0;
    const latestLoad =
      this.metrics.system.loadAverage[this.metrics.system.loadAverage.length - 1] || 0;

    return {
      cpuHigh: latestCpu > 80,
      memoryHigh: latestMem > 85,
      loadHigh: latestLoad > os.cpus().length * 2,
      isStressed: latestCpu > 80 || latestMem > 85 || latestLoad > os.cpus().length * 2,
    };
  }

  /**
   * Get performance recommendations
   */
  getRecommendations() {
    const stress = this.isSystemUnderStress();
    const recommendations = [];

    if (stress.cpuHigh) {
      recommendations.push('⚠️ High CPU usage detected - consider scaling up or optimizing code');
    }

    if (stress.memoryHigh) {
      recommendations.push('⚠️ High memory usage detected - check for memory leaks');
    }

    if (stress.loadHigh) {
      recommendations.push('⚠️ High load average detected - consider horizontal scaling');
    }

    if (this.metrics.database.avgResponseTime > 500) {
      recommendations.push('⚠️ Slow database queries detected - optimize queries or add indexes');
    }

    if (this.metrics.application.errors / this.metrics.application.requests > 0.05) {
      recommendations.push('⚠️ High error rate detected - check application logs');
    }

    return recommendations;
  }
}

export default PerformanceMonitor;
