/**
 * Resource Optimization Utility
 * Provides recommendations for system optimization and scaling
 */

import os from 'os';
import { execSync } from 'child_process';

class ResourceOptimizer {
  constructor() {
    this.systemInfo = this.getSystemInfo();
    this.recommendations = [];
  }

  /**
   * Get comprehensive system information
   */
  getSystemInfo() {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const loadAvg = os.loadavg();
    
    return {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      cpus: {
        count: cpus.length,
        model: cpus[0]?.model || 'Unknown',
        speed: cpus[0]?.speed || 0,
        cores: cpus.length
      },
      memory: {
        total: totalMem,
        free: freeMem,
        used: totalMem - freeMem,
        totalGB: (totalMem / 1024 / 1024 / 1024).toFixed(2),
        usedGB: ((totalMem - freeMem) / 1024 / 1024 / 1024).toFixed(2),
        freeGB: (freeMem / 1024 / 1024 / 1024).toFixed(2)
      },
      load: {
        '1min': loadAvg[0],
        '5min': loadAvg[1],
        '15min': loadAvg[2]
      },
      uptime: os.uptime(),
      process: {
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage()
      }
    };
  }

  /**
   * Analyze current system performance
   */
  analyzePerformance() {
    const analysis = {
      cpu: this.analyzeCpu(),
      memory: this.analyzeMemory(),
      load: this.analyzeLoad(),
      process: this.analyzeProcess(),
      overall: 'healthy'
    };

    // Determine overall health
    const issues = [
      analysis.cpu.status !== 'optimal',
      analysis.memory.status !== 'optimal',
      analysis.load.status !== 'optimal',
      analysis.process.status !== 'optimal'
    ].filter(Boolean).length;

    if (issues === 0) {
      analysis.overall = 'optimal';
    } else if (issues <= 2) {
      analysis.overall = 'degraded';
    } else {
      analysis.overall = 'critical';
    }

    return analysis;
  }

  /**
   * Analyze CPU performance
   */
  analyzeCpu() {
    const cpuCount = this.systemInfo.cpus.count;
    const load1min = this.systemInfo.load['1min'];
    const cpuUtilization = (load1min / cpuCount) * 100;

    let status = 'optimal';
    let recommendations = [];

    if (cpuUtilization > 90) {
      status = 'critical';
      recommendations.push('🔴 Critical CPU usage detected');
      recommendations.push('💡 Consider scaling up or optimizing CPU-intensive operations');
    } else if (cpuUtilization > 70) {
      status = 'warning';
      recommendations.push('🟡 High CPU usage detected');
      recommendations.push('💡 Monitor for potential scaling needs');
    }

    return {
      utilization: cpuUtilization.toFixed(1),
      cores: cpuCount,
      load1min: load1min.toFixed(2),
      status,
      recommendations
    };
  }

  /**
   * Analyze memory usage
   */
  analyzeMemory() {
    const memUsagePercent = (this.systemInfo.memory.used / this.systemInfo.memory.total) * 100;
    
    let status = 'optimal';
    let recommendations = [];

    if (memUsagePercent > 90) {
      status = 'critical';
      recommendations.push('🔴 Critical memory usage detected');
      recommendations.push('💡 Check for memory leaks or increase available memory');
    } else if (memUsagePercent > 75) {
      status = 'warning';
      recommendations.push('🟡 High memory usage detected');
      recommendations.push('💡 Monitor memory allocation patterns');
    }

    return {
      usagePercent: memUsagePercent.toFixed(1),
      usedGB: this.systemInfo.memory.usedGB,
      totalGB: this.systemInfo.memory.totalGB,
      freeGB: this.systemInfo.memory.freeGB,
      status,
      recommendations
    };
  }

