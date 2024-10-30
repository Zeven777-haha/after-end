const db = wx.cloud.database();

Page({
  data: {
    avatarUrl: '', // 头像路径
    lastName: '',
    firstName: '',
    company: '',
    phone: '',
    email: ''
  },

  // 选择头像
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const filePath = res.tempFilePaths[0];
        this.setData({ avatarUrl: filePath });
      }
    });
  },

  // 输入框事件
  onLastNameInput(e) {
    this.setData({ lastName: e.detail.value });
  },

  onFirstNameInput(e) {
    this.setData({ firstName: e.detail.value });
  },

  onCompanyInput(e) {
    this.setData({ company: e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onEmailInput(e) {
    this.setData({ email: e.detail.value });
  },

  // 保存联系人并清空数据
  saveContact() {
    const { avatarUrl, lastName, firstName, company, phone, email } = this.data;

    db.collection('contacts').add({
      data: {
        avatarUrl,
        lastName,
        firstName,
        company,
        phone,
        email
      },
      success: res => {
        wx.showToast({ title: '保存成功', icon: 'success' });
        this.clearForm(); // 清空表单
        wx.navigateBack(); // 返回通讯录页面
      },
      fail: err => {
        wx.showToast({ title: '保存失败', icon: 'none' });
      }
    });
  },

  // 清空表单数据
  clearForm() {
    this.setData({
      avatarUrl: '',
      lastName: '',
      firstName: '',
      company: '',
      phone: '',
      email: ''
    });
  }
});
