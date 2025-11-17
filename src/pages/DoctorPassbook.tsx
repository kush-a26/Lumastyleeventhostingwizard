import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Chip } from '../components/Chip';
import { CertificateQuickView, Certificate } from '../components/CertificateQuickView';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { Eye, Download, FileDown, Check } from 'lucide-react';
import { allCertificates } from '../lib/doctorMockData';
import { toast } from 'sonner@2.0.3';

export default function DoctorPassbook() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showExportSheet, setShowExportSheet] = useState(false);
  const [filter, setFilter] = useState<'all' | 'DMC' | 'RMC' | 'speaker' | 'locked'>('all');
  const [selectedCouncil, setSelectedCouncil] = useState<'DMC' | 'RMC' | null>(null);

  const handleCertificateClick = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setShowQuickView(true);
  };

  const filteredCertificates = allCertificates.filter(cert => {
    if (filter === 'all') return true;
    if (filter === 'DMC') return cert.council === 'DMC';
    if (filter === 'RMC') return cert.council === 'RMC';
    if (filter === 'locked') return cert.status === 'pending';
    return true;
  });

  const handleExport = () => {
    if (!selectedCouncil) {
      toast.error('Please select a council');
      return;
    }
    
    toast.success('Renewal pack ready', {
      description: `Your ${selectedCouncil} renewal pack has been prepared and will download shortly.`,
    });
    
    setShowExportSheet(false);
    setSelectedCouncil(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="max-w-[960px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-semibold text-[#1E1E1E] mb-2">
              Passbook
            </h1>
            <p className="text-[16px] text-[#64748B]">
              {allCertificates.length} certificates • {allCertificates.reduce((sum, c) => sum + c.hours, 0)} total hours
            </p>
          </div>
          <Button
            onClick={() => setShowExportSheet(true)}
            className="bg-[#767DFF] hover:bg-[#6571E8] text-white"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export Pack
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#767DFF] text-white' : ''}
          >
            All
          </Button>
          <Button
            variant={filter === 'DMC' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('DMC')}
            className={filter === 'DMC' ? 'bg-[#767DFF] text-white' : ''}
          >
            DMC
          </Button>
          <Button
            variant={filter === 'RMC' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('RMC')}
            className={filter === 'RMC' ? 'bg-[#767DFF] text-white' : ''}
          >
            RMC
          </Button>
          <Button
            variant={filter === 'locked' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('locked')}
            className={filter === 'locked' ? 'bg-[#767DFF] text-white' : ''}
          >
            Pending
          </Button>
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7F9FC]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Council
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left text-[12px] font-medium text-[#64748B] uppercase tracking-wider">
                    Proof
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredCertificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-[#F7F9FC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-[#1E1E1E]">{cert.eventTitle}</div>
                      {cert.venue && (
                        <div className="text-[12px] text-[#64748B] mt-1">{cert.venue}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#64748B]">{cert.date}</td>
                    <td className="px-6 py-4">
                      <Chip variant="outline">{cert.council}</Chip>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[#1E1E1E]">
                      {cert.hours} hrs
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCertificateClick(cert)}
                          className="text-[#767DFF] hover:text-[#6571E8] transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="text-[#64748B] hover:text-[#1E1E1E] transition-colors"
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#64748B]">No certificates found with this filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Export Pack Sheet */}
      <Sheet open={showExportSheet} onOpenChange={setShowExportSheet}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Export Renewal Pack</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div>
              <label className="text-[14px] font-medium text-[#1E1E1E] mb-3 block">
                Select Council
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCouncil('DMC')}
                  className={`w-full p-4 border rounded-lg text-left transition-all ${
                    selectedCouncil === 'DMC'
                      ? 'border-[#767DFF] bg-[#E8EBFF]'
                      : 'border-[#E2E8F0] hover:border-[#767DFF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[16px] font-medium text-[#1E1E1E]">DMC</div>
                      <div className="text-[14px] text-[#64748B]">
                        Delhi Medical Council • 14.5 hours
                      </div>
                    </div>
                    {selectedCouncil === 'DMC' && (
                      <Check className="w-5 h-5 text-[#767DFF]" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedCouncil('RMC')}
                  className={`w-full p-4 border rounded-lg text-left transition-all ${
                    selectedCouncil === 'RMC'
                      ? 'border-[#767DFF] bg-[#E8EBFF]'
                      : 'border-[#E2E8F0] hover:border-[#767DFF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[16px] font-medium text-[#1E1E1E]">RMC</div>
                      <div className="text-[14px] text-[#64748B]">
                        Rajasthan Medical Council • 4.0 hours
                      </div>
                    </div>
                    {selectedCouncil === 'RMC' && (
                      <Check className="w-5 h-5 text-[#767DFF]" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#F7F9FC] border border-[#E2E8F0] rounded-lg">
              <h4 className="text-[14px] font-medium text-[#1E1E1E] mb-2">
                Pack will include:
              </h4>
              <ul className="text-[14px] text-[#64748B] space-y-1">
                <li>• All certificates for selected council</li>
                <li>• Attendance summary</li>
                <li>• Hours breakdown by specialty</li>
                <li>• Verification QR codes</li>
              </ul>
            </div>

            <Button
              onClick={handleExport}
              className="w-full bg-[#767DFF] hover:bg-[#6571E8] text-white"
              disabled={!selectedCouncil}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Generate Renewal Pack
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <CertificateQuickView
        certificate={selectedCertificate}
        open={showQuickView}
        onOpenChange={setShowQuickView}
      />
    </div>
  );
}
