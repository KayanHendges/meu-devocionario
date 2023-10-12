export const entityCommonOmit: EntityCommonOmit[] = [
  'id',
  'updatedAt',
  'createdAt',
];

export const entityAuditCommonOmit: (
  | EntityCommonOmit
  | EntityAuditCommonOmit
)[] = [...entityCommonOmit, 'createdBy', 'lastUpdatedBy'];
