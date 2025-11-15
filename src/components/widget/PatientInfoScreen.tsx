import { useState } from 'react';
import { Lock, Plus, X } from 'lucide-react';
import { BottomCTA } from './BottomCTA';
import { FloatingCloseButton } from './FloatingCloseButton';

interface PatientInfoScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isNewPatient: boolean;
  appointmentPath?: string;
  isActive: boolean;
  familyMembers?: any[];
}

interface PatientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

export function PatientInfoScreen({ onContinue, onBack, onClose, isNewPatient, appointmentPath, isActive, familyMembers }: PatientInfoScreenProps) {
  const isMultiPatient = appointmentPath === 'family';
  const [patients, setPatients] = useState<PatientData[]>(
    familyMembers && familyMembers.length > 0
      ? familyMembers.map(m => ({
          firstName: m.firstName || '',
          lastName: m.lastName || '',
          email: '',
          phone: '',
          dob: m.dob || '',
          gender: '',
        }))
      : [
          {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
          }
        ]
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const addPatient = () => {
    setPatients([...patients, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
    }]);
  };

  const removePatient = (index: number) => {
    if (patients.length > 1) {
      setPatients(patients.filter((_, i) => i !== index));
    }
  };

  const updatePatient = (index: number, field: keyof PatientData, value: string) => {
    const newPatients = [...patients];
    newPatients[index] = { ...newPatients[index], [field]: value };
    setPatients(newPatients);
  };

  const isFormValid = () => {
    return patients.every(p => p.firstName && p.lastName && p.email && p.phone) && agreedToTerms;
  };

  const handleContinue = () => {
    if (isFormValid()) {
      onContinue({ patients, isMultiPatient });
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Floating Close Button */}
      <FloatingCloseButton onClose={onClose} />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl text-gray-900 tracking-tight">
            {isMultiPatient ? 'Family Members.' : 'Your Info.'}
          </h2>
          <p className="text-xl text-gray-500">
            {isMultiPatient ? 'Add details for each person' : 'Just a few details to confirm'}
          </p>
        </div>

        {patients.map((patient, index) => (
          <div 
            key={index} 
            className={`space-y-4 ${index > 0 ? 'pt-6 border-t-2 border-black/5' : ''}`}
          >
            {isMultiPatient && (
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl text-gray-900">Patient {index + 1}</h3>
                {index > 0 && (
                  <button
                    onClick={() => removePatient(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">First Name *</label>
                <input
                  type="text"
                  value={patient.firstName}
                  onChange={(e) => updatePatient(index, 'firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={patient.lastName}
                  onChange={(e) => updatePatient(index, 'lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email *</label>
              <input
                type="email"
                value={patient.email}
                onChange={(e) => updatePatient(index, 'email', e.target.value)}
                className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                placeholder="john.smith@email.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={patient.phone}
                onChange={(e) => updatePatient(index, 'phone', e.target.value)}
                className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                placeholder="(415) 555-0123"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={patient.dob}
                  onChange={(e) => updatePatient(index, 'dob', e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Gender *</label>
                <select
                  value={patient.gender}
                  onChange={(e) => updatePatient(index, 'gender', e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/60 border border-black/10 rounded-xl text-gray-900 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23666%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e')] bg-[length:20px] bg-[position:right_12px_center] bg-no-repeat"
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        {isMultiPatient && (
          <button
            onClick={addPatient}
            className="w-full px-4 py-3.5 border-2 border-dashed border-black/20 text-gray-600 rounded-xl hover:border-[#0071e3] hover:text-[#0071e3] hover:bg-[#0071e3]/5 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Family Member</span>
          </button>
        )}

        <label className="flex items-start gap-3 cursor-pointer p-4 bg-white/60 border border-black/10 rounded-xl hover:bg-white transition-all">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 mt-0.5 accent-[#0071e3] rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-[#0071e3] hover:underline">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-[#0071e3] hover:underline">Privacy Policy</a>
          </span>
        </label>

        <div className="flex items-center gap-2 text-sm text-gray-600 p-4 bg-white/60 border border-black/10 rounded-xl">
          <Lock className="w-4 h-4" />
          <span>Your information is encrypted and GDPR compliant</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueDisabled={!isFormValid()}
      />
    </div>
  );
}