  /**
   * Analyze system load
   */
  analyzeLoad() {
    const cpuCount = this.systemInfo.cpus.count;
    const load1min = this.systemInfo.load['1min'];
    const load5min = this.systemInfo.load['5min'];
    const load15min = this.systemInfo.load['15min'];
    
    let status = 'optimal';
    let recommendations = [];

    // Load average should ideally be < number of CPUs
    const loadRatio1min = load1min / cpuCount;
    const loadRatio5min = load5min / cpuCount;
    const loadRatio15min = load15min / cpuCount;

    if (loadRatio1min > 2) {
      status = 'critical';
      recommendations.push('🔴 Critical system load detected');
      recommendations.push('💡 Immediate scaling required');
    } else if (loadRatio1min > 1.5) {
      status = 'warning';
      recommendations.push('🟡 High system load detected');
      recommendations.push('💡 Consider horizontal scaling');
    } else if (loadRatio1min > 1) {
      status = 'caution';
      recommendations.push('🟡 System load approaching capacity');
      recommendations.push('💡 Monitor for scaling needs');
    }

    return {
      load1min: load1min.toFixed(2),
      load5min: load5min.toFixed(2),
      load15min: load15min.toFixed(2),
      cpuCount,
      loadRatio1min: loadRatio1min.toFixed(2),
      status,
      recommendations
    };
  }

  /**
   * Analyze Node.js process
   */
  analyzeProcess() {
    const memUsage = process.memoryUsage();
    const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
    const heapTotalMB = memUsage.heapTotal / 1024 / 1024;
    const heapUsagePercent = (heapUsedMB / heapTotalMB) * 100;
    
    let status = 'optimal';
    let recommendations = [];

    if (heapUsagePercent > 90) {
      status = 'critical';
      recommendations.push('🔴 Critical heap usage detected');
      recommendations.push('💡 Check for memory leaks in application code');
    } else if (heapUsagePercent > 75) {
      status = 'warning';
      recommendations.push('🟡 High heap usage detected');
      recommendations.push('💡 Consider optimizing memory usage');
    }

    return {
      heapUsedMB: heapUsedMB.toFixed(1),
      heapTotalMB: heapTotalMB.toFixed(1),
      heapUsagePercent: heapUsagePercent.toFixed(1),
      rssMB: (memUsage.rss / 1024 / 1024).toFixed(1),
      externalMB: (memUsage.external / 1024 / 1024).toFixed(1),
      uptime: process.uptime().toFixed(1),
      status,
      recommendations
    };
  }

