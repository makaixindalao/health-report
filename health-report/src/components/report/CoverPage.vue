<template>
  <div class="cover-page">
    <div class="header">
      <div class="logo">
        <!-- 使用文本替代图片，避免图片路径问题 -->
        <div class="logo-text">H</div>
      </div>
      <h1 class="title">健康体检报告</h1>
    </div>

    <div class="user-info">
      <div class="avatar">
        <div class="avatar-placeholder">
          <i class="user-icon"></i>
        </div>
      </div>
      <div class="info">
        <div class="info-item">
          <span class="label">姓名：</span>
          <span class="value">{{ reportData.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">性别：</span>
          <span class="value">{{ reportData.sex }}</span>
        </div>
        <div class="info-item">
          <span class="label">年龄：</span>
          <span class="value">{{ reportData.age }}岁</span>
        </div>
        <div class="info-item">
          <span class="label">检测时间：</span>
          <span class="value">{{ reportData.time }}</span>
        </div>
      </div>
    </div>

    <div class="report-summary">
      <h2>健康概览</h2>
      <div class="summary-chart">
        <div ref="radarChart" class="radar-chart"></div>
      </div>
    </div>

    <div class="swipe-tip">
      <span>向上滑动查看详细报告</span>
      <div class="arrow-up"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'CoverPage',
  props: {
    reportData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    try {
      console.log('CoverPage mounted, initializing radar chart...');
      this.$nextTick(() => {
        this.initRadarChart();
      });
    } catch (error) {
      console.error('Error initializing radar chart:', error);
    }
  },
  methods: {
    initRadarChart() {
      try {
        console.log('Initializing radar chart...');
        console.log('Radar chart container:', this.$refs.radarChart);

        // 确保DOM元素已经渲染
        if (!this.$refs.radarChart) {
          console.error('Radar chart container not found');
          return;
        }

        // 初始化雷达图
        this.chart = echarts.init(this.$refs.radarChart);

        // 获取各系统的健康状况数据
        const systems = [
          { name: '呼吸系统', value: this.getSystemHealthScore('respiratory_system') },
          { name: '感觉系统', value: this.getSystemHealthScore('sensory_system') },
          { name: '泌尿生殖系统', value: this.getSystemHealthScore('urogenital_system') },
          { name: '泌尿系统', value: this.getSystemHealthScore('urinary_system') },
          { name: '消化系统', value: this.getSystemHealthScore('digestive_system') },
          { name: '肌肉骨骼系统', value: this.getSystemHealthScore('musculoskeletal_system') }
        ];

        console.log('Systems data:', systems);

        const option = {
          backgroundColor: 'transparent',
          radar: {
            indicator: systems.map(item => ({ name: item.name, max: 10 })),
            splitNumber: 4,
            axisName: {
              color: '#333',
              fontSize: 12
            },
            splitArea: {
              areaStyle: {
                color: ['rgba(255, 255, 255, 0.5)', 'rgba(200, 200, 200, 0.3)']
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(100, 100, 100, 0.3)'
              }
            }
          },
          series: [{
            name: '健康状况',
            type: 'radar',
            data: [{
              value: systems.map(item => item.value),
              name: '健康指数',
              areaStyle: {
                color: 'rgba(64, 158, 255, 0.6)'
              },
              lineStyle: {
                color: '#409EFF',
                width: 2
              },
              itemStyle: {
                color: '#409EFF'
              }
            }]
          }]
        };

        this.chart.setOption(option);
        console.log('Radar chart initialized successfully');
      } catch (error) {
        console.error('Error initializing radar chart:', error);
      }
    },
    getSystemHealthScore(systemKey) {
      // 根据系统的检测结果计算健康分数
      // 这里简单实现，实际应用中可能需要更复杂的计算逻辑
      let score = 0;

      if (this.reportData.Physiological_system && this.reportData.Physiological_system[systemKey]) {
        const system = this.reportData.Physiological_system[systemKey];
        if (system.filter_project && system.filter_project.length > 0) {
          // 根据检测项目的结果计算分数
          const totalItems = system.filter_project.length;
          let weightSum = 0;

          system.filter_project.forEach(item => {
            if (item.resule === '重') {
              weightSum += 1;
            } else if (item.resule === '中') {
              weightSum += 5;
            } else if (item.resule === '低') {
              weightSum += 8;
            }
          });

          score = weightSum / totalItems;
        }
      } else if (systemKey === 'urogenital_system' || systemKey === 'urinary_system') {
        // 这些系统在JSON中是顶级键
        const system = this.reportData[systemKey];
        if (system && system.filter_project && system.filter_project.length > 0) {
          const totalItems = system.filter_project.length;
          let weightSum = 0;

          system.filter_project.forEach(item => {
            if (item.resule === '重') {
              weightSum += 1;
            } else if (item.resule === '中') {
              weightSum += 5;
            } else if (item.resule === '低') {
              weightSum += 8;
            }
          });

          score = weightSum / totalItems;
        }
      }

      // 确保分数在1-10之间
      return Math.max(1, Math.min(10, score));
    }
  }
};
</script>

<style scoped>
.cover-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.logo-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #409EFF;
  color: white;
  font-size: 36px;
  font-weight: bold;
  border-radius: 50%;
}

.title {
  font-size: 28px;
  color: #333;
  font-weight: bold;
  margin: 0;
}

.user-info {
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #999;
  border-radius: 50%;
  position: relative;
}

.user-icon:before {
  content: '';
  position: absolute;
  top: -20px;
  left: 10px;
  width: 20px;
  height: 20px;
  background-color: #999;
  border-radius: 50%;
}

.info {
  flex: 1;
}

.info-item {
  margin-bottom: 10px;
  font-size: 16px;
}

.label {
  color: #666;
  margin-right: 5px;
}

.value {
  color: #333;
  font-weight: 500;
}

.report-summary {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.report-summary h2 {
  font-size: 20px;
  color: #333;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}

.summary-chart {
  height: 100%;
}

.radar-chart {
  width: 100%;
  height: 100%;
}

.swipe-tip {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: #666;
  font-size: 14px;
  animation: bounce 2s infinite;
}

.arrow-up {
  margin: 10px auto;
  width: 20px;
  height: 20px;
  border-left: 2px solid #666;
  border-top: 2px solid #666;
  transform: rotate(45deg);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
