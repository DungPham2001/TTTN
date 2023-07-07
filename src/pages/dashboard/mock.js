const mock = {
  tasks: [
    {
      id: 0,
      type: "Meeting",
      title: "Meeting with Andrew Piker",
      time: "9:00"
    },
    {
      id: 1,
      type: "Call",
      title: "Call with HT Company",
      time: "12:00"
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Zoe Alison",
      time: "14:00"
    },
    {
      id: 3,
      type: "Interview",
      title: "Interview with HR",
      time: "15:00"
    }
  ],
  bigStat: [
    {
      product: "Light Blue",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "primary",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Sing App",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: "RNS",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
  notifications: [
    {
      id: 0,
      icon: "thumbs-up",
      color: "primary",
      content:
        'Ken <span className="fw-semi-bold">accepts</span> your invitation'
    },
    {
      id: 1,
      icon: "file",
      color: "success",
      content: "Report from LT Company"
    },
    {
      id: 2,
      icon: "envelope",
      color: "danger",
      content: '4 <span className="fw-semi-bold">Private</span> Mails'
    },
    {
      id: 3,
      icon: "comment",
      color: "success",
      content: '3 <span className="fw-semi-bold">Comments</span> to your Post'
    },
    {
      id: 4,
      icon: "cog",
      color: "light",
      content: 'New <span className="fw-semi-bold">Version</span> of RNS app'
    },
    {
      id: 5,
      icon: "bell",
      color: "info",
      content:
        '15 <span className="fw-semi-bold">Notifications</span> from Social Apps'
    }
  ],
  table: [
    {
      id: 0,
      name: "",
      username: "congle@gmail.com",
      address: '',
      phone: '',
      gender: '',
      status: "vip"
    },
    {
      id: 1,
      name: "Lê Văn Công",
      username: "levancong.qc2001@gmail.com",
      address: 'Thai binh',
      phone: '',
      gender: 'nam',
      status: "vip"
    },
    {
      id: 2,
      name: "Cong Le Van 2",
      username: "admin",
      address: 'Thai Binh City',
      phone: '1233456',
      gender: 'nam',
      status: "vip"
    },
    {
      id: 3,
      name: "Smile Le",
      username: "conglv1000@gmail.com",
      address: 'saaaaaa',
      phone: '',
      gender: 'male',
      status: "vip"
    },
    {
      id: 4,
      name: "Nguyen Dinh Nguyen",
      username: "conglv1003@gmail.com",
      address: 'bac ninh',
      phone: '0978536272',
      gender: '0',
      status: "vip"
    },
    {
      id: 5,
      name: "B19DCCN131 - Phạm Văn Dũng",
      username: "2631phamvandung@gmail.com",
      address: 'Ha Noi',
      phone: '0213467985',
      gender: 'male',
      status: "vip"
    },
    {
      id: 6,
      name: "Dung Pham",
      username: "0366152797",
      address: 'Ha Noi',
      phone: '0366152797',
      gender: 'male',
      status: "vip"
    },
  ]
};

export default mock;