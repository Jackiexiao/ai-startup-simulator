interface StartupInfo {
  companyName: string
  startupType: string
  location: string
  teamInfo: string
}

// 创业类型列表
export const startupTypes = [
  'AI教育平台',
  '智能咖啡馆',
  '无人便利店',
  '宠物医疗科技',
  '智慧农业科技',
  '元宇宙社交',
  '数字艺术平台',
  '智能家居系统',
  '健康科技服务',
  '可持续能源',
  '智能物流配送',
  '在线心理咨询',
  '数字文创平台',
  '智能养老服务',
  '新能源出行'
]

// 创业地点列表
const locations = [
  '北京朝阳区望京SOHO',
  '北京海淀区中关村',
  '上海浦东新区张江高科技园区',
  '深圳南山区科技园',
  '杭州西湖区黄龙万科中心',
  '广州天河区珠江新城',
  '成都高新区天府软件园',
  '武汉东湖新技术开发区',
  '西安高新区软件新城',
  '苏州工业园区独墅湖科教创新区'
]

// 团队背景列表
const teamBackgrounds = [
  '创始人是前谷歌工程师，联合创始人有10年产品经验',
  '创始团队来自清华计算机系，有3个AI算法专家',
  '创始人有5年咖啡连锁经验，技术合伙人是AI工程师',
  '创始人是连续创业者，核心团队来自头部互联网公司',
  '创始人是医学博士，联合创始人是资深开发工程师',
  '创始团队由3位海归组成，均有创业经验',
  '创始人是资深设计师，技术团队来自BAT',
  '创始人是行业专家，团队包含3位全栈工程师',
  '创始团队由产品、技术、运营三位合伙人组成',
  '创始人有丰富投资经验，技术团队来自知名创业公司'
]

// 公司名称模板
const companyNameTemplates = [
  '未来',
  '智慧',
  '创新',
  '数字',
  '云端',
  '智能',
  '星辰',
  '光年',
  '量子',
  '极光'
]

const companyNameSuffixes = [
  '科技',
  '智能',
  '未来',
  '创新',
  '云计算',
  '数字'
]

// 生成随机公司名称
function generateCompanyName(): string {
  const template = companyNameTemplates[Math.floor(Math.random() * companyNameTemplates.length)]
  const suffix = companyNameSuffixes[Math.floor(Math.random() * companyNameSuffixes.length)]
  return template + suffix
}

// 获取随机元素
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// 生成默认创业信息
export function generateDefaultStartup(): StartupInfo {
  return {
    companyName: generateCompanyName(),
    startupType: getRandomItem(startupTypes),
    location: getRandomItem(locations),
    teamInfo: getRandomItem(teamBackgrounds)
  }
}

// 生成多个创业类型建议
export function generateStartupSuggestions(count: number = 5): string[] {
  const suggestions: string[] = []
  const used = new Set<string>()

  while (suggestions.length < count && suggestions.length < startupTypes.length) {
    const type = getRandomItem(startupTypes)
    if (!used.has(type)) {
      suggestions.push(type)
      used.add(type)
    }
  }

  return suggestions
}
