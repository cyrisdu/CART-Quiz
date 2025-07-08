// CAR-T知识问答系统 - 完整题库数据
// 包含100道精选题目，涵盖CAR-T治疗的各个方面

const COMPLETE_QUESTION_BANK = [
    // CAR-T细胞基础知识
    {
        category: "CAR-T细胞是什么",
        type: "判断题",
        title: "什么是CAR-T细胞",
        description: "CAR-T细胞是经过基因工程改造以表达靶向特定抗原的嵌合受体T细胞。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞是什么",
        type: "判断题",
        title: "冻存的CAR-T细胞能否再用",
        description: "冻存的CAR-T细胞可以再用。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T细胞的全称",
        description: "CAR-T细胞的全称是什么？",
        options: ["自然杀伤T细胞", "嵌合抗原受体T细胞", "辅助T细胞"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T细胞是谁发明的",
        description: "CAR-T细胞是谁发明的？",
        options: ["Eshhar Z", "Edward Jenner", "Elon Musk"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T技术目前发展到第几代",
        description: "CAR-T技术目前发展到第几代？",
        options: ["3", "4", "5"],
        correctAnswer: 3
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "中国CAR-T细胞疗法全球排名",
        description: "截至2024年，中国的CAR-T细胞疗法在全球市场的占比排名为？",
        options: ["1", "2", "3"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T细胞杀死肿瘤的方式",
        description: "以下哪种不是CAR-T细胞杀死肿瘤的方式？",
        options: ["特异性识别并结合肿瘤细胞", "分泌穿孔素、颗粒酶等杀伤性物质", "通过紫外线杀伤肿瘤细胞"],
        correctAnswer: 3
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T细胞治疗相比化学治疗的优势",
        description: "CAR-T细胞治疗相比化学治疗的优势不包括？",
        options: ["靶向性高", "价格便宜", "微小残留病灶清除彻底"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "CAR-T细胞治疗流程的第一步",
        description: "CAR-T细胞治疗流程的第一步是？",
        options: ["预处理化疗", "淋巴细胞采集", "CAR-T细胞制备"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞是什么",
        type: "选择题",
        title: "自体淋巴细胞制备CAR-T细胞要求细胞数量",
        description: "采集自体淋巴细胞制备CAR-T细胞要求患者的淋巴细胞数最佳不低于多少？",
        options: ["5x10⁴/L", "5x10⁶/L", "5x10⁸/L"],
        correctAnswer: 3
    },
    
    // CAR-T细胞可以治疗哪些疾病
    {
        category: "CAR-T细胞可以治疗哪些疾病",
        type: "判断题",
        title: "CAR-T细胞治疗初发血液系统恶性肿瘤",
        description: "CAR-T细胞可以治疗初发血液系统恶性肿瘤患者。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞可以治疗哪些疾病",
        type: "判断题",
        title: "CAR-T细胞治疗风湿免疫系统疾病",
        description: "CAR-T细胞可以治疗风湿免疫系统疾病。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞可以治疗哪些疾病",
        type: "判断题",
        title: "艾滋病患者接受CAR-T细胞治疗",
        description: "艾滋病患者可以接受CAR-T细胞治疗吗？",
        options: ["可以，病毒载量要控制到要求范围", "不能"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞可以治疗哪些疾病",
        type: "选择题",
        title: "治疗复发急性B淋巴细胞白血病完全缓解率",
        description: "CAR-T细胞治疗难治/复发急性B淋巴细胞白血病的完全缓解率是多少？",
        options: ["10%-20%", "40%-50%", "80%-90%"],
        correctAnswer: 3
    },
    {
        category: "CAR-T细胞可以治疗哪些疾病",
        type: "选择题",
        title: "能否治疗实体肿瘤",
        description: "对于肺癌、乳腺癌、肝癌、胃癌等实体肿瘤，CAR-T细胞可以治疗的有？",
        options: ["肺癌、乳腺癌、肝癌", "胶质母细胞瘤、黑色素瘤、前列腺癌", "以上全部"],
        correctAnswer: 3
    },
    
    // 急性淋巴细胞白血病篇
    {
        category: "急性淋巴细胞白血病篇（ALL)",
        type: "判断题",
        title: "急性淋巴细胞白血病中枢累及的患者能否接受治疗",
        description: "急性淋巴细胞白血病（ALL）中枢累及的患者不能接受CAR-T细胞治疗。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "急性淋巴细胞白血病篇（ALL)",
        type: "选择题",
        title: "哪些急性淋巴细胞白血病患者不适合CAR-T治疗",
        description: "哪些急性淋巴细胞白血病（ALL）患者不适合CAR-T细胞治疗？",
        options: ["诊断为难治/复发ALL", "伴有严重的活动性感染", "白血病细胞靶抗原为阳性"],
        correctAnswer: 2
    },
    
    // 淋巴瘤篇
    {
        category: "淋巴瘤篇",
        type: "判断题",
        title: "有中枢累及的淋巴瘤患者可以接受CAR-T细胞治疗",
        description: "有中枢累及的淋巴瘤患者可以接受CAR-T细胞治疗。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "淋巴瘤篇",
        type: "选择题",
        title: "CAR-T细胞治疗大B细胞淋巴瘤的完全缓解率",
        description: "CAR-T细胞治疗大B细胞淋巴瘤的完全缓解率是多少？",
        options: ["10%-20%", "40%-50%", "80%-90%"],
        correctAnswer: 2
    },
    
    // 多发性骨髓瘤篇
    {
        category: "多发性骨髓瘤篇（MM)",
        type: "判断题",
        title: "伴有肾功能不全的多发性骨髓瘤患者不能接受CAR-T细胞治疗",
        description: "伴有肾功能不全的多发性骨髓瘤（MM）患者不能接受CAR-T细胞治疗。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "多发性骨髓瘤篇（MM)",
        type: "选择题",
        title: "靶向多发性骨髓瘤的CAR-T细胞",
        description: "下列哪种CAR-T细胞是靶向多发性骨髓瘤（MM）的CAR-T细胞？",
        options: ["CD19 CAR-T细胞", "BCMA CAR-T细胞", "CD7 CAR-T细胞"],
        correctAnswer: 2
    },
    
    // CAR-T细胞治疗安全性
    {
        category: "CAR-T细胞治疗安全性",
        type: "判断题",
        title: "CAR-T细胞治疗不会直接影响生育能力",
        description: "CAR-T细胞治疗不会直接影响生育能力。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞治疗安全性",
        type: "判断题",
        title: "CAR-T细胞治疗后所有患者都需要使用抗生素",
        description: "CAR-T细胞治疗后所有患者都需要使用抗生素。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗安全性",
        type: "选择题",
        title: "细胞因子释放综合征（CRS）的表现",
        description: "细胞因子释放综合征（CRS）的表现是？",
        options: ["发热、寒战、乏力、肌肉和关节酸痛", "注意力减弱、语言障碍、失语、意识模糊", "眼睑和面部水肿"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞治疗安全性",
        type: "选择题",
        title: "CRS发生的核心因子",
        description: "目前认为CAR-T细胞治疗中细胞因子释放综合征（CRS）发生的核心因子是？",
        options: ["IL-3", "IL-6", "IL-10"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗安全性",
        type: "选择题",
        title: "免疫效应细胞相关神经毒性综合征（ICANS）的表现",
        description: "免疫效应细胞相关神经毒性综合征（ICANS）的表现是？",
        options: ["发热、寒战、乏力、肌肉和关节酸痛", "注意力减弱、语言障碍、失语、意识模糊", "眼睑和面部水肿"],
        correctAnswer: 2
    },
    
    // CAR-T治疗术后护理篇
    {
        category: "CAR-T治疗术后护理篇",
        type: "判断题",
        title: "CAR-T细胞治疗后可以立即进行剧烈运动",
        description: "CAR-T细胞治疗后可以立即进行快跑、登山等体育运动。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "CAR-T治疗术后护理篇",
        type: "判断题",
        title: "CAR-T细胞治疗后可以正常结婚和生育",
        description: "CAR-T细胞治疗后可以正常结婚和生育。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T治疗术后护理篇",
        type: "选择题",
        title: "CAR-T细胞治疗后恢复工作学习的时间",
        description: "CAR-T细胞治疗后若各项指标无异常，多久可以恢复工作学习状态？",
        options: ["1-2周", "1-2个月", "3-6个月"],
        correctAnswer: 3
    },
    {
        category: "CAR-T治疗术后护理篇",
        type: "选择题",
        title: "CAR-T细胞治疗后饮食注意事项",
        description: "CAR-T细胞治疗后饮食上需要注意什么？",
        options: ["注重营养均衡，避免辛辣刺激、重油重盐", "适量适度饮食，避免暴饮暴食", "以上全部"],
        correctAnswer: 3
    },
    
    // CAR-T细胞治疗基础知识
    {
        category: "CAR-T细胞治疗基础知识",
        type: "判断题",
        title: "远程多学科会诊（R-MDT）",
        description: "远程多学科会诊（R-MDT）是多医疗机构共同参与，患者能在本地获上海同济专家会诊及报告。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "判断题",
        title: "CAR-T细胞制作时长",
        description: "CAR-T细胞制作时长为4-5小时。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "判断题",
        title: "外周淋巴细胞采集时间",
        description: "外周淋巴细胞采集约2-3周。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "判断题",
        title: "CAR-T治疗后监测时间",
        description: "CAR-T治疗后至少监测14天。",
        options: ["是", "否"],
        correctAnswer: 1
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "判断题",
        title: "单采前抽血化验",
        description: "单采前无需抽血化验。",
        options: ["是", "否"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "远程多学科会诊（R-MDT）目的",
        description: "远程多学科会诊（R-MDT）目的不包括？",
        options: ["血液淋巴瘤专家评估病史和生命体征", "评估是否符合CART治疗适应症", "评估CAR-T治疗风险与收益", "直接进行CAR-T细胞治疗"],
        correctAnswer: 4
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "外周淋巴细胞采集描述",
        description: "以下外周淋巴细胞采集描述正确的是？",
        options: ["需2-3周", "是白细胞单采术，从动脉收集血液", "分离出的单个核细胞用于制作CAR-T细胞", "采集时不用管患者感受"],
        correctAnswer: 3
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "CAR-T细胞回输后生活中应避免的行为",
        description: "CAR-T细胞回输后生活中应避免？",
        options: ["适当运动", "保持充足睡眠", "大量抽烟喝酒", "保持乐观情绪"],
        correctAnswer: 3
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "CAR-T细胞放行标准中的细胞质量要求",
        description: "CAR-T细胞放行标准中，关于细胞质量的要求是？",
        options: ["活细胞率不低于70%，细胞数量随意", "活细胞率不低于80%，细胞数量根据体重达到一定量级", "活细胞率不低于60%，细胞数量越多越好", "活细胞率不低于50%，细胞数量根据身高确定"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "清淋预处理化疗药",
        description: "等待回输CAR-T细胞期间的清淋预处理，一般使用的化疗药是？",
        options: ["青霉素和头孢", "氟达拉滨和环磷酰胺", "阿司匹林和布洛芬", "紫杉醇和顺铂"],
        correctAnswer: 2
    },
    {
        category: "CAR-T细胞治疗基础知识",
        type: "选择题",
        title: "桥接治疗的正确说法",
        description: "关于桥接治疗，以下说法正确的是？",
        options: ["所有患者等待回输时都需要进行桥接治疗", "桥接治疗只有化疗这一种方式", "当病情发展快、肿瘤负荷大、症状明显时，医生可能安排桥接治疗", "桥接治疗主要是为了提高患者免疫力，与控制肿瘤无关"],
        correctAnswer: 3
    }
];

// 导出题库数据（如果在Node.js环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COMPLETE_QUESTION_BANK;
} 