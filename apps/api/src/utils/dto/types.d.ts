type EntityCommonOmit = 'id' | 'createdAt' | 'updatedAt';

type EntityAuditCommonOmit = EntityCommonOmit | 'createdBy' | 'lastUpdatedBy';
