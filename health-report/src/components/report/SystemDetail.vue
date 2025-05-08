<template>
  <div class="system-detail">
    <div class="system-header">
      <h2 class="system-title">{{ title }}</h2>
      <div class="system-icon">
        <div class="icon-text">{{ title.charAt(0) }}</div>
      </div>
    </div>

    <div class="reference-range">
      <h3>参考范围</h3>
      <div class="range-items">
        <div
          v-for="(item, index) in system.reference_range"
          :key="index"
          class="range-item"
          :class="getLevelClass(item.resule)"
        >
          <span class="range-value">{{ item.d_value }}</span>
          <span class="range-level">{{ item.resule }}</span>
        </div>
      </div>
    </div>

    <div class="project-list">
      <h3>检测项目</h3>
      <div class="project-items">
        <div
          v-for="(item, index) in system.filter_project"
          :key="index"
          class="project-item"
          :class="getLevelClass(item.resule)"
        >
          <div class="project-name">{{ item.name }}</div>
          <div class="project-value">{{ item.d_value }}</div>
          <div class="project-level">{{ item.resule }}</div>
        </div>
      </div>
    </div>

    <div class="system-chart" v-if="showChart">
      <h3>健康趋势</h3>
      <div ref="healthChart" class="health-chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'SystemDetail',
  props: {
    system: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    systemKey: {
      type: String,
      required: true
    },
    showChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    try {
      console.log('SystemDetail mounted for:', this.title);
      if (this.showChart) {
        this.$nextTick(() => {
          this.initHealthChart();
        });
      }
    } catch (error) {
      console.error('Error in SystemDetail mounted:', error);
    }
  },
  methods: {
    getLevelClass(level) {
      if (!level) return '';

      switch (level) {
        case '重':
          return 'level-high';
        case '中':
          return 'level-medium';
        case '低':
          return 'level-low';
        default:
          return '';
      }
    },
    // 删除不需要的getSystemIcon方法
    initHealthChart() {
      try {
        console.log('Initializing health chart for:', this.title);
        console.log('Chart container:', this.$refs.healthChart);

        // 确保DOM元素已经渲染
        if (!this.$refs.healthChart) {
          console.error('Chart container not found');
          return;
        }

        // 初始化健康趋势图表
        this.chart = echarts.init(this.$refs.healthChart);

        // 模拟历史数据
        const dates = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const data = [5, 6, 4, 7, 5, this.calculateSystemScore()];

        const option = {
          backgroundColor: 'transparent',
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: dates,
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 10,
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0.05)'
              }
            }
          },
          series: [{
            data: data,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#409EFF'
            },
            lineStyle: {
              width: 3,
              color: '#409EFF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.5)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
              ])
            }
          }]
        };

        this.chart.setOption(option);
        console.log('Health chart initialized successfully');
      } catch (error) {
        console.error('Error initializing health chart:', error);
      }
    },
    calculateSystemScore() {
      // 计算系统的健康分数
      if (!this.system || !this.system.filter_project) return 5;

      const totalItems = this.system.filter_project.length;
      if (totalItems === 0) return 5;

      let weightSum = 0;

      this.system.filter_project.forEach(item => {
        if (item.resule === '重') {
          weightSum += 1;
        } else if (item.resule === '中') {
          weightSum += 5;
        } else if (item.resule === '低') {
          weightSum += 8;
        } else {
          weightSum += 5; // 默认中等
        }
      });

      return Math.max(1, Math.min(10, weightSum / totalItems));
    }
  }
};
</script>

<style scoped>
.system-detail {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.system-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.system-title {
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.system-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
}

h3 {
  font-size: 16px;
  color: #666;
  margin-top: 0;
  margin-bottom: 15px;
}

.reference-range {
  margin-bottom: 20px;
}

.range-items {
  display: flex;
  justify-content: space-around;
}

.range-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.range-value {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.range-level {
  font-size: 14px;
}

.project-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.project-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.project-value {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.project-level {
  font-size: 14px;
  font-weight: 500;
}

.health-chart {
  height: 200px;
  margin-top: 10px;
}

/* 级别颜色 */
.level-high {
  background-color: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

.level-medium {
  background-color: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.level-low {
  background-color: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}
</style>
