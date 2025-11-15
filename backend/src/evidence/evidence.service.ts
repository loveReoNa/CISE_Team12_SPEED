import { Injectable } from '@nestjs/common';

// 内存存储作为备用方案
interface MemoryEvidence {
  _id: string;
  title: string;
  author: string;
  abstract: string;
  publicationYear: number;
  keywords: string[];
  uploadedBy: string;
  createdAt: Date;
}

const memoryEvidence: MemoryEvidence[] = [];

@Injectable()
export class EvidenceService {
  private useMemoryStorage = true;

  constructor() {
    console.log('使用内存存储进行证据管理');
  }

  async createEvidence(evidenceData: {
    title: string;
    author: string;
    abstract: string;
    publicationYear: number;
    keywords: string[];
    uploadedBy: string;
  }): Promise<any> {
    // 使用内存存储
    const evidence = {
      _id: Date.now().toString(),
      ...evidenceData,
      createdAt: new Date()
    };
    memoryEvidence.push(evidence);
    return evidence;
  }

  async findAll(): Promise<any[]> {
    return memoryEvidence;
  }

  async findById(id: string): Promise<any | null> {
    return memoryEvidence.find(item => item._id === id) || null;
  }

  async searchEvidence(query?: string, year?: string, topic?: string): Promise<any[]> {
    let filteredEvidence = memoryEvidence;

    if (query) {
      const searchTerm = query.toLowerCase();
      filteredEvidence = filteredEvidence.filter(evidence =>
        evidence.title.toLowerCase().includes(searchTerm) ||
        evidence.abstract.toLowerCase().includes(searchTerm) ||
        evidence.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    }

    if (year) {
      const yearNum = parseInt(year);
      filteredEvidence = filteredEvidence.filter(evidence =>
        evidence.publicationYear === yearNum
      );
    }

    if (topic) {
      const topicLower = topic.toLowerCase();
      filteredEvidence = filteredEvidence.filter(evidence =>
        evidence.keywords.some(keyword =>
          keyword.toLowerCase().includes(topicLower)
        )
      );
    }

    return filteredEvidence;
  }
}