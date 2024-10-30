const db = wx.cloud.database();

Page({
  data: {
    contacts: [],
  },

  onShow() {
    this.getContactsFromDB();
  },

  getContactsFromDB() {
    db.collection('contacts').get({
      success: res => {
        const contacts = res.data.map(contact => ({
          ...contact,
          fullName: `${contact.lastName}${contact.firstName}`
        }));
        this.setData({ contacts: contacts });
      }
    });
  },

  goToContactDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (id) {
      wx.navigateTo({
        url: `/pages/contactDetail/contactDetail?id=${id}`
      });
    } else {
      wx.showToast({ title: '无法找到联系人详情', icon: 'none' });
    }
  }
});



