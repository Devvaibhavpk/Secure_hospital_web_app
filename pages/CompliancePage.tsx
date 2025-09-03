import React from 'react';
import { Link } from 'react-router-dom';
import ComplianceChecklist from '../components/ComplianceChecklist';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { SearchIcon } from '../components/icons/SearchIcon';
import { CalculatorIcon } from '../components/icons/CalculatorIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { FileTextIcon } from '../components/icons/FileTextIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { SecurityIcon } from '../components/icons/SecurityIcon';

const CompliancePage: React.FC = () => {
  const regulations = [
    {
      icon: HeartIcon,
      title: "HIPAA",
      description: "Health Insurance Portability and Accountability Act - protects patient health information",
      coverage: "Privacy, Security, and Breach Notification Rules"
    },
    {
      icon: SecurityIcon,
      title: "HITECH",
      description: "Health Information Technology for Economic and Clinical Health Act",
      coverage: "Enhanced HIPAA enforcement and breach notification requirements"
    },
    {
      icon: ScaleIcon,
      title: "FDA",
      description: "Food and Drug Administration cybersecurity guidelines for medical devices",
      coverage: "Medical device security and software validation requirements"
    },
    {
      icon: FileTextIcon,
      title: "SOX",
      description: "Sarbanes-Oxley Act for publicly traded healthcare organizations",
      coverage: "Financial reporting controls and data integrity requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-security">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-textPrimary mb-6">
            Compliance Management
          </h1>
          <p className="text-lg md:text-xl text-textSecondary max-w-4xl mx-auto">
            Comprehensive tracking and management of healthcare regulatory compliance requirements. 
            Ensure your organization meets all necessary standards while modernizing your infrastructure.
          </p>
        </div>

        {/* Regulations Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {regulations.map((regulation) => {
            const IconComponent = regulation.icon;
            return (
              <Card key={regulation.title} className="card-enhanced shadow-card border-success/10 hover:border-success/20 transition-colors">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className="w-6 h-6 text-success" />
                    <h3 className="text-xl font-bold text-textPrimary">{regulation.title}</h3>
                  </div>
                  <p className="text-textSecondary mb-4">{regulation.description}</p>
                  <p className="text-sm text-success font-medium">
                    Coverage: {regulation.coverage}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Compliance Checklist */}
        <ComplianceChecklist />

        {/* Compliance Support */}
        <div className="mt-16">
          <Card className="card-enhanced shadow-elevated border-accent/20 bg-gradient-hero/10">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-textPrimary mb-4">Compliance Advisory Services</h2>
                <p className="text-lg text-textSecondary max-w-3xl mx-auto">
                  Navigate complex healthcare regulations with confidence. Our compliance experts help ensure 
                  your modernization efforts meet all regulatory requirements from day one.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <SecurityIcon className="w-8 h-8 text-brand-purple mx-auto mb-3" />
                  <h4 className="font-semibold text-textPrimary mb-2">Risk Assessment</h4>
                  <p className="text-sm text-textSecondary">Identify compliance gaps and risks</p>
                </div>
                <div className="text-center">
                  <FileTextIcon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-textPrimary mb-2">Documentation</h4>
                  <p className="text-sm text-textSecondary">Automated compliance reporting</p>
                </div>
                <div className="text-center">
                  <ScaleIcon className="w-8 h-8 text-success mx-auto mb-3" />
                  <h4 className="font-semibold text-textPrimary mb-2">Ongoing Support</h4>
                  <p className="text-sm text-textSecondary">Continuous compliance monitoring</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Get Compliance Consultation
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Cross-links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-textPrimary mb-6">Complete Your Security Strategy</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/security-dashboard">
              <Button variant="secondary" className="flex items-center">
                <SearchIcon className="w-5 h-5 mr-2" />
                Security Assessment
              </Button>
            </Link>
            <Link to="/roi-calculator">
              <Button variant="secondary" className="flex items-center">
                <CalculatorIcon className="w-5 h-5 mr-2" />
                Calculate ROI
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
