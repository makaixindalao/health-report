<template>
  <div class="system-detail-dialog" v-if="visible">
    <div class="dialog-overlay" @click="close"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      
      <div class="dialog-body">
        <div class="system-info">
          <div class="system-icon">{{ icon }}</div>
          <div class="system-status" :class="getStatusClass()">{{ status }}</div>
        </div>
        
        <div class="reference-range" v-if="system && system.reference_range">
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
        
        <div class="project-list" v-if="system && system.filter_project">
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
        
        <div class="system-chart">
          <h3>健康趋势</h3>
          <div class="chart-placeholder">
            <div class="chart-line">
              <div class="chart-point" v-for="n in 6" :key="n" :style="{ height: getRandomHeight() }"></div>
            </div>
            <div class="chart-labels">
              <span v-for="n in 6" :key="n">{{ n }}月</span>
            </div>
          </div>
        </div>
        
        <div class="system-advice">
          <h3>健康建议</h3>
          <p>{{ getSystemAdvice() }}</p>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="primary-btn" @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemDetailDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    system: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: '系统详情'
    },
    systemKey: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: '系'
    },
    status: {
      type: String,
      default: '未知'
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
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
    getStatusClass() {
      if (this.status === '良好') return 'status-good';
      if (this.status === '注意') return 'status-warning';
      if (this.status === '警告') return 'status-danger';
      return '';
    },
    getRandomHeight() {
      // 生成随机高度，模拟图表数据
      const height = 20 + Math.floor(Math.random() * 60);
      return `${height}px`;
    },
    getSystemAdvice() {
      // 根据系统类型返回健康建议
      const adviceMap = {
        respiratory_system: '保持室内空气流通，避免长时间处于空气污染环境，适当进行有氧运动增强肺活量。',
        sensory_system: '保护眼睛，避免长时间使用电子设备，定期进行视力检查，保持充足睡眠。',
        urogenital_system: '多喝水，保持个人卫生，避免憋尿，定期进行泌尿系统检查。',
        urinary_system: '多喝水，少吃辛辣刺激性食物，避免长时间憋尿，保持规律作息。',
        digestive_system: '规律饮食，细嚼慢咽，避免暴饮暴食，少吃油腻辛辣食物，保持心情愉悦。',
        musculoskeletal_system: '保持正确坐姿，避免长时间保持同一姿势，适当进行力量训练，增强骨骼肌肉强度。'
      };
      
      return adviceMap[this.systemKey] || '保持健康的生活方式，定期体检，及时发现健康问题。';
    }
  }
};
</script>

<style scoped>
.system-detail-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

.dialog-content {
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: dialog-fade-in 0.3s ease;
}

.dialog-header {
  padding: 20px;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-header h2 {
  margin: 0;
  font-size: 22px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.system-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.system-icon {
  width: 50px;
  height: 50px;
  background-color: #e1f5fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #4facfe;
}

.system-status {
  font-size: 16px;
  padding: 5px 15px;
  border-radius: 20px;
}

.status-good {
  background-color: #e8f5e9;
  color: #4caf50;
}

.status-warning {
  background-color: #fff8e1;
  color: #ff9800;
}

.status-danger {
  background-color: #ffebee;
  color: #f44336;
}

h3 {
  font-size: 18px;
  color: #333;
  margin: 20px 0 15px;
}

.reference-range, .project-list, .system-chart, .system-advice {
  margin-bottom: 25px;
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

.chart-placeholder {
  height: 200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

.chart-line {
  height: 80%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.chart-point {
  width: 20px;
  background-color: #4facfe;
  border-radius: 3px 3px 0 0;
  position: relative;
}

.chart-labels {
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 12px;
}

.system-advice p {
  line-height: 1.6;
  color: #666;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #4facfe;
}

.dialog-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.primary-btn {
  background-color: #4facfe;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #3a9efd;
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .project-items {
    grid-template-columns: 1fr;
  }
  
  .range-items {
    flex-direction: column;
    gap: 10px;
  }
  
  .range-item {
    width: 100%;
  }
}
</style>
