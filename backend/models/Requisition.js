class Requisition {
    constructor( id, requisitionNumber, administrativeUnit, concept, subConcept, justification, type, createdAt){
        this.id = id;
        this.requisitionNumber = requisitionNumber;
        this.administrativeUnit = administrativeUnit;
        this.concept = concept;
        this.subConcept = subConcept;
        this.justification = justification;
        this.type = type;
        this.createdAt = createdAt;
        
    }
}

module.exports = Requisition;