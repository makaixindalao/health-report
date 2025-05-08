<template>
  <div class="health-suggestion">
    <div class="suggestion-header">
      <h2>健康建议</h2>
      <p class="subtitle">根据您的体检结果，我们为您提供以下健康建议</p>
    </div>

    <div class="suggestion-section">
      <h3>
        <span class="section-icon food-icon">食</span>
        推荐食物
      </h3>
      <div class="food-list">
        <div
          v-for="(item, index) in reportData.foods.filter_project"
          :key="index"
          class="food-item"
        >
          <div class="food-name">{{ item.name }}</div>
          <div class="food-value">匹配度: {{ item.d_value }}</div>
        </div>
      </div>
    </div>

    <div class="suggestion-section">
      <h3>
        <span class="section-icon mineral-icon">矿</span>
        推荐矿物质
      </h3>
      <div class="mineral-list">
        <div
          v-for="(item, index) in reportData.mineral.filter_project"
          :key="index"
          class="mineral-item"
        >
          <div class="mineral-name">{{ item.name }}</div>
          <div class="mineral-value">匹配度: {{ item.d_value }}</div>
        </div>
      </div>
    </div>

    <div class="suggestion-section">
      <h3>
        <span class="section-icon advice-icon">建</span>
        生活方式建议
      </h3>
      <div class="advice-list">
        <div class="advice-item">
          <div class="advice-title">饮食建议</div>
          <div class="advice-content">
            根据您的体检结果，建议您多摄入上述推荐的食物，保持均衡饮食，少食多餐，避免暴饮暴食。
          </div>
        </div>
        <div class="advice-item">
          <div class="advice-title">运动建议</div>
          <div class="advice-content">
            建议您每周进行3-5次中等强度的有氧运动，每次30-60分钟，如快走、慢跑、游泳等。
          </div>
        </div>
        <div class="advice-item">
          <div class="advice-title">休息建议</div>
          <div class="advice-content">
            保持充足的睡眠，每晚7-8小时，保持规律的作息时间，避免熬夜。
          </div>
        </div>
      </div>
    </div>

    <div class="suggestion-footer">
      <p>以上建议仅供参考，具体健康方案请咨询专业医生</p>
      <div class="contact-info">
        <p>如有疑问，请联系我们：</p>
        <p>电话：400-123-4567</p>
        <p>邮箱：health@example.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthSuggestion',
  props: {
    reportData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.health-suggestion {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.suggestion-header {
  text-align: center;
  margin-bottom: 30px;
}

.suggestion-header h2 {
  font-size: 24px;
  color: #333;
  margin: 0 0 10px 0;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.suggestion-section {
  margin-bottom: 30px;
}

.suggestion-section h3 {
  font-size: 18px;
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.section-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.food-icon {
  background-color: #e1f3d8;
}

.mineral-icon {
  background-color: #d8e5f3;
}

.advice-icon {
  background-color: #f3e8d8;
}

.food-list, .mineral-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.food-item, .mineral-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.food-name, .mineral-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
}

.food-value, .mineral-value {
  font-size: 14px;
  color: #666;
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.advice-item {
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.advice-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
}

.advice-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.suggestion-footer {
  margin-top: 30px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.contact-info {
  margin-top: 20px;
}

.contact-info p {
  margin: 5px 0;
}
</style>
