import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/evidence')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get()
  async searchEvidence(
    @Query('query') query?: string,
    @Query('year') year?: string,
    @Query('topic') topic?: string
  ) {
    const evidence = await this.evidenceService.searchEvidence(query, year, topic);
    return {
      data: evidence,
      total: evidence.length,
      query,
      filters: { year, topic }
    };
  }

  @Get(':id')
  async getEvidenceDetail(@Param('id') id: string) {
    const evidence = await this.evidenceService.findById(id);
    if (!evidence) {
      return { error: 'Evidence not found' };
    }
    return { data: evidence };
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  async uploadEvidence(
    @Request() req,
    @Body() evidenceData: {
      title: string;
      author: string;
      abstract: string;
      publicationYear: number;
      keywords: string[];
    }
  ) {
    const evidence = await this.evidenceService.createEvidence({
      ...evidenceData,
      uploadedBy: req.user.id,
    });

    return {
      message: 'Evidence uploaded successfully',
      data: evidence
    };
  }
}