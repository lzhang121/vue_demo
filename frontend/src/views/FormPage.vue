<template>
    <div class="container">
      <TopBar />

    <div class="form-container">
      <h2 class="form-title">プロンプト入力</h2>
      <hr class="section-divider" />

      <div class="form-group">

        <label>1）シナリオのタイトルを入力してください  <InfoPopover title="タイトルはこのシナリオの識別名です。" placement="right"/></label>
        <div id="fixed-textarea">
          <FixedTextarea
            v-model="inputText"
            placeholder="シナリオ"
            :fontSize="'18px'"
            :rows="5"
            :width="'100%'"
          />
        </div>
      </div>

      <div class="form-group">
        <label>2）シナリオを入力してください  <InfoPopover title="処理内容を具体的に入力してください。" placement="right"/></label>
        <div id="fixed-textarea">
          <FixedTextarea
            v-model="inputText"
            placeholder="シナリオ"
            :fontSize="'18px'"
            :rows="5"
            :width="'100%'"
          />
        </div>
      </div>

      <div class="form-group">
        <label>3）例外処理の方式を指定してください  <InfoPopover title="ログ出力や自動再実行などの挙動を設定します。" placement="right"/></label>
        <div class="checkbox-group">
          <!-- <label><input type="checkbox" v-model="logOutput" /> ログ出力</label> -->
          <!-- <label><input type="checkbox" v-model="retryUntilSuccess" /> 成功するまで繰り返す</label> -->
          <div>
              <RetryOption @update="handleRetryUpdate" />
              <!-- <pre>{{ retrySettings }}</pre> -->
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>4）対象のマニュアルを選択してください  <InfoPopover title="対象のマニュアルを選んでください。" placement="right"/></label>
        <select v-model="manualDB" class="select">
          <option value="Fulfillment">Fulfillment</option>
          <option value="CUSTOM-Unstructured">CUSTOM-Unstructured</option>
          <option value="CUSTOM-RAG_preprocessing">CUSTOM-RAG_preprocessing</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="generate-btn" @click="handleGenerate">WSSを生成</button>
      </div>

    </div>
    </div>

  </template>

  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import TopBar from '@/components/TopBararea.vue'
  import InfoPopover from '@/components/InfoPopover.vue'
  import FixedTextarea from '@/components/FixedTextarea.vue'
  import RetryOption from '@/components/RetryOption.vue'



  const router = useRouter()

  const scenarioTitle = ref('scenario_1')
  const scenarioContent = ref('顧客登録と注文を同時にしたい。')
  const logOutput = ref(true)
  const retryUntilSuccess = ref(false)
  const manualDB = ref('Fulfillment')
  const retrySettings = ref({})

  const handleGenerate = async () => {
    const payload = {
      scenarioTitle: scenarioTitle.value,
      scenarioContent: scenarioContent.value,
      logOutput: logOutput.value,
      retryUntilSuccess: retryUntilSuccess.value,
      manualDB: manualDB.value,
    }

    try {
      const response = await fetch('http://localhost:5001/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      sessionStorage.setItem('wssResult', JSON.stringify(result))

      router.push(
        {
          name: 'LoadingPage',
          params: { result: JSON.stringify(result) },
        },
        () => {
          // 成功時の処理
          console.log('Navigation successful!')
        }
      )
    } catch (error) {
      alert('送信に失敗しました。')
      console.error(error)
    }
  }
  function handleRetryUpdate(data) {
    retrySettings.value = data
  }

  </script>

  <style scoped>
  .form-container {
  /* font-family: "Segoe UI", sans-serif;
  max-width: 700px;
  margin: 0 auto; */
  padding: 10px 40px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 30px;
}

.form-group label {
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
}

.textarea {
  width: 100%;
  background-color: #e9e6f0;
  border: none;
  padding: 16px;
  resize: none;
  height: 80px;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-top: 8px;
}

.select {
  width: 20%;
  height: 50px;
  padding: 10px;
  font-size: 18px;
  border-radius: 4px;
  background-color: #e9e6f0;
  border: none;
}

.form-actions {
  width: 60%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.generate-btn {
  margin-top: 30px;
  padding: 10px 24px;
  background-color: white;
  color: #0051c7;
  border: 1px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.generate-btn:hover {
  background-color: #f2f2f2;
}

.info-icon {
  font-style: normal; /* 不倾斜 */
  cursor: pointer;
  margin-left: 6px;
  color: #666;
  user-select: none;
}
.info-icon:hover {
  color: #000;
}

.fixed-textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}


@media (max-width: 600px) {
  .container {
    background-color: lightgreen;
  }
}

  </style>
