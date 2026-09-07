import type { TreeNode } from './models';

/**
 * Hierarchy shown in the left panel of the workstream detail screen.
 * Mirrors the "CURRENT" grouping in the production application.
 */
export const hierarchy: TreeNode[] = [
  {
    id: 'grp-0',
    label: '-',
    status: 'grey',
    children: [
      {
        id: 'P02SG-26019-R0002',
        label: 'Retail SG Client Onboarding Regulatory',
        status: 'blue',
        children: [
          { id: 'n-1a', label: 'SG_CO_Digital Channel', status: 'blue' },
          { id: 'n-1b', label: 'SG_CO_MyInfo Uplift', status: 'blue' },
          { id: 'n-1c', label: 'SG_CO_Screening', status: 'red' }
        ]
      },
      {
        id: 'P02HK-26019-R0003',
        label: 'Retail HK Client Onboarding Regulatory',
        status: 'red',
        children: [
          { id: 'n-2a', label: 'HK_CO_eKYC', status: 'blue' },
          { id: 'n-2b', label: 'HK_CO_Branch Assisted', status: 'red' }
        ]
      },
      {
        id: 'P02IN-26019-R0004',
        label: 'Retail IN Client Onboarding Regulatory',
        status: 'blue',
        children: [
          { id: 'n-3a', label: 'IN_CO_Aadhaar Integration', status: 'blue' },
          { id: 'n-3b', label: 'IN_CO_Video KYC', status: 'blue' }
        ]
      },
      {
        id: 'P02ID-26019-I0041',
        label: 'Retail ID Client Onboarding Regulatory',
        status: 'blue',
        children: [
          { id: 'n-4a', label: 'ID_CO_Regulatory Reporting', status: 'blue' },
          { id: 'n-4b', label: 'ID_CO_Data Remediation', status: 'red' }
        ]
      },
      { id: 'n-5', label: 'Retail REG Client Onboarding', status: 'blue', children: [{ id: 'n-5a', label: 'REG_CO_Common Services', status: 'blue' }] },
      { id: 'n-6', label: 'Retail ID Client Onboarding - ID', status: 'blue', children: [{ id: 'n-6a', label: 'ID_CO_Channel Uplift', status: 'blue' }] },
      { id: 'n-7', label: 'Retail SG Client Onboarding - SG', status: 'blue', children: [{ id: 'n-7a', label: 'SG_CO_Servicing Hooks', status: 'blue' }] },
      { id: 'P02ID-26019-I0052', label: 'ID_CO_Digi_Onboarding', status: 'blue', children: [{ id: 'n-8a', label: 'ID_CO_Digi_Mobile', status: 'blue' }] },
      { id: 'P02ID-26019-I0053', label: 'ID_CO_ESL Partner_Non-digi', status: 'blue', children: [{ id: 'n-9a', label: 'ID_CO_Partner API', status: 'blue' }] },
      { id: 'P02SG-26019-I0061', label: '[To Delete] SG_Inflight_CO', status: 'red', children: [{ id: 'n-10a', label: 'SG_Inflight_Legacy Bridge', status: 'red' }] },
      { id: 'P02TW-26021-I0008', label: 'TW_CS', status: 'blue', children: [{ id: 'n-11a', label: 'TW_CS_Servicing', status: 'blue' }] },
      { id: 'P18IN-20006-E0044', label: 'Reg_Defect Fixes_IN', status: 'blue' },
      { id: 'P18IN-20006-E0045', label: 'Reg_NCI Integration_IN', status: 'blue' },
      { id: 'n-14', label: 'Reg_CO_IN', status: 'blue' },
      { id: 'n-15', label: 'Reg_CO_Improve MFE_IN', status: 'blue' },
      { id: 'n-16', label: 'Reg_CO_Data Quality_IN', status: 'blue' },
      { id: 'n-17', label: 'Reg_CO_Ops Tooling_SG', status: 'blue' },
      { id: 'n-18', label: 'Reg_CO_Archival_HK', status: 'red' },
      { id: 'n-19', label: 'Reg_CO_Doc Upload_ID', status: 'blue' },
      { id: 'n-20', label: 'Reg_CO_Notification Service', status: 'blue' }
    ]
  }
];
