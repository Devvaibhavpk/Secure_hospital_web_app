import React, { useState } from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { SystemHealthIcon } from './icons/SystemHealthIcon';
import { SecurityIcon } from './icons/SecurityIcon';
import Card from './ui/Card';
import Button from './ui/Button';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  category: 'HIPAA' | 'HITECH' | 'FDA' | 'SOX';
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-assessed';
  priority: 'high' | 'medium' | 'low';
  lastAssessed?: string;
}

const ComplianceChecklist: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: 'hipaa-1',
      title: 'Patient Data Encryption',
      description: 'All patient data must be encrypted at rest and in transit',
      category: 'HIPAA',
      status: 'compliant',
      priority: 'high',
      lastAssessed: '2024-01-15'
    },
    {
      id: 'hipaa-2',
      title: 'Access Controls',
      description: 'Implement role-based access controls for patient data',
      category: 'HIPAA',
      status: 'compliant',
      priority: 'high',
      lastAssessed: '2024-01-10'
    },
    {
      id: 'hitech-1',
      title: 'Breach Notification System',
      description: 'Automated system for breach detection and notification',
      category: 'HITECH',
      status: 'partial',
      priority: 'high',
      lastAssessed: '2024-01-05'
    },
    {
      id: 'fda-1',
      title: 'Medical Device Security',
      description: 'Security controls for connected medical devices',
      category: 'FDA',
      status: 'non-compliant',
      priority: 'medium',
      lastAssessed: '2023-12-20'
    },
    {
      id: 'sox-1',
      title: 'Financial Data Integrity',
      description: 'Controls for financial reporting data accuracy',
      category: 'SOX',
      status: 'compliant',
      priority: 'high',
      lastAssessed: '2024-01-12'
    },
    {
      id: 'hipaa-3',
      title: 'Audit Logging',
      description: 'Comprehensive logging of all data access and modifications',
      category: 'HIPAA',
      status: 'compliant',
      priority: 'medium',
      lastAssessed: '2024-01-08'
    }
  ]);

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return <ShieldCheckIcon className="w-5 h-5 text-success" />;
      case 'partial':
        return <ShieldExclamationIcon className="w-5 h-5 text-warning" />;
      case 'non-compliant':
        return <ShieldExclamationIcon className="w-5 h-5 text-error" />;
      default:
        return <SystemHealthIcon className="w-5 h-5 text-textMuted" />;
    }
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant':
        return 'border-success/30 bg-success/5';
      case 'partial':
        return 'border-warning/30 bg-warning/5';
      case 'non-compliant':
        return 'border-error/30 bg-error/5';
      default:
        return 'border-textMuted/30 bg-textMuted/5';
    }
  };

  const getPriorityColor = (priority: ComplianceItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-textMuted';
    }
  };

  const getCategoryIcon = (category: ComplianceItem['category']) => {
    switch (category) {
      case 'HIPAA':
        return <HeartIcon className="w-4 h-4 text-brand-pink" />;
      case 'HITECH':
        return <SecurityIcon className="w-4 h-4 text-brand-purple" />;
      case 'FDA':
        return <ScaleIcon className="w-4 h-4 text-brand-teal" />;
      case 'SOX':
        return <FileTextIcon className="w-4 h-4 text-accent" />;
      default:
        return <SystemHealthIcon className="w-4 h-4 text-textMuted" />;
    }
  };

  const complianceStats = {
    total: complianceItems.length,
    compliant: complianceItems.filter(item => item.status === 'compliant').length,
    partial: complianceItems.filter(item => item.status === 'partial').length,
    nonCompliant: complianceItems.filter(item => item.status === 'non-compliant').length
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className="card-enhanced">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-2">Compliance Status Overview</h2>
            <p className="text-textSecondary">Current compliance status across all regulatory requirements</p>
          </div>
          <div className="flex items-center space-x-2">
            <SecurityIcon className="w-8 h-8 text-brand-purple" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">{complianceStats.compliant}</div>
            <div className="text-sm text-textSecondary">Compliant</div>
          </div>
          <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">{complianceStats.partial}</div>
            <div className="text-sm text-textSecondary">Partial</div>
          </div>
          <div className="text-center p-4 bg-error/10 rounded-lg border border-error/20">
            <div className="text-2xl font-bold text-error">{complianceStats.nonCompliant}</div>
            <div className="text-sm text-textSecondary">Non-Compliant</div>
          </div>
          <div className="text-center p-4 bg-textMuted/10 rounded-lg border border-textMuted/20">
            <div className="text-2xl font-bold text-textMuted">{complianceStats.total}</div>
            <div className="text-sm text-textSecondary">Total Items</div>
          </div>
        </div>
      </Card>

      {/* Compliance Items */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-textPrimary">Compliance Checklist</h3>
        {complianceItems.map((item) => (
          <Card key={item.id} className={`card-enhanced border-l-4 ${getStatusColor(item.status)}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(item.status)}
                  <h4 className="font-semibold text-textPrimary">{item.title}</h4>
                  <div className="flex items-center space-x-1">
                    {getCategoryIcon(item.category)}
                    <span className="text-xs text-textMuted">{item.category}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(item.priority)} bg-current/10`}>
                    {item.priority} priority
                  </span>
                </div>
                <p className="text-textSecondary mb-3">{item.description}</p>
                {item.lastAssessed && (
                  <p className="text-xs text-textMuted">
                    Last assessed: {new Date(item.lastAssessed).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="ml-4">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Items */}
      <Card className="card-enhanced">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-textPrimary mb-2">Next Steps</h3>
            <p className="text-textSecondary">Address non-compliant items to improve your compliance score</p>
          </div>
          <Button className="bg-gradient-primary">
            Generate Compliance Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Import the icons we need
import { HeartIcon } from './icons/HeartIcon';
import { ScaleIcon } from './icons/ScaleIcon';
import { FileTextIcon } from './icons/FileTextIcon';

export default ComplianceChecklist;
