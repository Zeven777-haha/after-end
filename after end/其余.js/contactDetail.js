const db = wx.cloud.database();

Page({
  data: {
    contact: {}
  },

  onLoad(options) {
    const id = options.id;
    if (id) {
      this.getContactDetail(id);
    } else {
      wx.showToast({ title: '加载联系人失败', icon: 'none' });
    }
  },

  // 获取联系人详情
  getContactDetail(id) {
    db.collection('contacts').doc(id).get({
      success: res => {
        this.setData({ contact: res.data });
      },
      fail: err => {
        wx.showToast({ title: '加载失败', icon: 'none' });
      }
    });
  },

  // 修改头像
  changeAvatar() {
    const { contact } = this.data;

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const filePath = res.tempFilePaths[0];
        db.collection('contacts').doc(contact._id).update({
          data: { avatarUrl: filePath },
          success: () => {
            wx.showToast({ title: '头像更新成功', icon: 'success' });
            this.setData({ 'contact.avatarUrl': filePath });
          },
          fail: err => {
            wx.showToast({ title: '头像更新失败', icon: 'none' });
          }
        });
      }
    });
  },

  // 输入框事件处理
  onLastNameInput(e) {
    this.setData({ 'contact.lastName': e.detail.value });
  },

  onFirstNameInput(e) {
    this.setData({ 'contact.firstName': e.detail.value });
  },

  onCompanyInput(e) {
    this.setData({ 'contact.company': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'contact.phone': e.detail.value });
  },

  onEmailInput(e) {
    this.setData({ 'contact.email': e.detail.value });
  },

  // 保存更改
  saveChanges() {
    const { contact } = this.data;
    db.collection('contacts').doc(contact._id).update({
      data: {
        lastName: contact.lastName,
        firstName: contact.firstName,
        company: contact.company,
        phone: contact.phone,
        email: contact.email
      },
      success: () => {
        wx.showToast({ title: '更新成功', icon: 'success' });
        wx.navigateBack();
      },
      fail: () => {
        wx.showToast({ title: '更新失败', icon: 'none' });
      }
    });
  },

  // 删除联系人
  deleteContact() {
    const { contact } = this.data;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该联系人吗？',
      success: (res) => {
        if (res.confirm) {
          db.collection('contacts').doc(contact._id).remove({
            success: res => {
              wx.showToast({ title: '删除成功', icon: 'success' });
              wx.navigateBack();
            },
            fail: err => {
              wx.showToast({ title: '删除失败', icon: 'none' });
            }
          });
        }
      }
    });
  }
});
