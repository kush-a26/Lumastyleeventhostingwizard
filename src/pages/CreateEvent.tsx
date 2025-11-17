import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventPreview } from '../components/EventPreview';
import { Chip } from '../components/Chip';
import { ChevronLeft, ChevronRight, Check, Upload, Plus, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function CreateEvent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // For mobile tab switching

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    startTime: '',
    endTime: '',
    format: 'Online',
    location: '',
    city: '',
    coverImage: null as string | null,
    organizerName: '',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=organizer',
    autoPoster: true,
    description: '',
    agenda: [] as Array<{ id: string; startTime: string; title: string; speaker: string; duration: number }>,
    faculty: [] as Array<{ id: string; name: string; role: string; affiliation: string; avatar?: string }>,
    streamingLink: '',
    council: 'DMC',
    advertisingPolicy: '',
    coiAcknowledged: false,
    observerLink: '',
    estimatedCredits: 3.0,
  });

  const steps = [
    { number: 1, name: 'Basics', required: true },
    { number: 2, name: 'Agenda & Faculty', required: true },
    { number: 3, name: 'Compliance', required: true },
    { number: 4, name: 'Preview & Publish', required: false },
  ];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('coverImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAgendaItem = () => {
    const newItem = {
      id: Date.now().toString(),
      startTime: '',
      title: '',
      speaker: '',
      duration: 60,
    };
    updateField('agenda', [...formData.agenda, newItem]);
  };

  const updateAgendaItem = (id: string, field: string, value: any) => {
    updateField('agenda', formData.agenda.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeAgendaItem = (id: string) => {
    updateField('agenda', formData.agenda.filter(item => item.id !== id));
  };

  const addFaculty = () => {
    const newFaculty = {
      id: Date.now().toString(),
      name: '',
      role: 'Speaker',
      affiliation: '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
    };
    updateField('faculty', [...formData.faculty, newFaculty]);
  };

  const updateFaculty = (id: string, field: string, value: any) => {
    updateField('faculty', formData.faculty.map(faculty => 
      faculty.id === id ? { ...faculty, [field]: value } : faculty
    ));
  };

  const removeFaculty = (id: string) => {
    updateField('faculty', formData.faculty.filter(faculty => faculty.id !== id));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.date && formData.startTime && formData.endTime && formData.format && formData.organizerName;
      case 2:
        return formData.agenda.length > 0 && formData.faculty.length > 0;
      case 3:
        return formData.advertisingPolicy && formData.coiAcknowledged;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const canPublish = isStepValid(1) && isStepValid(2) && isStepValid(3);

  const handlePublish = () => {
    if (canPublish) {
      setIsPublished(true);
      toast.success('Event published successfully!');
    }
  };

  const handleAutoGeneratePoster = () => {
    toast.success('Generating poster with AI...');
    // Simulate poster generation
    setTimeout(() => {
      toast.success('Poster generated! Check your downloads.');
    }, 2000);
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved!');
  };

  return (
    <div className="flex flex-col bg-[#F7F9FC] min-h-screen">
      {/* Wizard Header */}
      <div className="bg-white border-b border-[#E2E8F0] flex-shrink-0">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">Create Event</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-[#E2E8F0] rounded-lg hover:bg-[#F7F9FC] transition-colors text-[14px]"
              >
                Save Draft
              </button>
              <button 
                onClick={handlePublish}
                disabled={!canPublish || isPublished}
                className="px-6 py-2 bg-[#767DFF] text-white rounded-lg hover:bg-[#6169E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-[14px]"
              >
                {isPublished ? (
                  <>
                    <Check className="w-4 h-4" />
                    Published
                  </>
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-[14px] ${
                    currentStep === step.number
                      ? 'bg-[#767DFF] text-white'
                      : isStepValid(step.number)
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-[#F7F9FC] text-[#64748B] hover:bg-white'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    currentStep === step.number
                      ? 'bg-white/20'
                      : isStepValid(step.number)
                      ? 'bg-green-100'
                      : 'bg-white'
                  }`}>
                    {isStepValid(step.number) ? <Check className="w-4 h-4" /> : step.number}
                  </span>
                  <span className="text-sm">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-[#E2E8F0]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Split Pane */}
      <div className="flex-1 flex overflow-hidden max-w-[1440px] mx-auto w-full">
        {/* Left: Wizard */}
        <div className="w-[560px] flex-shrink-0 overflow-y-auto bg-white border-r border-[#E2E8F0]">
          <div className="p-8">
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1">Event Basics</h3>
                  <p className="text-sm text-[var(--muted)]">Core information about your event</p>
                </div>

                <div>
                  <label className="block text-sm mb-2">Event Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Critical Care Update 2025"
                    className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Subtitle (optional)</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => updateField('subtitle', e.target.value)}
                    placeholder="Brief description or tagline"
                    className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Date *</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm mb-2">Start *</label>
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => updateField('startTime', e.target.value)}
                        className="w-full px-3 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">End *</label>
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => updateField('endTime', e.target.value)}
                        className="w-full px-3 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Format *</label>
                  <div className="flex gap-2">
                    {['Online', 'In-person', 'Hybrid'].map(format => (
                      <Chip
                        key={format}
                        variant="format"
                        selected={formData.format === format}
                        onClick={() => updateField('format', format)}
                      >
                        {format}
                      </Chip>
                    ))}
                  </div>
                </div>

                {(formData.format === 'In-person' || formData.format === 'Hybrid') && (
                  <>
                    <div>
                      <label className="block text-sm mb-2">Venue</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        placeholder="e.g., AIIMS Convention Center"
                        className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="e.g., Delhi"
                        className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm mb-2">Cover Image</label>
                  <div className="border-2 border-dashed border-[var(--stroke)] rounded-lg p-6 text-center hover:border-[var(--primary)] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--muted)]" />
                      <p className="text-sm text-[var(--ink)] mb-1">Click to upload cover image</p>
                      <p className="text-xs text-[var(--muted)]">Recommended: 1200x600px</p>
                    </label>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2">
                      <img src={formData.coverImage} alt="Cover preview" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-2">Organizer Name *</label>
                  <input
                    type="text"
                    value={formData.organizerName}
                    onChange={(e) => updateField('organizerName', e.target.value)}
                    placeholder="Your name or organization"
                    className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">About This Event</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Provide a brief description of the event..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-[var(--bg)] rounded-lg">
                  <input
                    type="checkbox"
                    id="auto-poster"
                    checked={formData.autoPoster}
                    onChange={(e) => updateField('autoPoster', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <label htmlFor="auto-poster" className="text-sm cursor-pointer flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                      Auto-generate event poster
                    </label>
                    <p className="text-xs text-[var(--muted)] mt-1">Automatically create a professional poster from your cover image and title</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Agenda & Faculty */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1">Agenda & Faculty</h3>
                  <p className="text-sm text-[var(--muted)]">Build your event schedule and speaker lineup</p>
                </div>

                {/* Agenda Builder */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm">Agenda *</label>
                    <button
                      onClick={addAgendaItem}
                      className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Session
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.agenda.map((item, index) => (
                      <div key={item.id} className="p-4 border border-[var(--stroke)] rounded-lg space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[var(--muted)]">Session {index + 1}</span>
                          <button
                            onClick={() => removeAgendaItem(item.id)}
                            className="text-[var(--danger)] hover:bg-red-50 p-1 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="time"
                            value={item.startTime}
                            onChange={(e) => updateAgendaItem(item.id, 'startTime', e.target.value)}
                            placeholder="Start time"
                            className="px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                          />
                          <input
                            type="number"
                            value={item.duration}
                            onChange={(e) => updateAgendaItem(item.id, 'duration', parseInt(e.target.value))}
                            placeholder="Duration (min)"
                            className="px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                          />
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateAgendaItem(item.id, 'title', e.target.value)}
                          placeholder="Session title"
                          className="w-full px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                        />
                        <input
                          type="text"
                          value={item.speaker}
                          onChange={(e) => updateAgendaItem(item.id, 'speaker', e.target.value)}
                          placeholder="Speaker name"
                          className="w-full px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                        />
                      </div>
                    ))}
                    {formData.agenda.length === 0 && (
                      <div className="p-8 border-2 border-dashed border-[var(--stroke)] rounded-lg text-center">
                        <p className="text-sm text-[var(--muted)]">No sessions added yet</p>
                        <button
                          onClick={addAgendaItem}
                          className="mt-2 text-sm text-[var(--primary)] hover:underline"
                        >
                          Add your first session
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Faculty Builder */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm">Faculty *</label>
                    <button
                      onClick={addFaculty}
                      className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Faculty
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.faculty.map((faculty, index) => (
                      <div key={faculty.id} className="p-4 border border-[var(--stroke)] rounded-lg space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[var(--muted)]">Faculty {index + 1}</span>
                          <button
                            onClick={() => removeFaculty(faculty.id)}
                            className="text-[var(--danger)] hover:bg-red-50 p-1 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faculty.name}
                          onChange={(e) => updateFaculty(faculty.id, 'name', e.target.value)}
                          placeholder="Faculty name"
                          className="w-full px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <select
                            value={faculty.role}
                            onChange={(e) => updateFaculty(faculty.id, 'role', e.target.value)}
                            className="px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                          >
                            <option value="Speaker">Speaker</option>
                            <option value="Chair">Chair</option>
                            <option value="Moderator">Moderator</option>
                          </select>
                          <input
                            type="text"
                            value={faculty.affiliation}
                            onChange={(e) => updateFaculty(faculty.id, 'affiliation', e.target.value)}
                            placeholder="Affiliation"
                            className="px-3 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
                          />
                        </div>
                      </div>
                    ))}
                    {formData.faculty.length === 0 && (
                      <div className="p-8 border-2 border-dashed border-[var(--stroke)] rounded-lg text-center">
                        <p className="text-sm text-[var(--muted)]">No faculty added yet</p>
                        <button
                          onClick={addFaculty}
                          className="mt-2 text-sm text-[var(--primary)] hover:underline"
                        >
                          Add your first faculty member
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Streaming Link */}
                {(formData.format === 'Online' || formData.format === 'Hybrid') && (
                  <div>
                    <label className="block text-sm mb-2">Streaming Link</label>
                    <input
                      type="url"
                      value={formData.streamingLink}
                      onChange={(e) => updateField('streamingLink', e.target.value)}
                      placeholder="https://zoom.us/j/..."
                      className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Compliance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1">Compliance & Accreditation</h3>
                  <p className="text-sm text-[var(--muted)]">Ensure your event meets CME requirements</p>
                </div>

                <div>
                  <label className="block text-sm mb-2">Council</label>
                  <div className="flex gap-2">
                    <Chip
                      variant="default"
                      selected={formData.council === 'DMC'}
                      onClick={() => updateField('council', 'DMC')}
                    >
                      DMC
                    </Chip>
                    <Chip
                      variant="default"
                      selected={formData.council === 'RMC'}
                      onClick={() => updateField('council', 'RMC')}
                    >
                      RMC
                    </Chip>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">Fixed to DMC for this flow</p>
                </div>

                <div>
                  <label className="block text-sm mb-3">Advertising Policy *</label>
                  <div className="space-y-2">
                    {[
                      { value: 'none', label: 'No promotion' },
                      { value: 'text', label: 'Text-only sponsor line (no logos/products)' },
                      { value: 'logo', label: 'Logo on foyer/holding slide only (never on educational slides)' },
                    ].map(option => (
                      <label key={option.value} className="flex items-start gap-3 p-3 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] cursor-pointer">
                        <input
                          type="radio"
                          name="advertising"
                          value={option.value}
                          checked={formData.advertisingPolicy === option.value}
                          onChange={(e) => updateField('advertisingPolicy', e.target.value)}
                          className="mt-0.5"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.coiAcknowledged}
                      onChange={(e) => updateField('coiAcknowledged', e.target.checked)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm">I will display the COI opening slide *</p>
                      <p className="text-xs text-[var(--muted)] mt-1">Required for all accredited events</p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm mb-2">Observer Link (optional)</label>
                  <input
                    type="url"
                    value={formData.observerLink}
                    onChange={(e) => updateField('observerLink', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                  <p className="text-xs text-[var(--muted)] mt-1">Link for accreditation observers to monitor the event</p>
                </div>

                <div className="p-4 bg-[var(--bg)] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Estimated Credits</p>
                      <p className="text-xs text-[var(--muted)] mt-1">Final credits determined at DMC discretion</p>
                    </div>
                    <div className="px-4 py-2 bg-white border border-[var(--stroke)] rounded-lg">
                      <span className="text-lg">{formData.estimatedCredits.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preview & Publish */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1">Preview & Publish</h3>
                  <p className="text-sm text-[var(--muted)]">Review your event and publish when ready</p>
                </div>

                {/* Readiness Checklist */}
                <div className="space-y-3">
                  <h4>Readiness Checklist</h4>
                  {[
                    { label: 'Event basics completed', valid: isStepValid(1) },
                    { label: 'Agenda added', valid: formData.agenda.length > 0 },
                    { label: 'Faculty added', valid: formData.faculty.length > 0 },
                    { label: 'Advertising policy selected', valid: !!formData.advertisingPolicy },
                    { label: 'COI acknowledgment', valid: formData.coiAcknowledged },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-[var(--stroke)] rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.valid ? 'bg-green-100 text-green-600' : 'bg-[var(--bg)] text-[var(--muted)]'
                      }`}>
                        {item.valid ? <Check className="w-4 h-4" /> : <span className="text-xs">−</span>}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Public URL */}
                <div>
                  <label className="block text-sm mb-2">Public URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`sahajcme.com/event/${formData.title.toLowerCase().replace(/\s+/g, '-') || 'untitled'}`}
                      readOnly
                      className="flex-1 px-4 py-2.5 border border-[var(--stroke)] rounded-lg bg-[var(--bg)] text-[var(--muted)]"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://sahajcme.com/event/${formData.title.toLowerCase().replace(/\s+/g, '-')}`);
                        toast.success('URL copied!');
                      }}
                      className="px-4 py-2.5 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {isPublished && (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="mb-2 text-green-900">Event Published!</h4>
                    <p className="text-sm text-green-700 mb-4">Your event is now live and visible to attendees.</p>
                    <button
                      onClick={() => navigate(`/event/${Date.now()}`)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Open Public Page
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-[var(--stroke)]">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 border border-[var(--stroke)] rounded-lg hover:bg-[var(--bg)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[#6169E5] transition-colors flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={!canPublish || isPublished}
                  className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[#6169E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPublished ? 'Published' : 'Publish Event'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 overflow-hidden">
          <EventPreview 
            eventData={{
              ...formData,
              organizer: {
                name: formData.organizerName,
                avatar: formData.organizerAvatar,
              },
            }}
            onAutoGeneratePoster={formData.autoPoster ? handleAutoGeneratePoster : undefined}
          />
        </div>
      </div>
    </div>
  );
}