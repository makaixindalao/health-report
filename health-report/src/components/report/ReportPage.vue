<template>
  <div class="report-page">
    <div class="report-container">
      <!-- 简化版的报告页面 -->
      <div class="report-header">
        <h1>健康体检报告</h1>
        <div class="user-info">
          <div class="info-item">
            <span class="label">姓名：</span>
            <span class="value">{{ reportData.name || '加载中...' }}</span>
          </div>
          <div class="info-item">
            <span class="label">性别：</span>
            <span class="value">{{ reportData.sex || '加载中...' }}</span>
          </div>
          <div class="info-item">
            <span class="label">年龄：</span>
            <span class="value">{{ reportData.age || '加载中...' }}岁</span>
          </div>
          <div class="info-item">
            <span class="label">检测时间：</span>
            <span class="value">{{ reportData.time || '加载中...' }}</span>
          </div>
        </div>
      </div>

      <!-- 系统健康概览 -->
      <div class="health-overview">
        <h2>系统健康概览</h2>
        <div class="systems-grid">
          <div
            v-for="(system, key) in systemsData"
            :key="key"
            class="system-card"
            :class="getSystemClass(key)"
            @click="showSystemDetail(key)"
          >
            <div class="system-icon">{{ system.icon }}</div>
            <div class="system-name">{{ system.name }}</div>
            <div class="system-status">{{ getSystemStatus(key) }}</div>
          </div>
        </div>
      </div>

      <!-- 健康建议 -->
      <div class="health-advice">
        <h2>健康建议</h2>
        <div class="advice-content">
          <p>根据您的体检结果，我们为您提供以下健康建议：</p>
          <div class="advice-list">
            <div class="advice-item">
              <h3>饮食建议</h3>
              <p>保持均衡饮食，多摄入新鲜蔬果，减少高脂高糖食物摄入。</p>
            </div>
            <div class="advice-item">
              <h3>运动建议</h3>
              <p>每周进行3-5次中等强度的有氧运动，每次30-60分钟。</p>
            </div>
            <div class="advice-item">
              <h3>生活习惯</h3>
              <p>保持充足睡眠，避免熬夜，减少压力，保持良好心态。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 食物和矿物质建议 -->
      <div class="food-mineral-advice" v-if="reportData.foods && reportData.mineral">
        <div class="food-advice">
          <h2>推荐食物</h2>
          <div class="food-grid">
            <div
              v-for="(item, index) in reportData.foods.filter_project"
              :key="index"
              class="food-item"
            >
              <div class="food-icon">食</div>
              <div class="food-name">{{ item.name }}</div>
              <div class="food-match">匹配度: {{ item.d_value }}</div>
            </div>
          </div>
        </div>

        <div class="mineral-advice">
          <h2>推荐矿物质</h2>
          <div class="mineral-grid">
            <div
              v-for="(item, index) in reportData.mineral.filter_project"
              :key="index"
              class="mineral-item"
            >
              <div class="mineral-icon">矿</div>
              <div class="mineral-name">{{ item.name }}</div>
              <div class="mineral-match">匹配度: {{ item.d_value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 报告页脚 -->
      <div class="report-footer">
        <p>本报告仅供参考，具体健康问题请咨询专业医生</p>
        <p>报告生成时间: {{ new Date().toLocaleString() }}</p>
      </div>
    </div>

    <!-- 系统详情对话框 -->
    <SystemDetailDialog
      :visible="dialogVisible"
      :system="selectedSystem"
      :title="selectedSystemTitle"
      :systemKey="selectedSystemKey"
      :icon="selectedSystemIcon"
      :status="selectedSystemStatus"
      @close="closeSystemDetail"
    />
  </div>
</template>

<script>
import SystemDetailDialog from './SystemDetailDialog.vue';

export default {
  name: 'ReportPage',
  components: {
    SystemDetailDialog
  },
  data() {
    return {
      reportData: {},
      systemsData: {
        respiratory_system: { name: '呼吸系统', icon: '呼' },
        sensory_system: { name: '感觉系统', icon: '感' },
        urogenital_system: { name: '泌尿生殖系统', icon: '泌' },
        urinary_system: { name: '泌尿系统', icon: '尿' },
        digestive_system: { name: '消化系统', icon: '消' },
        musculoskeletal_system: { name: '肌肉骨骼系统', icon: '骨' }
      },
      // 对话框相关数据
      dialogVisible: false,
      selectedSystem: null,
      selectedSystemKey: '',
      selectedSystemTitle: '',
      selectedSystemIcon: '',
      selectedSystemStatus: ''
    };
  },
  mounted() {
    console.log('ReportPage mounted');
    this.fetchReportData();
  },
  methods: {
    fetchReportData() {
      console.log('Fetching report data...');
      // 获取报告数据
      fetch('/report-data.json')
        .then(response => {
          console.log('Response received:', response);
          return response.json();
        })
        .then(data => {
          console.log('Data parsed:', data);
          this.reportData = data;
        })
        .catch(error => {
          console.error('Error loading report data:', error);
        });
    },
    getSystemStatus(key) {
      // 简单实现，根据系统返回状态
      const statusMap = {
        respiratory_system: '良好',
        sensory_system: '注意',
        urogenital_system: '良好',
        urinary_system: '注意',
        digestive_system: '良好',
        musculoskeletal_system: '注意'
      };
      return statusMap[key] || '未知';
    },
    getSystemClass(key) {
      // 根据系统状态返回样式类
      const statusMap = {
        respiratory_system: 'status-good',
        sensory_system: 'status-warning',
        urogenital_system: 'status-good',
        urinary_system: 'status-warning',
        digestive_system: 'status-good',
        musculoskeletal_system: 'status-warning'
      };
      return statusMap[key] || '';
    },
    showSystemDetail(key) {
      // 获取系统数据
      let system = null;

      if (key === 'respiratory_system' || key === 'sensory_system') {
        // 这些系统在Physiological_system下
        system = this.reportData.Physiological_system && this.reportData.Physiological_system[key];
      } else {
        // 其他系统是顶级键
        system = this.reportData[key];
      }

      if (!system) {
        console.error(`System data not found for key: ${key}`);
        return;
      }

      // 设置对话框数据
      this.selectedSystem = system;
      this.selectedSystemKey = key;
      this.selectedSystemTitle = this.systemsData[key].name;
      this.selectedSystemIcon = this.systemsData[key].icon;
      this.selectedSystemStatus = this.getSystemStatus(key);

      // 显示对话框
      this.dialogVisible = true;
    },
    closeSystemDetail() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.report-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.report-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.report-header {
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.report-header h1 {
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: bold;
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
}

.info-item {
  margin: 5px 10px;
}

.label {
  font-weight: 500;
  margin-right: 5px;
}

.value {
  font-weight: bold;
}

.health-overview, .health-advice {
  padding: 30px;
  border-bottom: 1px solid #eee;
}

h2 {
  font-size: 22px;
  color: #333;
  margin: 0 0 20px 0;
  position: relative;
  padding-left: 15px;
}

h2:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background-color: #4facfe;
  border-radius: 3px;
}

.systems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.system-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.system-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.system-icon {
  width: 50px;
  height: 50px;
  background-color: #e1f5fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 20px;
  font-weight: bold;
  color: #4facfe;
}

.system-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.system-status {
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 10px;
  display: inline-block;
}

.status-good .system-status {
  background-color: #e8f5e9;
  color: #4caf50;
}

.status-warning .system-status {
  background-color: #fff8e1;
  color: #ff9800;
}

.advice-content {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
}

.advice-content > p {
  margin-bottom: 20px;
  color: #666;
}

.advice-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.advice-item {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.advice-item h3 {
  font-size: 18px;
  color: #4facfe;
  margin: 0 0 10px 0;
}

.advice-item p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* 食物和矿物质建议样式 */
.food-mineral-advice {
  padding: 30px;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.food-grid, .mineral-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.food-item, .mineral-item {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.food-item:hover, .mineral-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.food-icon, .mineral-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 16px;
  font-weight: bold;
}

.food-icon {
  background-color: #e8f5e9;
  color: #4caf50;
}

.mineral-icon {
  background-color: #e3f2fd;
  color: #2196f3;
}

.food-name, .mineral-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.food-match, .mineral-match {
  font-size: 14px;
  color: #666;
}

/* 报告页脚样式 */
.report-footer {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
  background-color: #f9f9f9;
  border-radius: 0 0 15px 15px;
}

.report-footer p {
  margin: 5px 0;
}

/* 自定义滚动条 */
.report-page::-webkit-scrollbar {
  width: 6px;
}

.report-page::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.report-page::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.report-page::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .report-page {
    padding: 10px;
  }

  .report-header {
    padding: 20px;
  }

  .health-overview, .health-advice, .food-mineral-advice {
    padding: 20px;
  }

  .systems-grid, .food-grid, .mineral-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .advice-list {
    grid-template-columns: 1fr;
  }

  .food-mineral-advice {
    grid-template-columns: 1fr;
  }
}
</style>
