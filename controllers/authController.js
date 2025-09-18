const User = require('../models/user');

// hiển thị form đăng ký
exports.getRegister = (req, res) => {
  res.render('auth/register');
};

// xử lý đăng ký
exports.postRegister = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Tên đăng nhập đã tồn tại!');
    }
    const newUser = new User({ username, email, phone, password });
    await newUser.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi đăng ký');
  }
};

// hiển thị form đăng nhập
exports.getLogin = (req, res) => {
  res.render('auth/login');
};

// xử lý đăng nhập
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.send('Người dùng không tồn tại!');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.send('Sai mật khẩu!');
    }
    req.session.user = user; // lưu user vào session
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi đăng nhập');
  }
};

// đăng xuất
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

// quên mật khẩu (demo: chỉ báo ra email, không gửi mail thật)
exports.getForgot = (req, res) => {
  res.render('auth/forgot');
};

exports.postForgot = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send('Email không tồn tại!');
  }
  // ở đây bạn có thể thêm gửi mail reset password
  res.send(`Link đặt lại mật khẩu đã gửi tới email: ${email} (demo)`);
};
