import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Evidence } from './schemas/evidence.schema';

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
  private useMemoryStorage = false;

  constructor(
    @InjectModel(Evidence.name) private evidenceModel: Model<Evidence>,
  ) {
    // 检查MongoDB连接，如果失败则使用内存存储
    this.checkMongoConnection();
  }

  private async checkMongoConnection() {
    try {
      await this.evidenceModel.findOne();
      console.log('MongoDB证据连接成功');
    } catch (error) {
      console.log('MongoDB证据连接失败，使用内存存储');
      this.useMemoryStorage = true;
    }
  }

  async createEvidence(evidenceData: {
    title: string;
    author: string;
    abstract: string;
    publicationYear: number;
    keywords: string[];
    uploadedBy: Types.ObjectId;
  }): Promise<any> {
    // 使用内存存储
    if (this.useMemoryStorage) {
      const evidence = {
        _id: Date.now().toString(),
        ...evidenceData,
        uploadedBy: evidenceData.uploadedBy.toString(),
        createdAt: new Date()
      };
      memoryEvidence.push(evidence);
      return evidence;
    }

    // 使用MongoDB
    try {
      const evidence = new this.evidenceModel(evidenceData);
      return evidence.save();
    } catch (error) {
      this.useMemoryStorage = true;
      return this.createEvidence(evidenceData);
    }
  }

  async findAll(): Promise<any[]> {
    if (this.useMemoryStorage) {
      return memoryEvidence;
    }

    try {
      return this.evidenceModel.find().populate('uploadedBy', 'username').exec();
    } catch (error) {
      this.useMemoryStorage = true;
      return this.findAll();
    }
  }

  async findById(id: string): Promise<any | null> {
    if (this.useMemoryStorage) {
      return memoryEvidence.find(item => item._id === id) || null;
    }

    try {
      return this.evidenceModel.findById(id).populate('uploadedBy', 'username').exec();
    } catch (error) {
      this.useMemoryStorage = true;
      return this.findById(id);
    }
  }

  async searchEvidence(query?: string, year?: string, topic?: string): Promise<any[]> {
    if (this.useMemoryStorage) {
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

    try {
      let filter: any = {};

      if (query) {
        filter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { abstract: { $regex: query, $options: 'i' } },
          { keywords: { $in: [new RegExp(query, 'i')] } },
        ];
      }

      if (year) {
        filter.publicationYear = parseInt(year);
      }

      if (topic) {
        filter.keywords = { $in: [new RegExp(topic, 'i')] };
      }

      return this.evidenceModel.find(filter).populate('uploadedBy', 'username').exec();
    } catch (error) {
      this.useMemoryStorage = true;
      return this.searchEvidence(query, year, topic);
    }
  }
}