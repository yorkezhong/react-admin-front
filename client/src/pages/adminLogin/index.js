import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, KeyOutlined, MessageOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import CanvasBack from "../../component/CanvasBack/index.js";
import LogoImg from "../logo.png";
import "./index.less";

const AdminLoginIndex = (props) => {
  const [form] = Form.useForm();
  const [codeCaptcha, setcodeCaptcha] = useState("");
  const [username, setusername] = useState("");
  const [userpwd, setuserpwd] = useState("");
  const [capthaUrl, setcapthaUrl] = useState("http://139.199.5.204:18080/code");
  function getCaptcha() {
    setcapthaUrl("http://139.199.5.204:18080/code?d" + Math.random());
  }
  async function onFinish(value) {
    let { code, username, userpwd } = value;
    let params = { code, username, userpwd };
    let registerRes = await window.$post("login", params);
    if (registerRes.code == 0) {
      localStorage.setItem(
        "CURRENT_USER_NAME",
        JSON.stringify(registerRes.user)
      );
      message.success("登录成功，即将进入系统...");
      setTimeout(() => {
        props.history.push("/adminhome");
      }, 2000);
    } else {
      message.error("登录失败，请重试！");
    }
  }
  useEffect(() => {}, []);
  return (
    <div className="page-login">
      <div className="canvasBox">
        <CanvasBack row={12} col={8} />
      </div>
      <div className="loginBox show">
        <Form form={form} name="register" onFinish={onFinish}>
          <div className="title">
            <img src={LogoImg} alt="logo" />
            <span>系统-管理员登录</span>
          </div>
          <div>
            <Form.Item
              name="username"
              rules={[
                { max: 12, message: "最大长度为12位字符" },
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="username"
                value={username}
                onChange={({ target }) => {
                  setusername(target.value);
                }}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="userpwd"
              rules={[
                { required: true, message: "请输入密码" },
                { max: 18, message: "最大长度18个字符" },
              ]}
            >
              <Input
                prefix={<KeyOutlined style={{ fontSize: 13 }} />}
                size="large"
                type="password"
                id="userpwd"
                value={userpwd}
                onChange={({ target }) => {
                  setuserpwd(target.value);
                }}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="captcha"
              rules={[
                { required: true, message: "请输入验证码" },
                { max: 18, message: "最大长度18个字符" },
              ]}
            >
              <Input
                prefix={<MessageOutlined style={{ fontSize: 13 }} />}
                size="large"
                id="code"
                className="captchainput"
                value={codeCaptcha}
                onChange={({ target }) => {
                  setcodeCaptcha(target.value);
                }}
                placeholder="请输入验证码"
              />
            </Form.Item>
            <img
              src={capthaUrl}
              alt="验证码"
              className="captcha"
              onClick={() => {
                getCaptcha();
              }}
            />
            <div className="login-btn-box">
              <a
                onClick={() => {
                  props.history.push("/login");
                }}
              >
                切换普通用户登录
              </a>
              <div>
                <Button
                  className="submit-btn"
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export const AdminLogin = withRouter(AdminLoginIndex);
