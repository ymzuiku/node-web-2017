var userItems = function (type) {
  let data = []
  //只有组织
  if (type === 'com') {
    data = [
      {
        label: '个人信息',
        icon: ['./icon/user-normal.png', './icon/user-normal-l.png'],
        to: '/user/userinfo/'
      },
      {
        label: '服务',
        icon: ['./icon/user-serve.png', './icon/user-serve-l.png'],
        to: '/user/serve/'
      },
      { label: 1, },
      {
        label: '组织用户信息',
        icon: ['./icon/enterprise.png', './icon/enterprise-l.png'],
        to: '/user/com/'
      },
      {
        label: '项目管理',
        icon: ['./icon/user-project.png', './icon/user-project-l.png'],
        to: '/user/project/'
      },
      {
        label: '筛查人群报告',
        icon: ['./icon/yangdata.png','./icon/yangdata-l.png'],
        to: '/user/reports/'
      },
      {
        label: '统计',
        icon: ['./icon/user-data.png','./icon/user-data-l.png'],
        to: '/user/census/'
      },
      { label: 1,  },
      {
        label: '升级为专业用户',
        icon: ['./icon/user-doctor.png', './icon/user-doctor-l.png'],
        to: '/user/doctor/'
      },
      { label: 1, },
      {
        label: '登出',
        icon: ['./icon/logout.png', './icon/logout-l.png'],
        to: '/user/logout/'
      },
      { label: 1, },
    ]
  }
  // 只有医生
  else if (type === 'doctor') {
    data = [
      {
        label: '个人信息',
        icon: ['./icon/user-normal.png','./icon/user-normal-l.png'],
        to: '/user/userinfo/'
      },
      {
        label: '服务',
        icon: ['./icon/user-serve.png', './icon/user-serve-l.png'],
        to: '/user/serve/'
      },
      { label: 1, },
      {
        label: '项目管理',
        icon: ['./icon/user-project.png', './icon/user-project-l.png'],
        to: '/user/project/'
      },
      { label: 1, },
      {
        label: '升级为组织用户',
        icon: ['./icon/enterprise.png','./icon/enterprise-l.png'],
        to: '/user/com/'
      },
      { label: 1, },
      {
        label: '专业用户信息',
        icon: ['./icon/user-doctor.png','./icon/user-doctor-l.png'],
        to: '/user/doctor/'
      },
      {
        label: '上传阳性数据',
        icon: ['./icon/yangdata.png', './icon/yangdata-l.png'],
        to: '/user/upcase/'
      },
      { label: 1, },
      {
        label: '登出',
        icon: ['./icon/logout.png', './icon/logout-l.png'],
        to: '/user/logout/'
      },
      { label: 1, },
    ]
  }
  // 所有都开通  
  else if (type === 'all') {
    data = [
      {
        label: '个人信息',
        icon: ['./icon/user-normal.png', './icon/user-normal-l.png'],
        to: '/user/userinfo/'
      },
      {
        label: '服务',
        icon: ['./icon/user-serve.png', './icon/user-serve-l.png'],
        to: '/user/serve/'
      },
      { label: 1, },
      {
        label: '组织用户信息',
        icon: ['./icon/enterprise.png', './icon/enterprise-l.png'],
        to: '/user/com/'
      },
      {
        label: '项目管理',
        icon: ['./icon/user-project.png', './icon/user-project-l.png'],
        to: '/user/project/'
      },
      {
        label: '筛查人群报告',
        icon: ['./icon/yangdata.png','./icon/yangdata-l.png'],
        to: '/user/reports/'
      },
      {
        label: '统计',
        icon: ['./icon/user-data.png','./icon/user-data-l.png'],
        to: '/user/census/'
      },
      { label: 1, },
      {
        label: '专业用户信息',
        icon: ['./icon/user-doctor.png', './icon/user-doctor-l.png'],
        to: '/user/doctor/'
      },
      {
        label: '上传阳性数据',
        icon: ['./icon/yangdata.png',  './icon/yangdata-l.png'],
        to: '/user/upcase/'
      },
      { label: 1, },
      {
        label: '登出',
        icon: ['./icon/logout.png', './icon/logout-l.png'],
        to: '/user/logout/'
      },
      { label: 1, },
    ]
  }
  // 默认 default  
  else {
    data = [
      {
        label: '个人信息',
        icon: ['./icon/user-normal.png', './icon/user-normal-l.png'],
        to: '/user/userinfo/'
      },
      {
        label: '服务',
        icon: ['./icon/user-serve.png','./icon/user-serve-l.png'],
        to: '/user/serve/'
      },
      { label: 1, },
      {
        label: '升级为组织用户',
        icon: ['./icon/enterprise.png', './icon/enterprise-l.png'],
        to: '/user/com/'
      },
      { label: 1, },
      {
        label: '升级为专业用户',
        icon: ['./icon/user-doctor.png', './icon/user-doctor-l.png'],
        to: '/user/doctor/'
      },
      { label: 1, },
      {
        label: '登出',
        icon: ['./icon/logout.png', './icon/logout-l.png'],
        to: '/user/logout/'
      },
      { label: 1, },
    ]
  }
  return data
}
module.exports = userItems
