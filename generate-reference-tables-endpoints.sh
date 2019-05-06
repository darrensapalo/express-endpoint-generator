#! /bin/sh

# Primary keys are required inputs

npm run generate AllergyType -- -d reference-tables/allergy-type
npm run generate FamilyHistoryType -- -d reference-tables/family-history-type
npm run generate ImmunizationType -- -d reference-tables/immunization-type
npm run generate LabRecordType -- -d reference-tables/lab-record-type
npm run generate MedicalHistoryType -- -d reference-tables/medical-history-type

# Auto increment primary keys

npm run generate HMO -- --autoIncrement -d reference-tables/hmos
npm run generate Hospital -- --autoIncrement -d reference-tables/hospital
