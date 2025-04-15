from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求


@app.route('/ws')
def fake_ws():
    return '', 204  # No content, 让 Vue 安静


@app.route('/api/get-data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from GET endpoint!"})


@app.route('/api/post-data', methods=['POST'])
def post_data():
    data = request.get_json()
    name = data.get("name", "unknown")
    return jsonify({"message": f"Hello, {name}! This is from POST endpoint."})


@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print("接收到表单数据：", data)

    # 模拟处理逻辑
    response = {
        "status": "success",
        "received": data,
        "message": "表单提交成功！"
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
