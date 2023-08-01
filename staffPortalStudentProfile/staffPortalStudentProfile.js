import { LightningElement, api, wire, track } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import CONTACT_PERSONA from '@salesforce/schema/User.Contact.Persona__c';
import CREDIT_HOURS from '@salesforce/schema/Enrollment_Record__c.Enrolled_Credit_Hours__c';
import ACCOUNT_ID from '@salesforce/schema/Enrollment_Record__c.Student_Account__c';
import NAME from '@salesforce/schema/Enrollment_Record__c.Students_Name__c';
import OPPORTUNITY_ID from '@salesforce/schema/Enrollment_Record__c.Opportunity__c';
import OPPORTUNITY_RECORD_TYPE from '@salesforce/schema/Enrollment_Record__c.Opportunity__r.RecordType.Name';
import OPPORTUNITY_SSC from '@salesforce/schema/Enrollment_Record__c.Opportunity__r.Student_Success_Coach__c';
import PARTNER from '@salesforce/schema/Enrollment_Record__c.Student_Account__r.Counseling__r.Final_Student_Partner__r.Name';
import STUDENT_TYPE from '@salesforce/schema/Enrollment_Record__c.Student_Account__r.Counseling__r.Final_Student_Decision_Type__c';
import STUDENT_ID from '@salesforce/schema/Enrollment_Record__c.Student_ID_SoR__c';
import getParentContactIds from '@salesforce/apex/StaffPortalStudentProfileController.getParentContactIds';
import getMostRecentApplicationId from '@salesforce/apex/StaffPortalStudentProfileController.getMostRecentApplicationId';
import getMostRecentHealthFormId from '@salesforce/apex/StaffPortalStudentProfileController.getMostRecentHealthFormId';

const FIELDS = [
    ACCOUNT_ID,
    NAME,
    OPPORTUNITY_ID,
    OPPORTUNITY_RECORD_TYPE,
    OPPORTUNITY_SSC,
    PARTNER,
    STUDENT_TYPE,
    STUDENT_ID
];

export default class StaffPortalStudentProfile extends LightningElement {
    @api recordId;
    @track healthFormId;
    @track applicationId;
    name;
    accountId;
    opportunityId;
    enrollmentRecord;
    enrollmentType;
    creditHours;
    finalPartner = PARTNER;
    studentSuccessCoach;
    studentId = STUDENT_ID;
    parentContactIds;
    passportShow = false;
    healthShow = false;
    parentShow = false;
    isASC = false;
    activeSections = [
        'emergencyContact1',
        'emergencyContact2',
        'medication1',
        'medication2',
        'medication3', 
        'medication4',
        'additionalMedicationInfo',
        'healthHistory',
        'swimmingAbility',
        'dietaryRestrictions',
        'additionalInformation'
    ];



    @wire(getRecord, { recordId: '$recordId', fields: FIELDS }) 
    wiredRecord({ error, data }) {
        if (error) {
            let message = 'Unknown Error';
            if (Array.isArray(error.body)) {
                message = error.body.map( e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Student',
                    message,
                    variant: 'error'
                })
            );
        } else if (data) {
            this.enrollmentRecord = data;
            this.name = this.enrollmentRecord.fields.Students_Name__c.value;
            this.accountId = this.enrollmentRecord.fields.Student_Account__c.value;
            this.opportunityId = this.enrollmentRecord.fields.Opportunity__c.value;
            this.enrollmentType = getFieldValue(this.enrollmentRecord, OPPORTUNITY_RECORD_TYPE);
            this.enrollmentType = this.enrollmentType.split(' ')[0];
            this.studentSuccessCoach = getFieldValue(this.enrollmentRecord, OPPORTUNITY_SSC);
            this.partner = getFieldValue(this.enrollmentRecord, PARTNER);
            this.studentType = getFieldValue(this.enrollmentRecord, STUDENT_TYPE);
            this.studentId = getFieldValue(this.enrollmentRecord, STUDENT_ID);
        }
    }

    @wire(getRecord, { recordId: USER_ID, fields: CONTACT_PERSONA})
    userRecord({ error, data }) {
        if (error) {
            let message = 'Unknown Error';
            if (Array.isArray(error.body)) {
                message = error.body.map( e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
        }
        if (data) {
            this.isASC = (getFieldValue(data, CONTACT_PERSONA) === 'ASC');
        }
    }

    @wire(getMostRecentApplicationId, { recordId: '$accountId'})
    getApplicationIdResult({ error, data }) {
        if (data) {
            this.applicationId = data;
        } else if (error) {
            let message = 'Unknown Error';
            if (Array.isArray(error.body)) {
                message = error.body.map( e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            /* this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Student',
                    message,
                    variant: 'error'
                })
            ); */
        }
    }

    @wire(getMostRecentHealthFormId, { recordId: '$accountId' })
    getHealthFormIdResult({ error, data }) {
        if (data) {
            this.healthFormId = data;
        } else if (error) {
            let message = 'Unknown Error';
            if (Array.isArray(error.body)) {
                message = error.body.map( e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            /* this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Student',
                    message,
                    variant: 'error'
                })
            ); */
        }
    }

    @wire(getParentContactIds, {recordId: '$accountId' })
    getParentContactIdsResult({ error, data }) {
        if (data) {
            if(data.length !== 0) {
                this.parentContactIds = data;
            }
        } else if (error) {
            let message = 'Unknown Error';
            if (Array.isArray(error.body)) {
                message = error.body.map( e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            /* this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Loading Student',
                    message,
                    variant: 'error'
                })
            ); */
        }
    }

    handlePassportShow() {
        this.passportShow = !this.passportShow;
    }

    handleHealthShow() {
        this.healthShow = !this.healthShow;
    }

    handleParentShow() {
        this.parentShow = !this.parentShow;
    }
}