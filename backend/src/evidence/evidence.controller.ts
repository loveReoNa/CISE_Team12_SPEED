import { Controller, Get, Param, Query } from '@nestjs/common';

// 模拟数据 - 软件工程实践相关的证据
const mockEvidence = [
  {
    id: '1',
    title: '敏捷开发对软件质量的影响研究',
    author: '张明, 李华',
    abstract: '本研究通过实证分析探讨了敏捷开发方法对软件产品质量的积极影响，包括代码质量、测试覆盖率和客户满意度等方面的提升。',
    publicationYear: 2023,
    keywords: ['敏捷开发', '软件质量', '实证研究'],
    methods: '案例研究，定量分析',
    conclusions: '敏捷开发显著提高了软件产品的质量和团队效率'
  },
  {
    id: '2',
    title: '测试驱动开发在大型项目中的应用效果',
    author: '王伟, 赵丽',
    abstract: '本文研究了测试驱动开发(TDD)在大型企业级项目中的实际应用效果，分析了其对缺陷密度和开发周期的影响。',
    publicationYear: 2022,
    keywords: ['测试驱动开发', 'TDD', '大型项目', '缺陷密度'],
    methods: '实验研究，代码分析',
    conclusions: 'TDD在大型项目中能有效降低缺陷密度，但需要更长的开发周期'
  },
  {
    id: '3',
    title: '持续集成对团队协作的影响分析',
    author: '陈强, 刘芳',
    abstract: '通过对多个软件团队的观察，分析了持续集成实践如何改善团队协作和代码集成效率。',
    publicationYear: 2024,
    keywords: ['持续集成', '团队协作', 'DevOps'],
    methods: '调查研究，访谈',
    conclusions: '持续集成显著改善了团队沟通和代码集成效率'
  },
  {
    id: '4',
    title: '代码审查对软件质量的影响研究',
    author: '杨静, 周涛',
    abstract: '探讨了代码审查实践对软件缺陷预防和质量保证的作用，基于多个开源项目的实证数据。',
    publicationYear: 2021,
    keywords: ['代码审查', '软件质量', '缺陷预防'],
    methods: '数据分析，代码仓库挖掘',
    conclusions: '代码审查能有效识别和预防潜在缺陷'
  },
  {
    id: '5',
    title: '结对编程在分布式团队中的实践',
    author: '黄伟, 孙梅',
    abstract: '研究了在分布式开发环境中实施结对编程的挑战和最佳实践。',
    publicationYear: 2023,
    keywords: ['结对编程', '分布式团队', '远程协作'],
    methods: '案例研究，问卷调查',
    conclusions: '适当的工具和流程可以支持有效的远程结对编程'
  }
];

@Controller('api/evidence')
export class EvidenceController {
  @Get()
  searchEvidence(
    @Query('query') query?: string,
    @Query('year') year?: string,
    @Query('topic') topic?: string
  ) {
    let filteredEvidence = mockEvidence;

    // 关键词搜索
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredEvidence = filteredEvidence.filter(evidence =>
        evidence.title.toLowerCase().includes(searchTerm) ||
        evidence.abstract.toLowerCase().includes(searchTerm) ||
        evidence.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    }

    // 年份过滤
    if (year) {
      filteredEvidence = filteredEvidence.filter(evidence => 
        evidence.publicationYear.toString() === year
      );
    }

    // 主题过滤
    if (topic) {
      filteredEvidence = filteredEvidence.filter(evidence =>
        evidence.keywords.some(keyword => 
          keyword.toLowerCase().includes(topic.toLowerCase())
        )
      );
    }

    return {
      data: filteredEvidence,
      total: filteredEvidence.length,
      query,
      filters: { year, topic }
    };
  }

  @Get(':id')
  getEvidenceDetail(@Param('id') id: string) {
    const evidence = mockEvidence.find(item => item.id === id);
    if (!evidence) {
      return { error: 'Evidence not found' };
    }
    return { data: evidence };
  }
}