  /**
   * Get scaling recommendations
   */
  getScalingRecommendations() {
    const analysis = this.analyzePerformance();
    const recommendations = [];

    // CPU-based scaling
    if (analysis.cpu.status === 'critical') {
      recommendations.push({
        type: 'scale-up',
        priority: 'high',
        resource: 'cpu',
        reason: 'Critical CPU utilization',
        action: 'Add more CPU cores or scale horizontally'
      });
    } else if (analysis.cpu.status === 'warning') {
      recommendations.push({
        type: 'scale-up',
        priority: 'medium',
        resource: 'cpu',
        reason: 'High CPU utilization',
        action: 'Monitor and prepare for scaling'
      });
    }

    // Memory-based scaling
    if (analysis.memory.status === 'critical') {
      recommendations.push({
        type: 'scale-up',
        priority: 'high',
        resource: 'memory',
        reason: 'Critical memory usage',
        action: 'Add more RAM or optimize memory usage'
      });
    } else if (analysis.memory.status === 'warning') {
      recommendations.push({
        type: 'scale-up',
        priority: 'medium',
        resource: 'memory',
        reason: 'High memory usage',
        action: 'Monitor memory usage patterns'
      });
    }

    // Load-based scaling
    if (analysis.load.status === 'critical') {
      recommendations.push({
        type: 'scale-out',
        priority: 'high',
        resource: 'horizontal',
        reason: 'Critical system load',
        action: 'Add more instances for load balancing'
      });
    } else if (analysis.load.status === 'warning') {
      recommendations.push({
        type: 'scale-out',
        priority: 'medium',
        resource: 'horizontal',
        reason: 'High system load',
        action: 'Prepare for horizontal scaling'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Get optimization recommendations
   */
  getOptimizationRecommendations() {
    const recommendations = [];

    // Node.js specific optimizations
    const processMem = process.memoryUsage();
    const heapUsagePercent = (processMem.heapUsed / processMem.heapTotal) * 100;

    if (heapUsagePercent > 80) {
      recommendations.push({
        category: 'memory',
        priority: 'high',
        title: 'Optimize Memory Usage',
        description: 'High heap usage detected',
        actions: [
          'Check for memory leaks',
          'Implement object pooling',
          'Use streams for large data processing',
          'Enable garbage collection tuning'
        ]
      });
    }

    // CPU optimizations
    const cpuUtilization = (this.systemInfo.load['1min'] / this.systemInfo.cpus.count) * 100;
    if (cpuUtilization > 70) {
      recommendations.push({
        category: 'cpu',
        priority: 'medium',
        title: 'Optimize CPU Usage',
        description: 'High CPU utilization detected',
        actions: [
          'Use clustering for CPU-intensive tasks',
          'Implement caching strategies',
          'Optimize database queries',
          'Use worker threads for heavy computations'
        ]
      });
    }

    // General optimizations
    recommendations.push({
      category: 'general',
      priority: 'low',
      title: 'General Performance Optimizations',
      description: 'Best practices for optimal performance',
      actions: [
        'Enable compression for responses',
        'Implement request caching',
        'Use connection pooling',
        'Optimize database indexes',
        'Monitor and log performance metrics'
      ]
    });

    return recommendations;
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const analysis = this.analyzePerformance();
    const scalingRecs = this.getScalingRecommendations();
    const optimizationRecs = this.getOptimizationRecommendations();

    return {
      timestamp: new Date().toISOString(),
      systemInfo: this.systemInfo,
      analysis,
      scaling: {
        recommendations: scalingRecs,
        needsScaling: scalingRecs.some(r => r.priority === 'high')
      },
      optimization: {
        recommendations: optimizationRecs,
        criticalIssues: optimizationRecs.filter(r => r.priority === 'high')
      },
      summary: {
        overall: analysis.overall,
        issues: scalingRecs.filter(r => r.priority === 'high').length + 
                optimizationRecs.filter(r => r.priority === 'high').length,
        status: analysis.overall === 'optimal' ? '✅ All systems optimal' : 
                analysis.overall === 'degraded' ? '⚠️ Some issues detected' : 
                '🔴 Critical issues detected'
      }
    };
  }

  /**
   * Generate ASCII performance report
   */
  generateASCIIReport() {
    const analysis = this.analyzePerformance();
    const scalingRecs = this.getScalingRecommendations();
    
    return `
╔══════════════════════════════════════════════════════════════╗
║                    PERFORMANCE OPTIMIZATION REPORT        ║
╚══════════════════════════════════════════════════════════════╝

🖥️  SYSTEM INFORMATION
═══════════════════════════════════════════════════════════════
Platform:     ${this.systemInfo.platform} (${this.systemInfo.arch})
Node.js:      ${this.systemInfo.nodeVersion}
CPU:          ${this.systemInfo.cpus.count} cores @ ${this.systemInfo.cpus.speed}MHz
Memory:       ${this.systemInfo.memory.totalGB}GB total, ${this.systemInfo.memory.usedGB}GB used
Uptime:       ${Math.floor(this.systemInfo.uptime / 3600)}h ${Math.floor((this.systemInfo.uptime % 3600) / 60)}m

📊  PERFORMANCE ANALYSIS
═══════════════════════════════════════════════════════════════
CPU Status:    ${analysis.cpu.status.toUpperCase()} (${analysis.cpu.utilization}%)
Memory Status: ${analysis.memory.status.toUpperCase()} (${analysis.memory.usagePercent}%)
Load Status:   ${analysis.load.status.toUpperCase()} (${analysis.load.load1min}/${this.systemInfo.cpus.count})
Process Status: ${analysis.process.status.toUpperCase()} (${analysis.process.heapUsagePercent}% heap)

Overall Status: ${analysis.overall.toUpperCase()}

🚀  SCALING RECOMMENDATIONS
═══════════════════════════════════════════════════════════════
${scalingRecs.length > 0 ? scalingRecs.map(rec => 
  `• ${rec.priority.toUpperCase()}: ${rec.action} (${rec.reason})`
).join('\\n') : '✅ No immediate scaling needed'}

⚡  OPTIMIZATION RECOMMENDATIONS
═══════════════════════════════════════════════════════════════
${this.getOptimizationRecommendations().map(rec => 
  `• ${rec.title}: ${rec.description}`
).join('\\n')}

═══════════════════════════════════════════════════════════════
Report Generated: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════
`;
  }
}

export default ResourceOptimizer;
