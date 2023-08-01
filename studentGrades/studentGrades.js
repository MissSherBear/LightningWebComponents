import { LightningElement, api, track, wire } from 'lwc';
import getCurrentlyEnrolledCoursesForRunningUser from "@salesforce/apex/Student.getCurrentSectionEnrollmentsForUser";
import getStudentForRunningUser from "@salesforce/apex/Student.getStudentForRunningUser";
import getCurrentSectionEnrollments from "@salesforce/apex/Student.getCurrentSectionEnrollmentsForStudent";
// import withCurrentProgramName from "@salesforce/apex/Student.withCurrentProgramName";
import NAME_FIELD from '@salesforce/schema/User.Name';
import CONTACT_NAME from "@salesforce/schema/User.Contact.FirstName";
import USER_ID from "@salesforce/user/Id";
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFld from '@salesforce/schema/User.Name';

export default class StudentGrades extends LightningElement {
    sectionEnrollments = [];
    noGrades;
    program;
    userId = Id;
    userName = CONTACT_NAME;
    currentUserName;
    @api recordId;

    @wire(getCurrentSectionEnrollments, { enrollmentRecordId : '$recordId' })
    currentStudentSchedule({ error, data }) {
        if ( data ) {
            console.log(JSON.stringify(data, null, 2));
            // this.sectionEnrollments = data;
            this.sectionEnrollments = data.filter((section) => section.shareMidTermGradeWithStudent == true);
            console.log(this.sectionEnrollments);
            if (this.sectionEnrollments.length == 0) {
                this.noGrades = 'Grades are currently unavailable.';
            }
        } else if ( error ) {
            if (Array.isArray( error.body )) {
                console.log( 'Error is ' + error.body.map( e => e.message ).join( ', ' ) );
            } else if ( typeof error.body.message === 'string' ) {
                console.log( 'Error is ' + error.body.message );
        }
    }
    }

    connectedCallback() {
        if (!this.recordId) {
          getStudentForRunningUser()
            .then(result => {
              this.recordId = result.currentEnrollmentRecordId;
            })
            .catch(error => {
              this.error = error;
              console.log({ error });
            });
        }
      }

    @wire(getRecord, { recordId: Id, fields: [UserNameFld]}) 
    userDetails({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
        } else if (error) {
            this.error = error ;
        }
    }

    // async connectedCallback() {
    //     try {
    //       let currentProgram = await withCurrentProgramName();
    //       return currentProgram;
    //     } catch(e) { 
    //     }
    // }

}