// File: api/control.js
const { ComfortCloudClient } = require("panasonic-comfort-cloud-client");

export default async function handler(req, res) {
  // Lấy lệnh từ URL (Ví dụ: ?action=on hoặc ?action=off)
  const action = req.query.action;
  
  // Lấy tài khoản từ biến môi trường bảo mật của Vercel
  const username = process.env.PCC_EMAIL;
  const password = process.env.PCC_PASSWORD;

  if (!username || !password) {
    return res.status(500).json({ error: "Chưa cấu hình Email/Password" });
  }

  try {
    const client = new ComfortCloudClient();
    
    // 1. Máy chủ tự động xử lý đăng nhập OAuth2
    await client.login(username, password);
    
    // 2. Lấy thông tin điều hòa
    const groups = await client.getGroups();
    const deviceId = groups[0].deviceList[0].deviceGuid;
    
    // 3. Xử lý lệnh Bật/Tắt
    if (action === 'on') {
      await client.setDevicePower(deviceId, true);
    } else if (action === 'off') {
      await client.setDevicePower(deviceId, false);
    } else {
      return res.status(400).json({ error: "Lệnh không hợp lệ. Chỉ nhận 'on' hoặc 'off'" });
    }

    return res.status(200).json({ success: true, message: `Đã gửi lệnh: ${action}` });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
