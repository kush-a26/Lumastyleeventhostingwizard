import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Download, ExternalLink, Calendar, Clock, MapPin, Award } from 'lucide-react';
import { Chip } from './Chip';

export interface Certificate {
  id: string;
  eventTitle: string;
  date: string;
  council: string;
  hours: number;
  status: 'verified' | 'pending' | 'locked';
  venue?: string;
  specialty?: string;
  certificateUrl?: string;
}

interface CertificateQuickViewProps {
  certificate: Certificate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CertificateQuickView({ certificate, open, onOpenChange }: CertificateQuickViewProps) {
  if (!certificate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{certificate.eventTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Certificate Preview */}
          <div className="aspect-[3/2] bg-gradient-to-br from-[#767DFF] to-[#5B63E5] rounded-xl p-8 flex flex-col items-center justify-center text-white">
            <Award className="w-16 h-16 mb-4 opacity-90" />
            <h3 className="text-[22px] font-semibold mb-2">Certificate of Participation</h3>
            <p className="text-[16px] opacity-90 mb-4">{certificate.eventTitle}</p>
            <div className="flex items-center gap-4 text-[14px] opacity-80">
              <span>{certificate.hours} CME Hours</span>
              <span>•</span>
              <span>{certificate.date}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
              <div>
                <div className="text-[14px] text-[#64748B]">Date</div>
                <div className="text-[16px] text-[#1E1E1E]">{certificate.date}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#64748B] mt-0.5" />
              <div>
                <div className="text-[14px] text-[#64748B]">CME Hours</div>
                <div className="text-[16px] text-[#1E1E1E]">{certificate.hours} hours</div>
              </div>
            </div>
            
            {certificate.venue && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#64748B] mt-0.5" />
                <div>
                  <div className="text-[14px] text-[#64748B]">Venue</div>
                  <div className="text-[16px] text-[#1E1E1E]">{certificate.venue}</div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#64748B] mt-0.5" />
              <div>
                <div className="text-[14px] text-[#64748B]">Council</div>
                <Chip variant="outline" className="mt-1">{certificate.council}</Chip>
              </div>
            </div>
          </div>

          {/* Status */}
          {certificate.status === 'pending' && (
            <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-lg p-4">
              <p className="text-[14px] text-[#92400E]">
                <strong>RMC Ref pending:</strong> Your certificate is being verified by the council.
                This usually takes 3-5 business days.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-[#767DFF] hover:bg-[#6571E8] text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
