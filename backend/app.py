from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
import requests
import json
import os
import sys

app = Flask(__name__)
CORS(app)  # 允许跨域请求


@app.route('/ws')
def fake_ws():
    return '', 204  # No content, 让 Vue 安静


@app.route('/api/check', methods=['GET'])
def get_data():
    time.sleep(random.randint(1, 5))
    status = random.choice(["success", "failure"])
    #status = "success"
    if status == "success":
        data = {
            "status": status,
            "downloadlink": "http://zuoye.free.fr/files/download.png",
            "message": "请求成功！"
        }
    else:
        data = {
            "status": status,
            "message": "请求失败！"
        }
    return jsonify(data)


@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    try:
        # 模拟请求外部接口
        external_response = requests.get('http://127.0.0.1:5001/api/check')
        result = external_response.json()
        if result.get('status') == 'success':
            # 模拟处理逻辑
            response = {
                "status": "success",
                "received": data,
                "downlink":"http://zuoye.free.fr/files/download.png",
                "message": "表单提交成功！"
            }
            return jsonify(response)
        else:
            return jsonify({'status': 'failure'})
    except Exception as e:
        return jsonify({'status': 'fail', 'error': str(e)})





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
